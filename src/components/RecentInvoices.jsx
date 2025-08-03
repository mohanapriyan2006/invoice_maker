import React from 'react'
import DataContext from '../context/DataContest';

const RecentInvoices = () => {

    const { yourInvoices, navigate } = React.useContext(DataContext);

    return (
        <>
            {yourInvoices.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 shadow-lg border border-yellow-200 max-w-md w-full text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-yellow-800 mb-2">No Invoices Found</h3>
                        <p className="text-yellow-600">You haven't created any invoices yet. Start by creating your first invoice!</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
                    {yourInvoices?.map((invoice, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/invoiceDetail/${invoice.invoice_id}`)}
                            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-blue-300 cursor-pointer md:w-auto w-[280px] overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out"
                        >
                            {/* Status Badge */}
                            <div className="absolute top-3 left-3 z-10">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                                    #{invoice.invoice_number}
                                </div>
                            </div>

                            {/* Amount Badge */}
                            <div className="absolute top-3 right-3 z-10">
                                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                                    ₹{invoice.invoice_total.toFixed(2)}
                                </div>
                            </div>

                            {/* Invoice Preview */}
                            <div className="relative overflow-hidden">
                                <div className="scale-[0.35] origin-top-left w-[800px] h-[200px] pointer-events-none mt-8 p-6">
                                    <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-inner">
                                        <div className="text-center text-2xl font-bold text-blue-800 mb-6 border-b-2 border-blue-200 pb-2">
                                            Tax Invoice
                                        </div>

                                        <div className="grid grid-cols-2 gap-6 text-sm mb-6">
                                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                                <h3 className="font-semibold text-lg text-blue-700 mb-2 flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    From:
                                                </h3>
                                                <p className="font-medium text-gray-800">{invoice.invoice_by.company_name}</p>
                                                <p className="text-gray-600">{invoice.invoice_by.company_address}</p>
                                                <p className="text-gray-600">GSTIN: {invoice.invoice_by.company_gstin}</p>
                                                <p className="text-gray-600">Email: {invoice.invoice_by.company_email}</p>
                                            </div>
                                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                                <h3 className="font-semibold text-lg text-blue-700 mb-2 flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    To:
                                                </h3>
                                                <p className="font-medium text-gray-800">{invoice.client.customer_name}</p>
                                                <p className="text-gray-600">{invoice.client.customer_address_line1}, {invoice.client.customer_address_line2}</p>
                                                <p className="text-gray-600">{invoice.client.customer_city}, {invoice.client.customer_state}</p>
                                                <p className="text-gray-600">{invoice.client.customer_country} - {invoice.client.customer_postal_code}</p>
                                                <p className="text-gray-600">GSTIN: {invoice.client.customer_gstin}</p>
                                                <p className="text-gray-600">Email: {invoice.client.customer_email}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm mb-6 bg-blue-50 p-4 rounded-lg">
                                            <div className="flex items-center">
                                                <span className="font-semibold text-blue-700">Invoice No:</span>
                                                <span className="ml-2 text-gray-800">{invoice.invoice_number}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="font-semibold text-blue-700">Date:</span>
                                                <span className="ml-2 text-gray-800">{new Date(invoice.invoice_date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="font-semibold text-blue-700">Due:</span>
                                                <span className="ml-2 text-gray-800">{new Date(invoice.invoice_due_date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="font-semibold text-blue-700">Total:</span>
                                                <span className="ml-2 text-green-600 font-bold">₹{invoice.invoice_total.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <div className="text-sm text-gray-600 mt-4 bg-gray-50 p-3 rounded-lg">
                                            <p><strong className="text-gray-800">Notes:</strong> {invoice.invoice_notes?.slice(0, 50)}...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <div className="flex items-center justify-between text-white">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span className="text-sm font-medium">View Details</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M3 7h18M5 7v12a2 2 0 002 2h10a2 2 0 002-2V7" />
                                        </svg>
                                        <span className="text-xs">
                                            {new Date(invoice.invoice_date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default RecentInvoices;