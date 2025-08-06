import React, { useEffect, useRef, useState } from 'react';
import '../style/Invoice.css';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DataContext from '../context/DataContest';
import { api } from '../API/api';
import { Download, Pencil, } from 'lucide-react';
import { convertNumberToWords } from '../hooks/NumToWord';
import Swal from 'sweetalert2';
import ContentEditable from 'react-contenteditable';
import EditableField from '../hooks/OnEdit';
// import cloneDeep from 'lodash.clonedeep';


const InvoiceDetail = () => {
    const { id } = useParams();
    const { yourInvoices, yourProducts, yourCompanies, navigate, deleteAlert, isEditing, setIsEditing } = React.useContext(DataContext);
    const componentRef = useRef();
    const [changeTitle, setChangeTitle] = useState(false);

    const getProductName = (pID) => {
        const temp = yourProducts.find(val => val.product_id == pID).product_name;
        return temp;
    }
    const getProductCode = (pID) => {
        const temp = yourProducts.find(val => val.product_id == pID).product_hsn_sac_code;
        return temp;
    }

    const invoice = yourInvoices.find(val => val.invoice_id == id);
    const [editableInvoice, setEditableInvoice] = useState(invoice);
    const [companyDetail, setCompanyDetail] = useState({});
    const [editableField, setEditableField] = useState({
        date: {
            invoice_date: new Date(invoice.invoice_date).toLocaleDateString(),
            invoice_due_date: new Date(invoice.invoice_due_date).toLocaleDateString()
        },
        products: [
            ...invoice.products.map(product => ({
                invoice_item_name: getProductName(product.product_id) || 'Product Name',
                product_hsn_sac_code: getProductCode(product.product_id) || '1111',
            }))
        ]
    });

    useEffect(() => { setIsEditing(false) }, [])

    useEffect(() => {
        setEditableInvoice(invoice);
        if (invoice) {
            const company = getCompanyDetails(invoice.invoice_by.company_id);
            setCompanyDetail(company);
        }
    }, [invoice]);




    let moneyInWord = convertNumberToWords(Math.trunc(editableInvoice?.invoice_total || 0));

    const getCompanyDetails = (cID) => { return (yourCompanies.find((val) => val.company_id === cID)) }


    // sweat alert
    const GenerateInvoice = () => {
        let timerInterval;
        Swal.fire({
            title: "Invoice Generating...",
            html: "It will download in <b></b> milliseconds.",
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        });
    }


    const downloadAsPDF = async () => {

        if (!componentRef.current) return;

        GenerateInvoice();

        const clone = componentRef.current.cloneNode(true);

        // Set up the clone for PDF generation with proper A4 width
        clone.classList.remove("scale-[90%]");
        clone.classList.add("scale-100");

        // Set A4 proportional width (210mm = ~794px at 96dpi)
        clone.style.width = "794px";
        clone.style.maxWidth = "794px";
        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
        clone.style.top = '0';
        clone.style.padding = '20px 20px 60px 20px'; // Extra bottom padding for complete layout
        clone.style.boxSizing = 'border-box';
        clone.style.backgroundColor = '#ffffff';
        clone.style.minHeight = 'fit-content';

        document.body.appendChild(clone);

        try {
            // Create PDF in portrait A4 format
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
            const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

            // Define margins for better layout
            const marginTop = 12;
            const marginLeft = 10;
            const marginRight = 15;
            const marginBottom = 20;

            const contentWidth = pageWidth - marginLeft - marginRight; // 183mm
            const contentHeight = pageHeight - marginTop - marginBottom; // 265mm

            // Capture the invoice with html2canvas
            const canvas = await html2canvas(clone, {
                scale: 2, // Higher scale for better quality
                backgroundColor: '#ffffff',
                useCORS: true,
                allowTaint: true,
                height: clone.scrollHeight + 100, // Extra height to capture bottom borders
                width: clone.scrollWidth,
                windowWidth: 794, // A4 width equivalent
                scrollX: 0,
                scrollY: 0,
            });

            // Calculate dimensions
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            // Convert to mm (assuming 96 DPI)
            const pxToMm = 25.4 / 96;
            const imgWidthMm = imgWidth * pxToMm;
            const imgHeightMm = imgHeight * pxToMm;

            // Scale to fit page width while maintaining aspect ratio
            const scale = contentWidth / imgWidthMm;
            const scaledWidth = contentWidth;
            const scaledHeight = imgHeightMm * scale;

            // Calculate how many pages we need
            const pagesNeeded = Math.ceil(scaledHeight / contentHeight);

            // Add content to PDF pages
            for (let page = 0; page < pagesNeeded; page++) {
                if (page > 0) {
                    pdf.addPage();
                }

                // Calculate the portion of the image for this page
                const sourceY = (page * contentHeight) / scale; // Convert back to original scale
                const sourceHeight = Math.min(contentHeight / scale, imgHeightMm - sourceY);

                // Create a temporary canvas for this page section
                const pageCanvas = document.createElement('canvas');
                const pageCtx = pageCanvas.getContext('2d');

                // Set canvas size for this page section
                pageCanvas.width = imgWidth;
                pageCanvas.height = (sourceHeight / imgHeightMm) * imgHeight;

                // Draw the portion of the original image for this page
                pageCtx.drawImage(
                    canvas,
                    0, (sourceY / imgHeightMm) * imgHeight, // Source x, y
                    imgWidth, (sourceHeight / imgHeightMm) * imgHeight, // Source width, height
                    0, 0, // Destination x, y
                    imgWidth, (sourceHeight / imgHeightMm) * imgHeight // Destination width, height
                );

                const pageImgData = pageCanvas.toDataURL('image/png');

                // Add this page section to PDF
                const pageRenderHeight = Math.min(contentHeight, scaledHeight - (page * contentHeight));
                pdf.addImage(
                    pageImgData,
                    'PNG',
                    marginLeft,
                    marginTop,
                    scaledWidth,
                    pageRenderHeight
                );
            }

            pdf.save(`Invoice_${invoice.invoice_number}.pdf`);
        } catch (error) {
            console.error("PDF Export Error:", error);
            alert("Failed to generate PDF.");
        } finally {
            document.body.removeChild(clone);
        }
    };

    const handleDeleteInvoice = async (invoiceId, companyId) => {
        const isOk = await deleteAlert();
        if (isOk) {
            try {
                await api.delete(`invoices/${invoiceId}?company_id=${companyId}`, {
                });
                navigate('/invoices');
            } catch (e) {
                console.log("Error deleting invoice:", e);
                alert(e.response?.data?.message || "Failed to delete invoice");
            }
        }
    };




    if (!invoice) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6'>
                <div className="model-not-found">
                    <div className="model-not-found-icon">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Invoice Not Found!</h3>
                    <p className="text-gray-600 mb-8">The Invoice you're looking for doesn't exist or has been removed.</p>
                    <button
                        className='model-not-found-btn'
                        onClick={() => navigate('/invoices')}
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Go Back to Invoices
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="model-header-div">
                        <div className="flex items-center space-x-4">
                            <div className="model-header-icon">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="md:text-4xl text-2xl font-bold text-gray-900 mb-2">Invoice Details</h1>
                                <p className="text-lg text-gray-600">Manage and customize your invoice</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-2xl shadow-xl p-2 md:p-6 mb-8 border border-gray-200">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        {/* Primary Actions */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`${isEditing ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse border-2 border-green-500 edit-btn-glow' : 'bg-blue-500 hover:bg-blue-600 text-white'} px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 min-w-[140px]`}
                            >
                                <Pencil className='w-5 h-5' />
                                <span className="hidden sm:inline">{isEditing ? "Stop Editing" : "Edit Invoice"}</span>
                                <span className="sm:hidden">{isEditing ? "Stop Editing" : "Edit Invoice"}</span>
                            </button>
                            <button
                                onClick={downloadAsPDF}
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 min-w-[140px]"
                            >
                                <Download className='w-5 h-5' />
                                <span className="hidden sm:inline">Download PDF</span>
                                <span className="sm:hidden">PDF</span>
                            </button>
                        </div>

                        {/* Invoice Type Selection */}
                        <div className="bg-gray-50 rounded-xl p-1 md:p-4 border border-gray-200">
                            <div className="flex items-centermd:gap-4 gap-1">
                                <h5 className='md:text-lg text-sm  font-semibold text-gray-700'>Invoice Type:</h5>
                                <div className='flex gap-4'>
                                    <label className='flex items-center gap-2 cursor-pointer group'>
                                        <div className="relative">
                                            <input
                                                type="radio"
                                                name="invoice-title"
                                                checked={changeTitle}
                                                onChange={() => setChangeTitle(true)}
                                                className="sr-only"
                                            />
                                            <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${changeTitle ? 'border-blue-500 bg-blue-500' : 'border-gray-300 group-hover:border-blue-400'}`}>
                                                {changeTitle && <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>}
                                            </div>
                                        </div>
                                        <span className='md:text-lg text-sm  font-medium text-gray-700 group-hover:text-blue-600 transition-colors'>Proforma</span>
                                    </label>
                                    <label className='flex items-center gap-2 cursor-pointer group'>
                                        <div className="relative">
                                            <input
                                                type="radio"
                                                name="invoice-title"
                                                checked={!changeTitle}
                                                onChange={() => setChangeTitle(false)}
                                                className="sr-only"
                                            />
                                            <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${!changeTitle ? 'border-blue-500 bg-blue-500' : 'border-gray-300 group-hover:border-blue-400'}`}>
                                                {!changeTitle && <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>}
                                            </div>
                                        </div>
                                        <span className='md:text-lg text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors'>Tax</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Invoice Container */}
                <div className={`bg-white rounded-2xl shadow-2xl md:p-8 p-2 mb-8 border border-gray-200 ${isEditing ? 'invoice-container-glow' : ''}`}>
                    <div ref={componentRef} className="invoice-container">
                        {/* <!-- Header --> */}
                        <div className="invoice-header p-2">
                            <div className="company-info">
                                <div className="logo">
                                    {(() => {
                                        let logoName = "LOGO";
                                        return (<EditableField
                                            value={logoName}
                                            onChange={(val) => logoName = val}
                                            className='w-20 text-center'
                                        />)
                                    })()}</div>
                                <div className="company-details ml-10 border-l pl-4">
                                    <h2>
                                        <EditableField
                                            value={editableInvoice.invoice_by.company_name}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                invoice_by: { ...editableInvoice.invoice_by, company_name: val }
                                            })}
                                        />
                                    </h2>
                                    <p>
                                        <EditableField
                                            value={editableInvoice.invoice_by.company_address}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                invoice_by: { ...editableInvoice.invoice_by, company_address: val }
                                            })}
                                        />
                                    </p>
                                    <p className='flex gap-1'> GSTIN :
                                        <EditableField
                                            value={editableInvoice.invoice_by.company_gstin}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                invoice_by: { ...editableInvoice.invoice_by, company_gstin: val }
                                            })}
                                        />
                                    </p>
                                    <p>
                                        <EditableField
                                            value={editableInvoice.invoice_by.company_msme}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                invoice_by: { ...editableInvoice.invoice_by, company_msme: val }
                                            })}
                                        />
                                    </p>
                                    <p>
                                        <EditableField
                                            value={editableInvoice.invoice_by.company_email}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                invoice_by: { ...editableInvoice.invoice_by, company_email: val }
                                            })}
                                        />
                                    </p>
                                </div>
                            </div>
                            <div className="invoice-title text-3xl">{changeTitle ? "PERFOMA" : "TAX"} INVOICE</div>
                        </div>

                        {/* <!-- Invoice Info --> */}
                        <div className="invoice-info">
                            <div className="info-left flex p-3 justify-around">
                                <div>
                                    <p># Invoice</p>
                                    <p>Date</p>
                                    <p>Terms</p>
                                    <p>Due Date</p>
                                </div>
                                <div>
                                    <p className='font-semibold flex gap-1'>:
                                        <EditableField
                                            value={editableInvoice.invoice_number}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice, invoice_number: val
                                            })}
                                        />
                                    </p>
                                    <p className='font-semibold flex gap-2'>:
                                        <EditableField
                                            value={editableField.date.invoice_date}
                                            onChange={(val) => setEditableField({
                                                ...editableField,
                                                date: { ...editableField.date, invoice_date: val }
                                            })}
                                        />
                                    </p>
                                    <p className='font-semibold flex gap-1'>:
                                        <EditableField
                                            value={editableInvoice.invoice_terms}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice, invoice_terms: val
                                            })}
                                        />
                                    </p>
                                    <p className='font-semibold flex gap-2'>:
                                        <EditableField
                                            value={editableField.date.invoice_due_date}
                                            onChange={(val) => setEditableField({
                                                ...editableField,
                                                date: { ...editableField.date, invoice_due_date: val }
                                            })}
                                        />
                                    </p>
                                </div>
                            </div>
                            <div className="info-right flex p-3 border-t-2 sm:border-l-2 sm:border-t-0 min-h-[80px] justify-around">
                                <div>
                                    <p>Place Of Supply </p>
                                </div>
                                <div>
                                    <p className='font-semibold flex gap-1'>:
                                        <EditableField
                                            value={editableInvoice.invoice_place_of_supply}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice, invoice_place_of_supply: val
                                            })}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Bill & Ship To --> */}
                        <div className="billing-shipping">
                            <div className="box pb-2">
                                <div className="box-title">Bill To</div>
                                <div className="box-body">
                                    <p className='bold'>
                                        <EditableField
                                            value={editableInvoice.client.customer_name}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                client: { ...editableInvoice.client, customer_name: val }
                                            })}
                                        />
                                    </p>
                                    <p>
                                        <EditableField
                                            value={editableInvoice.client.customer_address_line1}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                client: { ...editableInvoice.client, customer_address_line1: val }
                                            })}
                                        />
                                    </p>
                                    <p>
                                        <EditableField
                                            value={editableInvoice.client.customer_address_line2}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                client: { ...editableInvoice.client, customer_address_line2: val }
                                            })}
                                        />
                                    </p>
                                    <p className='flex gap-1'>
                                        <EditableField
                                            value={editableInvoice.client.customer_city}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                client: { ...editableInvoice.client, customer_city: val }
                                            })}
                                        /> -
                                        <EditableField
                                            value={editableInvoice.client.customer_postal_code}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                client: { ...editableInvoice.client, customer_postal_code: val }
                                            })}
                                        />
                                    </p>
                                    <p>
                                        <EditableField
                                            value={editableInvoice.client.customer_country}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                client: { ...editableInvoice.client, customer_country: val }
                                            })}
                                        />
                                    </p>
                                    <p className='flex gap-1'>
                                        <EditableField
                                            value={editableInvoice.client.customer_gstin}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                client: { ...editableInvoice.client, customer_gstin: val }
                                            })}
                                        />
                                    </p>
                                </div>
                            </div>
                            <div className="box pb-2">
                                <div className="box-title">Ship To</div>
                                <div className="box-body">
                                    <p className='bold'>
                                        <EditableField
                                            value={editableInvoice.client.customer_name}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                client: { ...editableInvoice.client, customer_name: val }
                                            })}
                                        />
                                    </p>
                                    <p>
                                        <EditableField
                                            value={editableInvoice.client.customer_address_line1}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                client: { ...editableInvoice.client, customer_address_line1: val }
                                            })}
                                        />
                                    </p>
                                    <p>
                                        <EditableField
                                            value={editableInvoice.client.customer_address_line2}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                client: { ...editableInvoice.client, customer_address_line2: val }
                                            })}
                                        />
                                    </p>
                                    <p className='flex gap-1'>
                                        <EditableField
                                            value={editableInvoice.client.customer_city}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                client: { ...editableInvoice.client, customer_city: val }
                                            })}
                                        /> -
                                        <EditableField
                                            value={editableInvoice.client.customer_postal_code}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                client: { ...editableInvoice.client, customer_postal_code: val }
                                            })}
                                        />
                                    </p>
                                    <p>
                                        <EditableField
                                            value={editableInvoice.client.customer_country}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                client: { ...editableInvoice.client, customer_country: val }
                                            })}
                                        />
                                    </p>
                                    <p className='flex gap-1'>
                                        <EditableField
                                            value={editableInvoice.client.customer_gstin}
                                            onChange={(val) => setEditableInvoice({
                                                ...editableInvoice,
                                                client: { ...editableInvoice.client, customer_gstin: val }
                                            })}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Products Table --> */}
                        <div className="product-table-wrapper">
                            <table className="product-table">
                                <thead>
                                    <tr>
                                        <th className='font-bold'>#</th>
                                        <th className='font-bold'>Item & Description</th>
                                        <th className='font-bold'>HSN/SAC</th>
                                        <th className='font-bold'>Qty</th>
                                        <th className='font-bold'>Rate</th>
                                        <th className='font-bold'>CGST%</th>
                                        <th className='font-bold'>CGST Amt</th>
                                        <th className='font-bold'>SGST%</th>
                                        <th className='font-bold'>SGST Amt</th>
                                        <th className='font-bold'>IGST%</th>
                                        <th className='font-bold'>IGST Amt</th>
                                        <th className='font-bold'>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice.products?.map((item, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>
                                                <EditableField
                                                    value={editableField.products[i]?.invoice_item_name || item.invoice_item_name}
                                                    onChange={(val) => {
                                                        setEditableField({
                                                            ...editableField,
                                                            products: {
                                                                ...editableField.products,
                                                                [i]: {
                                                                    ...editableField.products[i],
                                                                    invoice_item_name: val
                                                                }
                                                            }
                                                        });
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <EditableField
                                                    value={editableField.products[i]?.product_hsn_sac_code}
                                                    onChange={(val) => {
                                                        setEditableField({
                                                            ...editableField,
                                                            products: {
                                                                ...editableField.products,
                                                                [i]: {
                                                                    ...editableField.products[i],
                                                                    product_hsn_sac_code: val
                                                                }
                                                            }
                                                        });
                                                    }}
                                                />
                                            </td>
                                            <td>{item.invoice_item_quantity}</td>
                                            <td>{item.invoice_item_unit_price.toFixed(2)}</td>
                                            <td>{item.invoice_item_cgst_rate}%</td>
                                            <td>{item.invoice_item_cgst_amount.toFixed(2)}</td>
                                            <td>{item.invoice_item_sgst_rate}%</td>
                                            <td>{item.invoice_item_sgst_amount.toFixed(2)}</td>
                                            <td>{item.invoice_item_igst_rate}%</td>
                                            <td>{item.invoice_item_igst_amount.toFixed(2)}</td>
                                            <td>{item.invoice_item_total_amount.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="totals-section flex flex-row">
                            {/* <!-- Totals --> */}
                            <div className="notes">
                                <p className='my-2'>Total In Words: <br /><strong><EditableField
                                    value={moneyInWord}
                                    onChange={(val) => moneyInWord = val}
                                /></strong></p>
                                <p>Notes: <br /><strong><EditableField
                                    value={editableInvoice.invoice_notes}
                                    onChange={(val) => setEditableInvoice({
                                        ...editableInvoice, invoice_notes: val
                                    })}
                                /></strong></p>
                            </div>
                            <div className="amounts">
                                <div><span>Sub Total</span><span>{invoice.invoice_subtotal.toFixed(2)}</span></div>
                                <div><span>CGST</span><span>{invoice.invoice_total_cgst.toFixed(2)}</span></div>
                                <div><span>SGST</span><span>{invoice.invoice_total_sgst.toFixed(2)}</span></div>
                                <div><span>IGST</span><span>{invoice.invoice_total_igst.toFixed(2)}</span></div>
                                <div className="bold total"><span>Total</span><span>₹{invoice.invoice_total.toFixed(2)}</span></div>
                                <div className="bold balance"><span>Balance Due</span><span>₹{invoice.invoice_total.toFixed(2)}</span></div>
                            </div>
                        </div>

                        <div className='flex w-full justify-between'>
                            <div className='text-[12px]'>
                                <h6 className='font-semibold'>Bank Details:</h6>
                                <p>Account No:  <EditableField
                                    value={companyDetail.company_bank_account_no}
                                    onChange={(val) => setCompanyDetail({
                                        ...companyDetail, company_bank_account_no: val
                                    })}
                                    className='font-medium'
                                /></p>
                                <p>Bank Name: <EditableField
                                    value={companyDetail.company_bank_name}
                                    onChange={(val) => setCompanyDetail({
                                        ...companyDetail, company_bank_name: val
                                    })} className='font-medium'
                                /></p>
                                <p>Account Holder: <EditableField
                                    value={companyDetail.company_name}
                                    onChange={(val) => setCompanyDetail({
                                        ...companyDetail, company_name: val
                                    })} className='font-medium'
                                /></p>
                                <p>Branch: <EditableField
                                    value={companyDetail.company_branch}
                                    onChange={(val) => setCompanyDetail({
                                        ...companyDetail, company_branch: val
                                    })} className='font-medium'
                                /></p>
                                <p>IFSC Code: <EditableField
                                    value={companyDetail.company_ifsc_code}
                                    onChange={(val) => setCompanyDetail({
                                        ...companyDetail, company_ifsc_code: val
                                    })} className='font-medium'
                                /></p>
                            </div>
                            {/* <!-- Signature --> */}
                            <div className="signature w-25 sm:w-50 p-2 flex flex-col items-end-safe justify-end-safe">
                                <p>Authorized Signature</p>
                                <div className='flex gap-1'>For <strong>
                                    <EditableField
                                        value={editableInvoice.invoice_by.company_name}
                                        onChange={(val) => setEditableInvoice({
                                            ...editableInvoice,
                                            invoice_by: { ...editableInvoice.invoice_by, company_name: val }
                                        })}
                                    />
                                </strong></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate("/invoices")}
                            className="model-details-actions-back "
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back
                        </button>
                        <button
                            onClick={() => handleDeleteInvoice(invoice.invoice_id, invoice.owner_company)}
                            className="model-details-actions-delete "
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </button>
                        <button
                            onClick={() => navigate(`/invoiceForm/${invoice.invoice_id}`)}
                            className="model-details-actions-edit "
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default InvoiceDetail;

