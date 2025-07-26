import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import DataContext from '../context/DataContest';
import editI from '../assets/edit.png'

const ProductDetail = () => {
    const { id } = useParams();
    const { yourProducts, navigate, yourCompanies } = useContext(DataContext);

    const product = yourProducts.find(p => p.product_id === id);
    const company_name = yourCompanies.find(val => val.company_id == product?.company_id)?.company_name;

    if (!product) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6'>
                <div className="model-not-found">
                    <div className="model-not-found-icon">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found!</h3>
                    <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
                    <button
                        className='model-not-found-btn'
                        onClick={() => navigate('/products')}
                    >
                        <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Go Back to Products
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div>
                                <h1 className='text-3xl font-bold text-blue-900'>Product Details</h1>
                                <p className="text-blue-600 mt-1">View and manage product information</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Card */}
                <div className="model-details-card">

                    {/* Product Header */}
                    <div className="model-details-header">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">{product.product_name}</h2>
                                    <p className="text-blue-100 mt-1">Product Information</p>
                                </div>
                            </div>
                            <div className="bg-white/20 px-4 py-2 rounded-full">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Product Information */}
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
                                                <p className="text-lg text-gray-900">{company_name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="model-details-content-div ">
                                        <div className="flex items-start space-x-3">
                                            <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <div>
                                                <p className="font-medium text-gray-700">Description</p>
                                                <p className="text-lg text-gray-900">{product.product_description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="model-details-content-div ">
                                            <div className="flex items-start space-x-3">
                                                <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                                <div>
                                                    <p className="font-medium text-gray-700">Unit of Measure</p>
                                                    <p className="text-lg text-gray-900">{product.product_unit_of_measure}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="model-details-content-div ">
                                            <div className="flex items-start space-x-3">
                                                <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                                </svg>
                                                <div>
                                                    <p className="font-medium text-gray-700">HSN/SAC Code</p>
                                                    <p className="text-lg text-gray-900 font-mono">{product.product_hsn_sac_code}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="model-details-content-div ">
                                        <div className="flex items-start space-x-3">
                                            <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <p className="font-medium text-gray-700">Unit Price</p>
                                                <p className="text-2xl font-bold text-blue-600">₹{product.product_unit_price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tax Information */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="model-details-subheader">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Tax Information</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="model-details-content-div ">
                                        <div className="flex items-start space-x-3">
                                            <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            <div>
                                                <p className="font-medium text-gray-700">CGST Rate</p>
                                                <p className="text-lg text-gray-900 font-semibold">{product.product_default_cgst_rate}%</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="model-details-content-div ">
                                        <div className="flex items-start space-x-3">
                                            <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            <div>
                                                <p className="font-medium text-gray-700">SGST Rate</p>
                                                <p className="text-lg text-gray-900 font-semibold">{product.product_default_sgst_rate}%</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="model-details-content-div ">
                                        <div className="flex items-start space-x-3">
                                            <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            <div>
                                                <p className="font-medium text-gray-700">IGST Rate</p>
                                                <p className="text-lg text-gray-900 font-semibold">{product.product_default_igst_rate}%</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="model-details-content-div ">
                                        <div className="flex items-start space-x-3">
                                            <svg className="model-details-content-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <p className="font-medium text-gray-700">Created At</p>
                                                <p className="text-lg text-gray-900">{new Date(product.created_at).toLocaleString()}</p>
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
                                onClick={() => navigate("/products")}
                                className='model-details-actions-back '
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Back</span>
                            </button>

                            <button
                                onClick={() => navigate(`productForm/${product.product_id}`)}
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
    );
};

export default ProductDetail;