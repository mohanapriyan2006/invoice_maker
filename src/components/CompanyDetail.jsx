import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import DataContext from '../context/DataContest';
import { api } from '../API/api';
import deleteI from '../assets/delete1.png'
import editI from '../assets/edit.png'

const CompanyDetail = () => {

    const { id } = useParams();

    const { navigate, yourCompanies, deleteAlert } = useContext(DataContext);

    const company = yourCompanies.find(val => val.company_id === id);
    // const company = yourCompanies[0];

    // delete
    const handleDeleteCompany = async (id) => {
        let isOk = await deleteAlert()
        if (isOk) {
            try {
                await api.delete(`companies/${id}`);
                navigate('/companies')
            } catch (e) {
                if (e.response && e.response.data) {
                    console.log("Error in Delete Company : ", e.response.data)
                } else {
                    alert("Server Error in Delete Company : ", e);
                }
            }
        }
    }

    if (!company) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6'>
                <div className="model-not-found">
                    <div className="model-not-found-icon">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Company Not Found!</h3>
                    <p className="text-gray-600 mb-8">The company you're looking for doesn't exist or has been removed.</p>
                    <button
                        className='model-not-found-btn'
                        onClick={() => navigate('/companies')}
                    >
                        <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Go Back to Companies
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6'>
            <div className="max-w-4xl mx-auto">

                {/* Header Section */}
                <div className="mb-8">
                    <div className="model-header-div">
                        <div className="flex items-center space-x-4">
                            <div className="model-header-icon">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <h1 className='text-3xl font-bold text-blue-900'>Company Details</h1>
                                <p className="text-blue-600 mt-1">View and manage company information</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Company Details Card */}
                <div className="model-details-card">

                    {/* Company Header */}
                    <div className="model-details-header">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                            </div>
                            <div className="bg-white/20 px-4 py-2 rounded-full">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Company Information */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Basic Information */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="model-details-subheader">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="model-details-content-div ">
                                        <div className="flex items-start space-x-3">
                                            <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <div>
                                                <p className="font-medium text-gray-700">Company Name</p>
                                                <p className="text-lg text-gray-900">{company.company_name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="model-details-content-div ">
                                        <div className="flex items-start space-x-3">
                                            <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <div>
                                                <p className="font-medium text-gray-700">Email</p>
                                                <p className="text-lg text-gray-900">{company.company_email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="model-details-content-div ">
                                            <div className="flex items-start space-x-3">
                                                <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <div>
                                                    <p className="font-medium text-gray-700">State</p>
                                                    <p className="text-lg text-gray-900">{company.company_state}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="model-details-content-div ">
                                            <div className="flex items-start space-x-3">
                                                <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <div>
                                                    <p className="font-medium text-gray-700">City</p>
                                                    <p className="text-lg text-gray-900">{company.company_city}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="model-details-content-div ">
                                        <div className="flex items-start space-x-3">
                                            <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <div>
                                                <p className="font-medium text-gray-700">Address</p>
                                                <p className="text-lg text-gray-900">{company.company_address}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="model-details-content-div ">
                                            <div className="flex items-start space-x-3">
                                                <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <div>
                                                    <p className="font-medium text-gray-700">GSTIN</p>
                                                    <p className="text-lg text-gray-900">{company.company_gstin}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="model-details-content-div ">
                                            <div className="flex items-start space-x-3">
                                                <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <div>
                                                    <p className="font-medium text-gray-700">MSME</p>
                                                    <p className="text-lg text-gray-900">{company.company_msme}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Banking Information */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="model-details-subheader">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Banking Information</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="model-details-content-div ">
                                        <div className="flex items-start space-x-3">
                                            <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                            <div>
                                                <p className="font-medium text-gray-700">Bank Account No</p>
                                                <p className="text-lg text-gray-900 font-mono">{company.company_bank_account_no}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="model-details-content-div ">
                                        <div className="flex items-start space-x-3">
                                            <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <div>
                                                <p className="font-medium text-gray-700">Bank Name</p>
                                                <p className="text-lg text-gray-900">{company.company_bank_name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="model-details-content-div ">
                                        <div className="flex items-start space-x-3">
                                            <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <div>
                                                <p className="font-medium text-gray-700">Account Holder</p>
                                                <p className="text-lg text-gray-900">{company.company_account_holder}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="model-details-content-div ">
                                            <div className="flex items-start space-x-3">
                                                <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                <div>
                                                    <p className="font-medium text-gray-700">Branch</p>
                                                    <p className="text-lg text-gray-900">{company.company_branch}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="model-details-content-div ">
                                            <div className="flex items-start space-x-3">
                                                <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                                </svg>
                                                <div>
                                                    <p className="font-medium text-gray-700">IFSC Code</p>
                                                    <p className="text-lg text-gray-900 font-mono">{company.company_ifsc_code}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="model-details-actions-div ">
                        <div className="model-details-actions-subdiv ">
                            <button
                                onClick={() => navigate("/companies")}
                                className='model-details-actions-back '
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Back</span>
                            </button>

                            <button
                                onClick={() => handleDeleteCompany(company.company_id)}
                                className='model-details-actions-delete '
                            >
                                <img src={deleteI} className='w-5 h-5' alt="delete" />
                                <span>Delete</span>
                            </button>

                            <button
                                onClick={() => navigate(`/companyForm/${company.company_id}`)}
                                className='model-details-actions-edit '
                            >
                                <img src={editI} className='w-5 h-5' alt="edit" />
                                <span>Edit</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyDetail