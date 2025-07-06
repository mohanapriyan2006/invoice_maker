import React, { useContext } from 'react';
import DataContext from '../context/DataContest';

const Invoices = () => {
    const { navigate , yourInvoices } = useContext(DataContext);


    return (
        <div className='invoices-div ml-10 p-1 relative'>
            <h3 className='md:text-2xl text-[20px] font-semibold text-blue-900 text-center underline'>Your Invoices</h3>

            <div className="invoices p-2 flex flex-col gap-4 mt-5">
                {yourInvoices.length === 0 ? (
                    <div>
                        <h5 className='text-2xl font-semibold text-red-700'>Invoices Not Found!</h5>
                        <button className='btn-1 px-4' onClick={() => navigate('/home')}>Go Back</button>
                    </div>
                ) : (
                    yourInvoices.map((invoice, index) => (
                        <div key={index} className="shadow hover:shadow-blue-600 max-w-200 min-w-60 p-2 px-5 flex md:flex-row flex-col justify-between gap-1 border border-gray-200 rounded">
                            <div>
                                <h4 className='font-medium text-[20px]'>#{invoice.invoice_number}</h4>
                                <p className='text-[14px]'>From: {invoice.invoice_by.company_name}</p>
                                <p className='text-[14px]'>To: {invoice.client.customer_name}</p>
                                <p className='text-[12px]'>Date: {new Date(invoice.invoice_date).toLocaleDateString()}</p>
                                <p className='text-[12px] font-semibold'>Total: ₹{invoice.invoice_total}</p>
                            </div>
                            <div className='flex items-center justify-center'>
                                <button
                                    onClick={() => navigate(`/invoiceDetail/${invoice.invoice_id}`)}
                                    className='btn-1 h-10 px-5'
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button
                onClick={() => navigate("/invoiceForm")}
                className='btn-1 text-3xl font-semibold p-2 h-10 hover:scale-[108%] fixed bottom-4 right-4 flex justify-center items-center'>
                +<span className='text-[18px] ml-1 md:block hidden'> Add Invoice</span>
            </button>
        </div>
    );
};

export default Invoices;
