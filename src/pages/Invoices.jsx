import React, { useContext, useEffect, useState } from 'react';
import DataContext from '../context/DataContest';
import loadingI from '../assets/loading.png';


const getLocalUpdates = () => {
    return JSON.parse(localStorage.getItem("InvoiceStatusAndNotes")) || {};
};

const updateLocalInvoiceField = (invoiceId, field, value, setLocalUpdates) => {
    const data = getLocalUpdates();
    if (!data[invoiceId]) data[invoiceId] = {};
    data[invoiceId][field] = value;
    localStorage.setItem("InvoiceStatusAndNotes", JSON.stringify(data));
    setLocalUpdates({ ...data });
};

const Invoices = () => {
    const {
        yourInvoices,
        navigate,
        isLoading,
        fetchInvoices,
        yourCompanies,
        fetchCompany
    } = useContext(DataContext);

    const [selectedCompanyId, setSelectedCompanyId] = useState(yourCompanies[0]?.company_id);

    useEffect(() => {
        fetchCompany()
    }, [])

    useEffect(() => {
        if (yourCompanies.length > 0 && !selectedCompanyId) {
            setSelectedCompanyId(yourCompanies[0].company_id);
        }
    }, [yourCompanies]);

    useEffect(() => {
        if (selectedCompanyId) {
            fetchInvoices(selectedCompanyId);
        }
    }, [selectedCompanyId]);

    const handleCompanyChange = (e) => {
        setSelectedCompanyId(e.target.value);
    };

    const [localUpdates, setLocalUpdates] = useState(getLocalUpdates());
    const [editingNotes, setEditingNotes] = useState({});
    const [editingStatus, setEditingStatus] = useState({});
    const [tempNotes, setTempNotes] = useState({});
    const [tempStatus, setTempStatus] = useState({});

    const statusOptions = [
        { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'incomplete', label: 'Incomplete', color: 'bg-red-100 text-red-800' },
        { value: 'partially', label: 'Partially Paid', color: 'bg-blue-100 text-blue-800' },
        { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' }
    ];

    const handleNotesEdit = (invoiceId, currentNotes) => {
        setEditingNotes(prev => ({ ...prev, [invoiceId]: true }));
        setTempNotes(prev => ({ ...prev, [invoiceId]: currentNotes }));
    };

    const handleNotesSave = (invoiceId) => {
        updateLocalInvoiceField(invoiceId, 'invoice_notes', tempNotes[invoiceId], setLocalUpdates);
        setEditingNotes(prev => ({ ...prev, [invoiceId]: false }));
    };

    const handleNotesCancel = (invoiceId) => {
        setEditingNotes(prev => ({ ...prev, [invoiceId]: false }));
        setTempNotes(prev => ({ ...prev, [invoiceId]: '' }));
    };

    const handleStatusEdit = (invoiceId, currentStatus) => {
        setEditingStatus(prev => ({ ...prev, [invoiceId]: true }));
        setTempStatus(prev => ({ ...prev, [invoiceId]: currentStatus || 'pending' }));
    };

    const handleStatusSave = (invoiceId) => {
        updateLocalInvoiceField(invoiceId, 'invoice_status', tempStatus[invoiceId], setLocalUpdates);
        setEditingStatus(prev => ({ ...prev, [invoiceId]: false }));
    };

    const handleStatusCancel = (invoiceId) => {
        setEditingStatus(prev => ({ ...prev, [invoiceId]: false }));
        setTempStatus(prev => ({ ...prev, [invoiceId]: '' }));
    };

    const getStatusStyle = (status) => {
        const statusObj = statusOptions.find(opt => opt.value === status);
        return statusObj ? statusObj.color : 'bg-gray-100 text-gray-800';
    };


    if (isLoading.invoice) {
        return (
            <div className="min-h-screen overflow-x-hidden flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-200">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            <img className='w-16 h-16 animate-spin' src={loadingI} alt="loading" />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-20 animate-pulse"></div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-blue-800 mb-2">Loading invoices</h3>
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
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center sm:space-x-4 ">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 sm:mr-0 mr-2 rounded-xl shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className='sm:text-3xl text-2xl font-bold text-blue-900'>Your Invoices</h1>
                                    <p className="text-blue-600 mt-1">Manage and view all your Invoices</p>
                                </div>
                            </div>
                            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                                {yourInvoices.length}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Company Selector */}
                <div className="mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <label className="text-lg font-semibold text-blue-900">Select Company:</label>
                        </div>
                        <div className="relative">
                            <select
                                value={selectedCompanyId}
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

                {/* invoices Grid */}
                <div className="mb-8">
                    {yourInvoices.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="bg-white rounded-2xl shadow-2xl p-12 border border-gray-200 max-w-md w-full text-center">
                                <div className="w-24 h-24 bg-gradient-to-r  from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">No invoices Found</h3>
                                <p className="text-gray-600 mb-8">You haven't added any products yet. Start by creating your first invoice!</p>
                                <button
                                    className='bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-4">
                            {yourInvoices.map((invoice, index) => {
                                const invoiceId = invoice.invoice_id;
                                const localStatus = localUpdates[invoiceId]?.invoice_status || invoice.invoice_status;
                                const localNotes = localUpdates[invoiceId]?.invoice_notes || invoice.invoice_notes;

                                return (
                                    <div key={index} className="group  bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-blue-300 transition-all duration-300 overflow-hidden transform  ">
                                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="bg-white/20 p-2 rounded-lg">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                                                    {invoice.invoice_number}
                                                </div>
                                            </div>
                                            {/*   Status Section */}
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Status:</span>
                                                {editingStatus[invoiceId] ? (
                                                    <div className="flex items-center space-x-2">
                                                        <select
                                                            value={tempStatus[invoiceId] || 'pending'}
                                                            onChange={(e) => setTempStatus(prev => ({ ...prev, [invoiceId]: e.target.value }))}
                                                            className="text-sm px-3 py-1.5 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-200 shadow-sm"
                                                        >
                                                            {statusOptions.map(option => (
                                                                <option key={option.value} value={option.value}>{option.label}</option>
                                                            ))}
                                                        </select>

                                                        {/* Save Button */}
                                                        <button
                                                            onClick={() => handleStatusSave(invoiceId)}
                                                            className="group relative p-1.5 rounded-full bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 hover:border-green-400/50 transition-all duration-200 hover:scale-110"
                                                            title="Save changes"
                                                        >
                                                            <svg className="w-3.5 h-3.5 text-green-300 group-hover:text-green-200 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </button>

                                                        {/* Cancel Button */}
                                                        <button
                                                            onClick={() => handleStatusCancel(invoiceId)}
                                                            className="group relative p-1.5 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 hover:border-red-400/50 transition-all duration-200 hover:scale-110"
                                                            title="Cancel changes"
                                                        >
                                                            <svg className="w-3.5 h-3.5 text-red-300 group-hover:text-red-200 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium shadow-sm ${getStatusStyle(localStatus)}`}>
                                                            {statusOptions.find(opt => opt.value === localStatus)?.label || 'Pending'}
                                                        </span>

                                                        {/* Edit Button */}
                                                        <button
                                                            onClick={() => handleStatusEdit(invoiceId, localStatus)}
                                                            className="group relative p-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-200 hover:scale-110 hover:rotate-12"
                                                            title="Edit status"
                                                        >
                                                            <svg className="w-3.5 h-3.5 text-white/70 group-hover:text-white transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>

                                                            {/* Hover tooltip */}
                                                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                                                                Edit status
                                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800"></div>
                                                            </div>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-4">
                                                <h4 className='text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-200'>
                                                    Date: {new Date(invoice.invoice_date).toLocaleDateString()}
                                                </h4>
                                                <div className="space-y-2 mb-4">
                                                    <div className="flex items-center text-gray-600">
                                                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                        <span className="text-sm font-medium">Invoice company: {invoice.invoice_by.company_name}</span>
                                                    </div>
                                                    <span className="text-sm font-medium">Invoice Total: {invoice.invoice_total}</span><br/>
                                                    <span className="text-sm font-medium">Invoice Due: {new Date(invoice.invoice_due_date).toLocaleDateString()}</span>
                                                </div>
                                                {/*   Notes Section */}
                                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="flex items-center">
                                                            <svg className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            <span className="text-sm font-medium text-gray-700">Notes:</span>
                                                        </div>
                                                        {!editingNotes[invoiceId] && (
                                                            <button
                                                                onClick={() => handleNotesEdit(invoiceId, localNotes)}
                                                                className="group relative p-1.5 rounded-full bg-blue-100 hover:bg-blue-200 border border-blue-200 hover:border-blue-300 transition-all duration-200 hover:scale-110 hover:rotate-12"
                                                                title="Edit notes"
                                                            >
                                                                <svg className="w-3.5 h-3.5 text-blue-500 group-hover:text-blue-600 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>

                                                                {/* Hover tooltip */}
                                                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                                                    Edit notes
                                                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800"></div>
                                                                </div>
                                                            </button>
                                                        )}
                                                    </div>

                                                    {editingNotes[invoiceId] ? (
                                                        <div className="space-y-3">
                                                            <textarea
                                                                value={tempNotes[invoiceId] || ''}
                                                                onChange={(e) => setTempNotes(prev => ({ ...prev, [invoiceId]: e.target.value }))}
                                                                className="w-full p-3 border border-blue-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white shadow-sm transition-all duration-200"
                                                                rows="3"
                                                                placeholder="Add notes..."
                                                            />
                                                            <div className="flex items-center space-x-3">
                                                                {/* Save Button */}
                                                                <button
                                                                    onClick={() => handleNotesSave(invoiceId)}
                                                                    className="group relative flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                                                >
                                                                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                    <span>Save</span>
                                                                </button>

                                                                {/* Cancel Button */}
                                                                <button
                                                                    onClick={() => handleNotesCancel(invoiceId)}
                                                                    className="group relative flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                                                >
                                                                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                    </svg>
                                                                    <span>Cancel</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="relative group">
                                                            <p className="text-sm leading-relaxed text-gray-700 min-h-[1.5rem]">
                                                                {localNotes || (
                                                                    <span className="text-gray-500 italic">No notes added</span>
                                                                )}
                                                            </p>

                                                            {/* Empty state hint */}
                                                            {!localNotes && (
                                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-50 transition-opacity duration-200 pointer-events-none">
                                                                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                                        </svg>
                                                                        <span>Click edit to add notes</span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="pt-4 border-t border-gray-100">
                                                <button
                                                    onClick={() => navigate(`/invoiceDetail/${invoiceId}`)}
                                                    className='w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2'
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    <span>View Details</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Floating Add Button */}
                <div className="fixed bottom-8 right-8 z-50">
                    <button
                        onClick={() => navigate('/invoiceForm')}
                        className='bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 group'
                    >
                        <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>

                {/* Desktop Add Button */}
                <div className="hidden md:block">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
                        <button
                            onClick={() => navigate('/invoiceForm')}
                            className='w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-3'
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="text-lg">Add New Invoice</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoices;