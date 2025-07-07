import React, { useContext, useEffect, useState } from 'react';
import DataContext from '../context/DataContest';
import loadingI from '../assets/loading.png';

const Customers = () => {
    const {
        yourCustomers,
        navigate,
        isLoading,
        fetchCustomers,
        yourCompanies
    } = useContext(DataContext);

    const [selectedCompanyId, setSelectedCompanyId] = useState('');

    useEffect(() => {
        if (yourCompanies.length > 0 && !selectedCompanyId) {
            setSelectedCompanyId(yourCompanies[0].company_id);
        }
    }, [yourCompanies]);

    useEffect(() => {
        if (selectedCompanyId) {
            fetchCustomers(selectedCompanyId);
        }
    }, [selectedCompanyId]);

    const handleCompanyChange = (e) => {
        setSelectedCompanyId(e.target.value);
    };

    if (isLoading.customer) {
        return (
            <div className="loading-div">
                <img className="load-icon" src={loadingI} alt="icon" />
                Loading customers<span className="load-span">...</span>
            </div>
        );
    }

    return (
        <div className="Customers-div model-overview-div">
            <h3 className="heading">
                Your Customers
            </h3>

            {/* Company Dropdown */}
            <div className="mb-6 max-w-md mx-auto">
                <label className="font-medium">Select Company:</label>
                <select
                    value={selectedCompanyId}
                    onChange={handleCompanyChange}
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                >
                    {yourCompanies.map((company) => (
                        <option key={company.company_id} value={company.company_id}>
                            {company.company_name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="Customers model-space">
                {yourCustomers.length === 0 ? (
                    <div>
                        <h5 className="not-found">Customers Not Found!</h5>
                        <button className="btn-1 px-4" onClick={() => navigate('/home')}>
                            Go Back
                        </button>
                    </div>
                ) : (
                    yourCustomers.map((customer, index) => (
                        <div
                            key={index}
                            className="model"
                        >
                            <div>
                                <h4 className="font-medium text-[20px]">{customer.customer_name}</h4>
                                <p className="text-[14px]">Email: {customer.customer_email}</p>
                                <p className="text-[14px]">Phone: {customer.customer_phone}</p>
                                <p className="font-light text-[12px]">
                                    {customer.customer_address_line1}, {customer.customer_address_line2}, {customer.customer_city}, {customer.customer_state}, {customer.customer_postal_code}, {customer.customer_country}
                                </p>
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    onClick={() => navigate(`/customersDetail/${customer.customer_id}`)}
                                    className="btn-1 h-10 px-5"
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button
                onClick={() => navigate('/customerForm')}
                className="btn-1 add-btn"
            >
                +<span className="text-[18px] ml-1 md:block hidden"> Add Customer</span>
            </button>
        </div>
    );
};

export default Customers;
