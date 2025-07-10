import React from 'react'
import DataContext from '../context/DataContest';

const RecentInvoices = () => {

    const { yourInvoices, navigate } = React.useContext(DataContext);

    return (
        <>
            {yourInvoices.length === 0 ? (
                <div className="text-center text-lg text-yellow-600">No invoices found!</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:ml-0 ml-10">
                    {yourInvoices.map((invoice, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/invoiceDetail/${invoice.invoice_id}`)}
                            className="border-2 border-gray-300 rounded-lg shadow-md hover:shadow-xl hover:border-blue-600 border-dashed cursor-pointer bg-white md:w-auto w-[220px] overflow-hidden relative"
                        >
                            <div className="scale-[0.40] origin-top-left w-[700px] h-[180px] pointer-events-none mt-5 p-5">
                                <div className="p-8">
                                    <div className="text-center text-2xl font-bold text-blue-800 mb-6">
                                        Tax Invoice
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
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

                                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                                        <div><strong>Invoice No:</strong> {invoice.invoice_number}</div>
                                        <div><strong>Date:</strong> {new Date(invoice.invoice_date).toLocaleDateString()}</div>
                                        <div><strong>Due:</strong> {new Date(invoice.invoice_due_date).toLocaleDateString()}</div>
                                        <div><strong>Total:</strong> ₹{invoice.invoice_total.toFixed(2)}</div>
                                    </div>

                                    <div className="text-sm text-gray-600 mt-4">
                                        <p><strong>Notes:</strong> {invoice.invoice_notes?.slice(0, 50)}...</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-2 left-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                #{invoice.invoice_number}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default RecentInvoices