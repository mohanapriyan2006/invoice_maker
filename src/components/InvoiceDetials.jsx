import React, { useRef } from 'react';
// import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DataContext from '../context/DataContest';
import { api } from '../API/api';
import deleteI from '../assets/delete1.png'
import editI from '../assets/edit.png'

const InvoiceDetail = () => {
    // const { id } = useParams();
    const { token, yourInvoices, navigate } = React.useContext(DataContext);
    // const invoice = yourInvoices.find(i => i.invoice_id === id);

    const invoice = yourInvoices[0];

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Invoice_${invoice.invoice_number}`,
    });

    const downloadAsImage = async () => {
        if (!componentRef.current) return;

        await new Promise(resolve => requestAnimationFrame(resolve)); // Wait for DOM paint
        const canvas = await html2canvas(componentRef.current);
        const imgData = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = imgData;
        link.download = `Invoice_${invoice.invoice_number}.png`;
        link.click();
    };

    const downloadAsPDF = async () => {
        if (!componentRef.current) return;

        await new Promise(resolve => requestAnimationFrame(resolve));
        const canvas = await html2canvas(componentRef.current);
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        // const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save(`Invoice_${invoice.invoice_number}.pdf`);
    };

    // delete

    const handleDeleteInvoice = async (id, cId) => {
        let isOk = confirm("Are you want to delete this Invoice ?");
        if (isOk) {
            try {
                await api.delete(`invoices/${id}?company_id=${cId}&invoice_id=${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                alert("Invoice Deleted Successfully.");
            } catch (e) {
                if (e.response && e.response.data) {
                    console.log("Error in Delete Invoice : ", e.response.data)
                } else {
                    alert("Server Error in Delete Invoice : ", e);
                }
            }
        }
    }


    if (!invoice || !invoice.invoice_by || !invoice.client) {
        return <div className="text-center mt-10">Loading invoice...</div>;
    }

    if (!invoice) return <div className="text-center mt-10">Invoice not found</div>;

    return (
        <div className="p-6 md:m-auto ml-5">
            <h3 className='md:text-2xl text-[20px] font-semibold text-blue-900 text-center underline mb-5'>Your Invoice Details</h3>
            <div className="flex justify-center mb-4 gap-2">
                <button onClick={handlePrint} className="btn-1 px-2">Print</button>
                <button onClick={downloadAsImage} className="btn-1 px-2">Download PNG</button>
                <button onClick={downloadAsPDF} className="btn-1 px-2">Download PDF</button>
            </div>

            <div ref={componentRef} className="bg-white p-8 shadow-lg rounded-lg max-w-4xl mx-auto">
                <div className="text-center text-2xl font-bold text-blue-800 mb-6">
                    Tax Invoice
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm mb-6">
                    <div>
                        <h3 className="font-semibold text-lg">From:</h3>
                        <p>{invoice.invoice_by.company_name}</p>
                        <p>{invoice.invoice_by.company_address}</p>
                        <p>GSTIN: {invoice.invoice_by.company_gstin}</p>
                        <p>Email: {invoice.invoice_by.company_email}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">To:</h3>
                        <p>{invoice.client.customer_name}</p>
                        <p>{invoice.client.customer_address_line1}, {invoice.client.customer_address_line2}</p>
                        <p>{invoice.client.customer_city}, {invoice.client.customer_state}</p>
                        <p>{invoice.client.customer_country} - {invoice.client.customer_postal_code}</p>
                        <p>GSTIN: {invoice.client.customer_gstin}</p>
                        <p>Email: {invoice.client.customer_email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm mb-6">
                    <div><strong>Invoice No:</strong> {invoice.invoice_number}</div>
                    <div><strong>Invoice Date:</strong> {new Date(invoice.invoice_date).toLocaleDateString()}</div>
                    <div><strong>Due Date:</strong> {new Date(invoice.invoice_due_date).toLocaleDateString()}</div>
                    <div><strong>Terms:</strong> {invoice.invoice_terms}</div>
                    <div><strong>Place of Supply:</strong> {invoice.invoice_place_of_supply}</div>
                </div>

                <table className="w-full text-sm border border-collapse mb-4">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-2 py-1 text-left">#</th>
                            <th className="border px-2 py-1 text-left">Product</th>
                            <th className="border px-2 py-1 text-right">Qty</th>
                            <th className="border px-2 py-1 text-right">Rate</th>
                            <th className="border px-2 py-1 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.products.map((item, idx) => (
                            <tr key={idx}>
                                <td className="border px-2 py-1">{idx + 1}</td>
                                <td className="border px-2 py-1">{item.product_name}</td>
                                <td className="border px-2 py-1 text-right">{item.invoice_item_quantity}</td>
                                <td className="border px-2 py-1 text-right">₹{item.product_unit_price.toFixed(2)}</td>
                                <td className="border px-2 py-1 text-right">₹{(item.invoice_item_quantity * item.product_unit_price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-end text-sm">
                    <table className="text-right border-collapse">
                        <tbody>
                            <tr><td>Subtotal:</td><td className="pl-6">₹{invoice.invoice_subtotal.toFixed(2)}</td></tr>
                            <tr><td>CGST:</td><td className="pl-6">₹{invoice.invoice_total_cgst.toFixed(2)}</td></tr>
                            <tr><td>SGST:</td><td className="pl-6">₹{invoice.invoice_total_sgst.toFixed(2)}</td></tr>
                            <tr><td>IGST:</td><td className="pl-6">₹{invoice.invoice_total_igst.toFixed(2)}</td></tr>
                            <tr className="font-semibold text-lg border-t"><td>Total:</td><td className="pl-6">₹{invoice.invoice_total.toFixed(2)}</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-6">
                    <p className="text-sm font-medium">Notes:</p>
                    <p className="text-gray-700 text-sm">{invoice.invoice_notes}</p>
                </div>
            </div>

            <div className="btns flex justify-center gap-0 md:gap-10 mt-6">
                <button
                    onClick={() => navigate("/invoices")}
                    className='border-3 border-blue-600 h-12 px-2 md:px-6 rounded-2xl hover:bg-blue-500 hover:text-white cursor-pointer'>
                    Back
                </button>

                <button
                    onClick={() => handleDeleteInvoice(1, 1)}
                    className='border-3 h-12 px-4 rounded-2xl bg-red-800 hover:bg-red-700 text-white cursor-pointer  flex items-center gap-2'>
                    <img src={deleteI} className='h-auto w-5' alt="icon" />
                    Delete</button>

                <button className='btn-1 px-6 h-12  flex items-center gap-2'>
                    <img src={editI} className='h-auto w-5' alt="icon" />
                    Edit
                </button>
            </div>
        </div>
    );
};

export default InvoiceDetail;
