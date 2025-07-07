import React, { useContext, useEffect, useState } from 'react';
import DataContext from '../context/DataContest';
import loadingI from '../assets/loading.png';

const Invoices = () => {
    const {
        navigate,
        yourInvoices,
        isLoading,
        fetchInvoices,
        yourCompanies,
        fetchCompany
    } = useContext(DataContext);

    const [selectedCompanyId, setSelectedCompanyId] = useState('');

    // Fetch companies if not loaded
    useEffect(() => {
        if (yourCompanies.length === 0) {
            fetchCompany();
        }
    }, []);

    // Set default company and fetch invoices
    useEffect(() => {
        if (yourCompanies.length > 0 && !selectedCompanyId) {
            const defaultId = yourCompanies[0].company_id;
            setSelectedCompanyId(defaultId);
            fetchInvoices(defaultId);
        }
    }, [yourCompanies]);

    // Fetch invoices when company changes
    useEffect(() => {
        if (selectedCompanyId) {
            fetchInvoices(selectedCompanyId);
        }
    }, [selectedCompanyId]);

    if (isLoading.invoice) {
        return (
            <div className="loading-div">
                <img className='load-icon' src={loadingI} alt="icon" />
                Loading invoices<span className='load-span'>...</span>
            </div>
        );
    }

    return (
        <div className='invoices-div model-overview-div'>
            <h3 className='heading'>Your Invoices</h3>


            {/* Dropdown for company selection */}
            <div className="model-choose">
                <label className="font-semibold">Select Company:</label>
                <select
                    value={selectedCompanyId}
                    onChange={(e) => setSelectedCompanyId(e.target.value)}
                    className="select"
                >
                    {yourCompanies.map((company) => (
                        <option
                            key={company.company_id} value={company.company_id}>
                            {company.company_name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="invoices model-space">
                {yourInvoices.length === 0 ? (
                    <div>
                        <h5 className='not-found'>Invoices Not Found!</h5>
                        <button className='btn-1 px-4' onClick={() => navigate('/home')}>Go Back</button>
                    </div>
                ) : (
                    yourInvoices.map((invoice, index) => (
                        <div key={index} className="model">
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
                className='btn-1 add-btn'>
                +<span className='text-[18px] ml-1 md:block hidden'> Add Invoice</span>
            </button>
        </div>
    );
};

export default Invoices;
