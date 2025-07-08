import React, { useRef } from 'react';
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
    const { token, yourInvoices, navigate } = React.useContext(DataContext);
    const componentRef = useRef();

    const invoice = yourInvoices.find(val => val.invoice_id == id);

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
                    headers: { 'Authorization': ` Bearer ${token}` }
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

            <div className="flex justify-center flex-wrap gap-1 md:gap-3 mb-5">
                <button onClick={downloadAsImage} className="btn-1 px-5 py-2 flex gap-0 md:gap-2">
                    <Image className='icon' />
                    Download PNG
                </button>
                <button onClick={downloadAsPDF} className="btn-1 px-5 py-2 flex gap-0 md:gap-2">
                    <Download className='icon' />
                    Download PDF
                </button>
            </div>

            <div ref={componentRef} className="bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="p-8">
                    {/* Tax Invoice Header */}
                    <div className="text-center mb-8">
                        <div className="inline-block bg-blue-50 px-4 py-2 rounded-lg mb-2">
                            <FileText className="w-5 h-5 text-blue-600 inline mr-2" />
                            <span className="text-blue-800 text-2xl font-semibold">Tax Invoice</span>
                        </div>
                    </div>

                    {/* Company Logo and Header Info */}
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl font-bold text-green-600">logo</span>
                            </div>
                            <div className='space-y-1.5'>
                                <h2 className="text-xl font-bold text-gray-800">{invoice.invoice_by.company_name}</h2>
                                <p className="text-sm text-gray-600">{invoice.invoice_by.company_address}</p>
                                <p className="text-sm text-gray-600">India</p>
                            </div>
                        </div>
                        <div className="text-right text-sm text-gray-600 space-y-1.5">
                            <p><strong>GSTIN:</strong> {invoice.invoice_by.company_gstin}</p>
                            <p><strong>MSME:</strong> UDYAM-KR-03-0381264</p>
                            <p><strong>Email:</strong> {invoice.invoice_by.company_email}</p>
                        </div>
                    </div>

                    {/* Invoice Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Invoice Info */}
                        <div className="space-y-2">
                            <div className="text-sm">
                                <span className="font-medium text-gray-700"># Invoice:</span>
                                <span className="ml-2 font-semibold">{invoice.invoice_number}</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-700">Date:</span>
                                <span className="ml-2">{new Date(invoice.invoice_date).toLocaleDateString()}</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-700">Terms:</span>
                                <span className="ml-2">{invoice.invoice_terms}</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-700">Due Date:</span>
                                <span className="ml-2">{new Date(invoice.invoice_due_date).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Place of Supply */}
                        <div className="space-y-2">
                            <div className="text-sm">
                                <span className="font-medium text-gray-700">Place Of Supply:</span>
                                <span className="ml-2">{invoice.invoice_place_of_supply}</span>
                            </div>
                        </div>

                        <div></div>
                    </div>

                    {/* Bill To and Ship To */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3 pb-2 border-b">Bill To</h3>
                            <div className="space-y-1 text-sm">
                                <p className="font-medium">{invoice.client.customer_name}</p>
                                <p>{invoice.client.customer_address_line1},</p>
                                <p>{invoice.client.customer_address_line2},</p>
                                <p>{invoice.client.customer_city} - {invoice.client.customer_postal_code}</p>
                                <p>{invoice.client.customer_country}</p>
                                <p><strong>GSTIN:</strong> {invoice.client.customer_gstin}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3 pb-2 border-b">Ship To</h3>
                            <div className="space-y-1 text-sm">
                                <p className="font-medium">{invoice.client.customer_name}</p>
                                <p>{invoice.client.customer_address_line1},</p>
                                <p>{invoice.client.customer_address_line2},</p>
                                <p>{invoice.client.customer_city} - {invoice.client.customer_postal_code}</p>
                                <p>{invoice.client.customer_country}</p>
                                <p><strong>GSTIN:</strong> {invoice.client.customer_gstin}</p>
                            </div>
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className="overflow-x-auto mb-8">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">#</th>
                                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Item & Description</th>
                                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">HSN</th>
                                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">Qty</th>
                                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">Rate</th>
                                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">CGST<br />%</th>
                                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">Amt</th>
                                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">SGST<br />%</th>
                                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">Amt</th>
                                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.products.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-3 py-2 text-sm">{idx + 1}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-sm">{item.product?.product_name}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                                            {idx === 0 ? "9019201" : "996819"}
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2 text-center text-sm">{item.invoice_item_quantity}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-center text-sm">₹{item.invoice_item_unit_price?.toFixed(2)}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-center text-sm">9%</td>
                                        <td className="border border-gray-300 px-3 py-2 text-center text-sm">₹{item.invoice_item_cgst_amount?.toFixed(2)}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-center text-sm">9%</td>
                                        <td className="border border-gray-300 px-3 py-2 text-center text-sm">₹{item.invoice_item_sgst_amount?.toFixed(2)}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">₹{item.invoice_item_total_amount?.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer with totals and notes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left side - Notes and Terms */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Total In Words</h4>
                                <p className="text-sm italic text-gray-600">Indian Rupee Fifteen Thousand Eight Hundred Seventy-One Only</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Notes</h4>
                                <p className="text-sm text-gray-600">{invoice.invoice_notes}</p>
                            </div>

                            <div className="text-xs text-gray-500 space-y-1">
                                <p><strong>Terms & Conditions</strong></p>
                                <p>1. Price: Ex-Works Bangalore</p>
                                <p>2. Payment terms: 30 Days after materials delivery.</p>
                                <p><strong>Bank Details:</strong></p>
                                <p>Account No: 79200200001767</p>
                                <p>Bank Name: Bank of Baroda</p>
                                <p>Account Holder: MS Traders and Solutions</p>
                                <p>Branch: Bilekahalli</p>
                                <p>IFSC Code: BARB0VJBILE</p>
                            </div>
                        </div>

                        {/* Right side - Totals */}
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Sub Total</span>
                                        <span>₹{invoice.invoice_subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>CGST9 (9%)</span>
                                        <span>₹{invoice.invoice_total_cgst.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>SGST9 (9%)</span>
                                        <span>₹{invoice.invoice_total_sgst.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t pt-2 mt-2 space-y-1.5">
                                        <div className="flex justify-between font-semibold text-base">
                                            <span>Total</span>
                                            <span>₹{invoice.invoice_total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between font-bold text-lg text-blue-600">
                                            <span>Balance Due</span>
                                            <span>₹{invoice.invoice_total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-sm text-gray-600 mb-8">Authorized Signature</p>
                                <div className="border-t border-gray-300 pt-2">
                                    <p className="text-xs text-gray-500">For {invoice.invoice_by.company_name}</p>
                                </div>
                            </div>
                        </div>
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
