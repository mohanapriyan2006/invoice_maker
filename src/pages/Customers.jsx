import React, { useContext, useEffect, useState } from 'react';
import DataContext from '../context/DataContest';
import loadingI from '../assets/loading.png';

const Customers = () => {
    const {
        yourCustomers,
        navigate,
        isLoading,
        fetchCustomers,
        yourCompanies,
        fetchCompany
    } = useContext(DataContext);

    const [selectedCompany, setSelectedCompany] = useState(yourCompanies[0]?.company_id);

    useEffect(() => {
        fetchCompany()
    }, [])

    useEffect(() => {
        if (yourCompanies.length > 0 && !selectedCompany) {
            setSelectedCompany(yourCompanies[0].company_id);
        }
    }, [yourCompanies]);

    useEffect(() => {
        if (selectedCompany) {
            fetchCustomers(selectedCompany);
        }
    }, [selectedCompany]);

    const handleCompanyChange = (e) => {
        setSelectedCompany(e.target.value);
    };

    if (isLoading.customer) {
        return (
            <div className="model-loading-div">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-200">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            <img className='w-16 h-16 animate-spin' src={loadingI} alt="loading" />
                                         </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-blue-800 mb-2">Loading Customers</h3>
                            <div className="flex items-center justify-center space-x-1">
                                <span className="text-blue-600">Please wait</span>
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6'>
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="mb-8">
                    <div className="model-header-div">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center sm:space-x-4">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 sm:mr-0 mr-2 rounded-xl shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className='sm:text-3xl text-2xl  font-bold text-blue-900'>Your Customers</h1>
                                    <p className="text-blue-600 mt-1">Manage and view all your customers</p>
                                </div>
                            </div>
                            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                                {yourCustomers.length}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Company Selector */}
                <div className="mb-8">
                    <div className="model-header-div">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="model-details-subheader">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <label className="text-lg font-semibold text-blue-900">Select Company:</label>
                        </div>
                        <div className="relative">
                            <select
                                value={selectedCompany}
                                onChange={handleCompanyChange}
                                className="w-full border-2 border-blue-200 focus:border-blue-500 bg-white p-4 rounded-xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 appearance-none cursor-pointer shadow-sm hover:shadow-md"
                            >
                                {yourCompanies.map((company) => (
                                    <option key={company.company_id} value={company.company_id}>
                                        {company.company_name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customers Grid */}
                <div className="mb-8">
                    {yourCustomers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="model-not-found">
                                <div className="model-not-found-icon">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Customers Found</h3>
                                <p className="text-gray-600 mb-8">You haven't added any products yet. Start by creating your first customer!</p>
                                <button
                                    className='model-not-found-btn'
                                    onClick={() => navigate('/home')}
                                >
                                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Go Back to Dashboard
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {yourCustomers.map((customer, index) => (
                                <div key={index} className="model-overview">

                                    {/* Product Header */}
                                    <div className="model-overview-header">
                                        <div className="flex items-center justify-between">
                                            <div className="bg-white/20 p-2 rounded-lg">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                                                {customer.customer_name}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Content */}
                                    <div className="p-6">
                                        <div className="mb-4">
                                            <h4 className='model-overview-content'>
                                                {customer.customer_name}
                                            </h4>

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center text-gray-600">
                                                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    <span className="text-sm font-medium">Customer Email: {customer.customer_email}</span>
                                                </div>
                                            </div>

                                            <div className="model-details-content-div ">
                                                <div className="flex items-start text-gray-700">
                                                    <svg className="w-4 h-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-sm leading-relaxed">Customer to: {selectedCompany.company_name}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="pt-4 border-t border-gray-100">
                                            <button
                                                onClick={() => navigate(`/customersDetail/${customer.customer_id}`)}
                                                className='model-overview-btn'
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                <span>View Details</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Hover Effect Gradient */}
                                    <div className="model-overview-hover"></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Floating Add Button */}
                <div className="fixed bottom-8 right-8 z-50">
                    <button
                        onClick={() => navigate('/customerForm')}
                        className='model-overview-floating-add group '
                    >
                        <svg className="model-overview-floating-add-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>

                {/* Desktop Add Button */}
                <div className="hidden md:block">
                    <div className="model-header-div">
                        <button
                            onClick={() => navigate('/customerForm')}
                            className='model-overview-add'
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="text-lg">Add New Customer</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customers;