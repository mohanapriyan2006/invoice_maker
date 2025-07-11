import React, { useRef, useState } from 'react';
import '../style/Invoice.css';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DataContext from '../context/DataContest';
import { api } from '../API/api';
import deleteI from '../assets/delete1.png';
import editI from '../assets/edit.png';
import { Download, FileText, Image } from 'lucide-react';
import { convertNumberToWords } from '../hooks/NumToWord';
import Swal from 'sweetalert2';

const InvoiceDetail = () => {
    const { id } = useParams();
    const { yourInvoices, yourProducts, navigate, deleteAlert } = React.useContext(DataContext);
    const componentRef = useRef();

    const invoice = yourInvoices.find(val => val.invoice_id == id);

    const [changeTitle, setChangeTitle] = useState(false);

    const moneyInWord = convertNumberToWords(Math.trunc(invoice.invoice_total));

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

    const product_name = (pID) => {
        // console.log(yourProducts)
        const temp = yourProducts.find(val => val.product_id == pID).product_name;
        return temp;
    }


    const downloadAsPDF = async () => {

        if (!componentRef.current) return;

        GenerateInvoice();

        const clone = componentRef.current.cloneNode(true);


        clone.classList.remove("scale-[90%]");
        clone.classList.add("scale-100", "text-[12px]", "md:text-[12px]", "p-4");


        clone.style.width = "1024px";
        clone.style.maxWidth = "none";
        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
        clone.style.top = '0';

        document.body.appendChild(clone);

        try {
            const canvas = await html2canvas(clone, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true
            });

            const imgData = canvas.toDataURL('image/png');

            const divWidthPx = clone.offsetWidth;
            const divHeightPx = clone.offsetHeight;

            const pdf = new jsPDF({
                orientation: divWidthPx > divHeightPx ? 'landscape' : 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // Convert pixels to mm
            const pxToMm = (px) => (px * 25.4) / 96;
            const divWidthMm = pxToMm(divWidthPx);
            const divHeightMm = pxToMm(divHeightPx);

            // Define margins
            const marginTop = 10; // mm
            const marginLeft = 10; // mm
            const marginRight = 10; // mm
            const marginBottom = 10; // mm

            const availableWidth = pageWidth - marginLeft - marginRight;

            // Scale proportionally to fit available width
            let renderWidth = divWidthMm;
            let renderHeight = divHeightMm;

            const availableHeight = pageHeight - marginTop - marginBottom;

            // Adjust height if it overflows available height
            if (renderHeight > availableHeight) {
                const ratio = availableHeight / renderHeight;
                renderHeight = availableHeight;
                renderWidth = renderWidth * ratio;
            }


            if (renderWidth > availableWidth) {
                const ratio = availableWidth / renderWidth;
                renderWidth = availableWidth;
                renderHeight = renderHeight * ratio;
            }

            pdf.addImage(imgData, 'PNG', marginLeft, marginTop, renderWidth, renderHeight);

            pdf.save(`Invoice_${invoice.invoice_number}.pdf`);
        } catch (error) {
            console.error("PDF Export Error:", error);
            alert("Failed to generate PDF.");
        } finally {
            document.body.removeChild(clone);
        }
    };

    const downloadAsImage = async () => {
        if (!componentRef.current) return;

        GenerateInvoice();

        const clone = componentRef.current.cloneNode(true);


        clone.classList.remove("scale-[90%]");
        clone.classList.add("scale-100", "text-[12px]", "md:text-[12px]", "p-4");

        clone.style.width = "1024px";
        clone.style.maxWidth = "none";
        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
        clone.style.top = '0';
        document.body.appendChild(clone);


        try {
            const canvas = await html2canvas(clone, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
            });

            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `Invoice_${invoice.invoice_number}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Image Export Error:", error);
            alert("Failed to generate image.");
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
        return (<div className='text-center mt-10'>
            <h5 className='text-2xl font-semibold text-yellow-700'>Invoice Not Found !</h5>
            <button className='btn-1 px-4' onClick={() => navigate('/invoices')}>Go Back</button>
        </div>)
    }

    return (
        <div className="p-8 py-2">
            <h3 className="text-3xl font-bold text-center mb-6 text-blue-900">
                Invoice Details
            </h3>

            <div className="flex justify-center flex-wrap gap-1 md:gap-3 mb-2">
                <button onClick={downloadAsImage} className="btn-1 px-5 py-2 flex gap-0 md:gap-2">
                    <Image className='icon' />
                    Download PNG
                </button>
                <button onClick={downloadAsPDF} className="btn-1 px-5 py-2 flex gap-0 md:gap-2">
                    <Download className='icon' />
                    Download PDF
                </button>
            </div>

            <div className="flex justify-center mb-0 md:mb-5 gap-1">
                <h5 className='md:text-lg text-sm text-blue-800 font-semibold mr-2'>Choose Invoice Title : </h5>
                <div className='flex md:flex-row flex-col gap-1'>
                    <div onClick={() => setChangeTitle(true)} className='cursor-pointer' >
                        <input type="radio" name="invoice-title" id="invoice-title" checked={changeTitle} onChange={() => setChangeTitle(true)} />
                        <span className='md:text-lg text-sm font-medium mr-2' >Perfoma</span>
                    </div>
                    <div onClick={() => setChangeTitle(false)} className='cursor-pointer'>
                        <input type="radio" name="invoice-title" id="invoice-title" checked={!changeTitle} onChange={() => setChangeTitle(false)} />
                        <span className='md:text-lg text-sm  font-medium'>Tax</span>
                    </div>
                </div>
            </div>

            <div ref={componentRef} className="invoice-container">
                {/* <!-- Header --> */}
                <div className="invoice-header p-2">
                    <div className="company-info">
                        <div className="logo">LOGO</div>
                        <div className="company-details ml-10 border-l pl-4">
                            <h2>{invoice.invoice_by.company_name}</h2>
                            <p>{invoice.invoice_by.company_address}</p>
                            <p>GSTIN {invoice.invoice_by.company_gstin}</p>
                            <p>MSME: {invoice.invoice_by.company_msme}</p>
                            <p>{invoice.invoice_by.company_email}</p>
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
                            <p className='font-semibold'>: {invoice.invoice_number}</p>
                            <p className='font-semibold'>: {new Date(invoice.invoice_date).toLocaleDateString()}</p>
                            <p className='font-semibold'>: {invoice.invoice_terms}</p>
                            <p className='font-semibold'>: {new Date(invoice.invoice_due_date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="info-right flex p-3 border-l-2 min-h-[80px] justify-around">
                        <div>
                            <p>Place Of Supply </p>
                        </div>
                        <div>
                            <p className='font-semibold'>: {invoice.invoice_place_of_supply}</p>
                        </div>
                    </div>
                </div>

                {/* <!-- Bill & Ship To --> */}
                <div className="billing-shipping">
                    <div className="box pb-2">
                        <div className="box-title">Bill To</div>
                        <div className="box-body">
                            <p className="bold">{invoice.client.customer_name}</p>
                            <p>{invoice.client.customer_address_line1}</p>
                            <p>{invoice.client.customer_address_line2}</p>
                            <p>{invoice.client.customer_city} - {invoice.client.customer_postal_code}</p>
                            <p>{invoice.client.customer_country}</p>
                            <p>GSTIN {invoice.client.customer_gstin}</p>
                        </div>
                    </div>
                    <div className="box pb-2">
                        <div className="box-title">Ship To</div>
                        <div className="box-body">
                            <p className="bold">{invoice.client.customer_name}</p>
                            <p>{invoice.client.customer_address_line1}</p>
                            <p>{invoice.client.customer_address_line2}</p>
                            <p>{invoice.client.customer_city} - {invoice.client.customer_postal_code}</p>
                            <p>{invoice.client.customer_country}</p>
                            <p>GSTIN {invoice.client.customer_gstin}</p>
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
                            {invoice.products.map((item, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{product_name(item.product_id) || "Product"}</td>
                                    <td>996819</td>
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
                        <p className='my-2'>Total In Words: <br /><strong>{moneyInWord}</strong></p>
                        <p>Notes: <br /><strong>{invoice.invoice_notes}</strong></p>
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
                    <div>
                        <p>bjadf sdjfb</p>
                        <p>bjadf sdjfb</p>
                        <p>bjadf sdjfb</p>
                        <p>bjadf sdjfb</p>
                        <p>bjadf sdjfb</p>
                    </div>
                    {/* <!-- Signature --> */}
                    <div className="signature w-50 p-2 flex flex-col items-end-safe justify-end-safe">
                        <p>Authorized Signature</p>
                        <div>For <strong>{invoice.invoice_by.company_name}</strong></div>
                    </div>
                </div>

            </div>


            <div className="details-btns">
                <button
                    onClick={() => navigate("/invoices")}
                    className="back"
                >
                    Back
                </button>
                <button
                    onClick={() => handleDeleteInvoice(invoice.invoice_id, invoice.owner_company)}
                    className="delete"
                >
                    <img src={deleteI} alt="Delete" className="btn-icon" /> Delete
                </button>
                <button
                    onClick={() => navigate(`/invoiceForm/${invoice.invoice_id}`)}
                    className="edit btn-1"
                >
                    <img src={editI} alt="Edit" className="btn-icon" /> Edit
                </button>
            </div>
        </div>
    )

};

export default InvoiceDetail;
