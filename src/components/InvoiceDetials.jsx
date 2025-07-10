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

const InvoiceDetail = () => {
    const { id } = useParams();
    const { token, yourInvoices, yourProducts, navigate } = React.useContext(DataContext);
    const componentRef = useRef();

    const invoice = yourInvoices.find(val => val.invoice_id == id);

    const [changeTitle, setChangeTitle] = useState(false);


    const product_name = (pID) => {
        // console.log(yourProducts)
        const temp = yourProducts.find(val => val.product_id == pID).product_name;
        return temp;
    }

    const sanitizeColorsToBW = (element) => {
        if (!element) return;

        const elements = [element, ...element.querySelectorAll('*')];
        elements.forEach(el => {
            el.style.color = '#000000';
            el.style.backgroundColor = '#ffffff';
            el.style.borderColor = '#000000';
            el.style.outlineColor = '#000000';
            el.style.textDecorationColor = '#000000';

            const shadow = window.getComputedStyle(el).boxShadow;
            if (shadow && shadow.includes('oklch') || shadow !== 'none') {
                el.style.boxShadow = 'none';
            }
        });
    };

    const downloadAsPDF = async () => {
        if (!componentRef.current) return;

        const clone = componentRef.current.cloneNode(true);
        sanitizeColorsToBW(clone);

        // Styling for isolated rendering
        clone.style.width = componentRef.current.offsetWidth + 'px';
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
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: [600, 450]
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // Calculate image height based on width scaling
            const imgProps = {
                width: pageWidth,
                height: (canvas.height * pageWidth) / canvas.width,
            };

            if (imgProps.height < pageHeight) {
                // Fit in single page
                pdf.addImage(imgData, 'PNG', 0, 0, imgProps.width, imgProps.height);
            } else {
                // Split into multiple pages
                let position = 0;
                while (position < imgProps.height) {
                    pdf.addImage(
                        imgData,
                        'PNG',
                        0,
                        -position,
                        imgProps.width,
                        imgProps.height
                    );
                    position += pageHeight;

                    if (position < imgProps.height) {
                        pdf.addPage();
                    }
                }
            }

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

        const clone = componentRef.current.cloneNode(true);
        sanitizeColorsToBW(clone);

        clone.style.width = componentRef.current.offsetWidth + 'px';
        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
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
        const isOk = window.confirm("Are you sure you want to delete this Invoice?");
        if (isOk) {
            try {
                await api.delete(`invoices/${invoiceId}?company_id=${companyId}`, {
                });
                alert("Invoice Deleted Successfully.");
                navigate('/invoices');
            } catch (e) {
                console.error("Error deleting invoice:", e);
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

            <div className="flex justify-center mb-5 gap-1">
                <h5 className='text-lg text-blue-800 font-semibold mr-2'>Choose Invoice Title : </h5>
                <div onClick={() => setChangeTitle(true)} >
                    <input type="radio" name="invoice-title" id="invoice-title" />
                    <span className='text-lg font-medium mr-2'>Perfoma</span>
                </div>
                <div onClick={() => setChangeTitle(false)} >
                    <input type="radio" name="invoice-title" id="invoice-title" checked={!changeTitle} />
                    <span className='text-lg font-medium'>Tax</span>
                </div>
            </div>

            <div ref={componentRef} className="max-w-4xl md:scale-1 scale-[50%] mx-auto border border-black text-[12px] font-sans bg-white p-4">
                {/* Header */}
                <div className="flex justify-between border-b border-black pb-2 mb-2">
                    <div className="flex gap-2 items-center">
                        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                            LOGO
                        </div>
                        <div>
                            <h2 className="font-bold text-base">{invoice.invoice_by.company_name}</h2>
                            <p>{invoice.invoice_by.company_address}</p>
                            <p>GSTIN {invoice.invoice_by.company_gstin}</p>
                            <p>MSME: {invoice.invoice_by.company_msme}</p>
                            <p>{invoice.invoice_by.company_email}</p>
                        </div>
                    </div>
                    <div className="text-right font-bold text-xl">TAX INVOICE</div>
                </div>

                {/* Invoice Info */}
                <div className="grid grid-cols-2 gap-1 border-b border-black pb-2 mb-2">
                    <div className="grid grid-cols-[100px_1fr] gap-y-1">
                        <div># Invoice</div><div>: {invoice.invoice_number}</div>
                        <div>Date</div><div>: {new Date(invoice.invoice_date).toLocaleDateString()}</div>
                        <div>Terms</div><div>: {invoice.invoice_terms}</div>
                        <div>Due Date</div><div>: {new Date(invoice.invoice_due_date).toLocaleDateString()}</div>
                    </div>
                    <div className="grid grid-cols-[100px_1fr]">
                        <div>Place Of Supply</div><div>: {invoice.invoice_place_of_supply}</div>
                    </div>
                </div>

                {/* Bill & Ship To */}
                <div className="grid grid-cols-2 gap-2 border-b border-black pb-2 mb-2">
                    <div className="border border-black">
                        <div className="bg-gray-200 px-2 py-1 font-semibold border-b border-black">Bill To</div>
                        <div className="px-2 py-1">
                            <p className="font-bold">{invoice.client.customer_name}</p>
                            <p>{invoice.client.customer_address_line1}</p>
                            <p>{invoice.client.customer_address_line2}</p>
                            <p>{invoice.client.customer_city} - {invoice.client.customer_postal_code}</p>
                            <p>{invoice.client.customer_country}</p>
                            <p>GSTIN {invoice.client.customer_gstin}</p>
                        </div>
                    </div>
                    <div className="border border-black">
                        <div className="bg-gray-200 px-2 py-1 font-semibold border-b border-black">Ship To</div>
                        <div className="px-2 py-1">
                            <p className="font-bold">{invoice.client.customer_name}</p>
                            <p>{invoice.client.customer_address_line1}</p>
                            <p>{invoice.client.customer_address_line2}</p>
                            <p>{invoice.client.customer_city} - {invoice.client.customer_postal_code}</p>
                            <p>{invoice.client.customer_country}</p>
                            <p>GSTIN {invoice.client.customer_gstin}</p>
                        </div>
                    </div>
                </div>

                {/* Products */}
                <table className="w-full border-black text-xs mb-2">
                    <thead>
                        <tr className="bg-gray-100 text-center font-medium">
                            <th className="border p-1">#</th>
                            <th className="border p-1">Item & Description</th>
                            <th className="border p-1">HSN/SAC</th>
                            <th className="border p-1">Qty</th>
                            <th className="border p-1">Rate</th>
                            <th className="border p-1">CGST%</th>
                            <th className="border p-1">CGST Amt</th>
                            <th className="border p-1">SGST%</th>
                            <th className="border p-1">SGST Amt</th>
                            <th className="border p-1">IGST%</th>
                            <th className="border p-1">IGST Amt</th>
                            <th className="border p-1">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.products.map((item, i) => {
                            // const base = item.invoice_item_quantity * item.invoice_item_unit_price;
                            // console.log(item)
                            return (
                                <tr key={i} className="text-center">
                                    <td className="border p-1">{i + 1}</td>
                                    <td className="border p-1 text-left">{product_name(item.product_id) || "Product"}</td>
                                    <td className="border p-1">996819</td>
                                    <td className="border p-1">{item.invoice_item_quantity}</td>
                                    <td className="border p-1">{item.invoice_item_unit_price.toFixed(2)}</td>
                                    <td className="border p-1">{item.invoice_item_cgst_rate}%</td>
                                    <td className="border p-1">{item.invoice_item_cgst_amount.toFixed(2)}</td>
                                    <td className="border p-1">{item.invoice_item_sgst_rate}%</td>
                                    <td className="border p-1">{item.invoice_item_sgst_amount.toFixed(2)}</td>
                                    <td className="border p-1">{item.invoice_item_igst_rate}%</td>
                                    <td className="border p-1">{item.invoice_item_igst_amount.toFixed(2)}</td>
                                    <td className="border p-1">{item.invoice_item_total_amount.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Totals and Footer */}
                <div className="flex justify-between">
                    <div className="text-xs">
                        <p><strong>Total In Words:</strong> Indian Rupee Fifteen Thousand Eight Hundred Seventy-One Only</p>
                        <p><strong>Notes:</strong> {invoice.invoice_notes}</p>
                    </div>
                    <div className="text-xs">
                        <div className="flex justify-between"><span>Sub Total</span><span>{invoice.invoice_subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>CGST</span><span>{invoice.invoice_total_cgst.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>SGST</span><span>{invoice.invoice_total_sgst.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>IGST</span><span>{invoice.invoice_total_igst.toFixed(2)}</span></div>
                        <div className="flex justify-between font-bold text-lg mt-1"><span>Total</span><span>₹{invoice.invoice_total.toFixed(2)}</span></div>
                        <div className="flex justify-between font-bold bg-gray-100 py-1 mt-1"><span>Balance Due</span><span>₹{invoice.invoice_total.toFixed(2)}</span></div>
                    </div>
                </div>

                {/* Signature */}
                <div className="text-right mt-4">
                    <p>Authorized Signature</p>
                    <div className="border-t border-black mt-2 pt-1 text-xs">For {invoice.invoice_by.company_name}</div>
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
