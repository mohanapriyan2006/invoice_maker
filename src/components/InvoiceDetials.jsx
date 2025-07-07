import React, { useRef } from 'react';
import '../style/Invoice.css';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DataContext from '../context/DataContest';
import { api } from '../API/api';
import deleteI from '../assets/delete1.png';
import editI from '../assets/edit.png';
import downloadI from '../assets/download.png';

const InvoiceDetail = () => {
    const { id } = useParams();
    const { token, yourInvoices, navigate } = React.useContext(DataContext);
    const componentRef = useRef();

    const invoice = yourInvoices.find(val => val.invoice_id == id);
    // const invoice = yourInvoices[0];

    const sanitizeColors = (element) => {
        if (!element) return;
        element.querySelectorAll('*').forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.color.includes('oklch')) el.style.color = '#000';
            if (style.backgroundColor.includes('oklch')) el.style.backgroundColor = '#fff';
        });
    };


    const downloadAsImage = async () => {
        if (!componentRef.current) return;

        try {
            sanitizeColors(componentRef.current);

            const canvas = await html2canvas(componentRef.current, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png', 1.0);
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `Invoice_${invoice.invoice_number}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error generating image:", error);
            alert("Failed to generate image. Please try again.");
        }
    };

    const downloadAsPDF = async () => {
        if (!componentRef.current) return;

        try {
            sanitizeColors(componentRef.current);

            const canvas = await html2canvas(componentRef.current, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const imgWidth = pageWidth - 20; // 10mm margins on each side
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            pdf.save(`Invoice_${invoice.invoice_number}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
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
                    <img src={downloadI} alt="icon" className="btn-icon" />
                    Download PNG
                </button>
                <button onClick={downloadAsPDF} className="btn-1 px-5 py-2 flex gap-0 md:gap-2">
                    <img src={downloadI} alt="icon" className="btn-icon" />
                    Download PDF
                </button>
            </div>

            <div
                ref={componentRef}
                className="bg-white shadow-2xl rounded-xl p-8 md:ml-0 ml-4 max-w-5xl mx-auto border border-gray-200"
            >
                <div className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Tax Invoice
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-sm mb-6">
                    <div>
                        <h4 className="font-semibold text-lg mb-1 text-gray-700">From</h4>
                        <p>{invoice.invoice_by?.company_name}</p>
                        <p>{invoice.invoice_by?.company_address}</p>
                        <p>GSTIN: {invoice.invoice_by?.company_gstin}</p>
                        <p>Email: {invoice.invoice_by?.company_email}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg mb-1 text-gray-700">To</h4>
                        <p>{invoice.client?.customer_name}</p>
                        <p>{invoice.client?.customer_address_line1}, {invoice.client?.customer_address_line2}</p>
                        <p>{invoice.client?.customer_city}, {invoice.client?.customer_state}</p>
                        <p>{invoice.client?.customer_country} - {invoice.client?.customer_postal_code}</p>
                        <p>GSTIN: {invoice.client?.customer_gstin}</p>
                        <p>Email: {invoice.client?.customer_email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-6">
                    <div><strong>Invoice No:</strong> {invoice.invoice_number}</div>
                    <div><strong>Invoice Date:</strong> {new Date(invoice.invoice_date).toLocaleDateString()}</div>
                    <div><strong>Due Date:</strong> {new Date(invoice.invoice_due_date).toLocaleDateString()}</div>
                    <div><strong>Terms:</strong> {invoice.invoice_terms}</div>
                    <div><strong>Place of Supply:</strong> {invoice.invoice_place_of_supply}</div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-collapse mb-6">
                        <thead className="bg-gray-100 text-gray-800">
                            <tr>
                                <th className="border px-3 py-2 text-left">#</th>
                                <th className="border px-3 py-2 text-left">Product</th>
                                <th className="border px-3 py-2 text-right">Qty</th>
                                <th className="border px-3 py-2 text-right">Rate</th>
                                <th className="border px-3 py-2 text-right">CGST</th>
                                <th className="border px-3 py-2 text-right">SGST</th>
                                <th className="border px-3 py-2 text-right">IGST</th>
                                <th className="border px-3 py-2 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.products.length > 0 ? (
                                invoice.products.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="border px-3 py-2">{idx + 1}</td>
                                        <td className="border px-3 py-2">{item.product?.product_name || "N/A"}</td>
                                        <td className="border px-3 py-2 text-right">{item.invoice_item_quantity}</td>
                                        <td className="border px-3 py-2 text-right">₹{item.invoice_item_unit_price?.toFixed(2)}</td>
                                        <td className="border px-3 py-2 text-right">₹{item.invoice_item_cgst_amount?.toFixed(2)}</td>
                                        <td className="border px-3 py-2 text-right">₹{item.invoice_item_sgst_amount?.toFixed(2)}</td>
                                        <td className="border px-3 py-2 text-right">₹{item.invoice_item_igst_amount?.toFixed(2)}</td>
                                        <td className="border px-3 py-2 text-right">₹{item.invoice_item_total_amount?.toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-4 text-gray-500">No products added.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end text-sm">
                    <table className="text-right border-collapse">
                        <tbody>
                            <tr><td className="py-1">Subtotal:</td><td className="pl-6">₹{invoice.invoice_subtotal.toFixed(2)}</td></tr>
                            <tr><td className="py-1">CGST:</td><td className="pl-6">₹{invoice.invoice_total_cgst.toFixed(2)}</td></tr>
                            <tr><td className="py-1">SGST:</td><td className="pl-6">₹{invoice.invoice_total_sgst.toFixed(2)}</td></tr>
                            <tr><td className="py-1">IGST:</td><td className="pl-6">₹{invoice.invoice_total_igst.toFixed(2)}</td></tr>
                            <tr className="font-semibold text-lg border-t pt-2">
                                <td className="py-2">Total:</td>
                                <td className="pl-6">₹{invoice.invoice_total.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 text-sm">
                    <p className="font-medium mb-1">Notes:</p>
                    <p className="text-gray-700">{invoice.invoice_notes || "No additional notes."}</p>
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
    );

};

export default InvoiceDetail;
