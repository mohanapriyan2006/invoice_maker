import React, { useContext, useEffect, useState } from 'react';
import { Formik, FieldArray, Form } from 'formik';
import * as Yup from 'yup';
import {
    Building2,
    Users,
    FileText,
    Calendar,
    MapPin,
    Hash,
    StickyNote,
    Package,
    ShoppingCart,
    Plus,
    Trash2,
    ChevronDown,
    Receipt
} from 'lucide-react';
import { api } from '../API/api';
import DataContext from '../context/DataContest';
import { useParams } from 'react-router-dom';

const InvoiceForm = ({ editMode = false }) => {
    const { id } = useParams();
    const { navigate, Toast, fetchInvoices, yourInvoices, yourCompanies, yourCustomers, yourProducts, fetchCustomers, fetchProducts } = useContext(DataContext);
    const [editInvoiceData, setEditInvoiceData] = useState(null);

    useEffect(() => {
        // fetchCompany();
        if (editMode) {
            const existing = yourInvoices.find(inv => inv.invoice_id === id);
            setEditInvoiceData(existing);
        }
    }, [editMode, id, yourInvoices]);

    const initialValues = {
        owner_company: '',
        customer_company: '',
        invoice_number: '',
        invoice_date: '',
        invoice_due_date: '',
        invoice_terms: '',
        invoice_place_of_supply: '',
        invoice_notes: '',
        invoice_items: [
            {
                product_id: '',
                invoice_item_quantity: 1,
            },
        ],
        invoice_info: ''
    };

    const validationSchema = Yup.object({
        owner_company: Yup.string().required('Owner company is required'),
        customer_company: Yup.string().required('Customer company is required'),
        invoice_number: Yup.string().required('Invoice number is required'),
        invoice_date: Yup.date().required('Invoice date is required'),
        invoice_due_date: Yup.date().required('Due date is required'),
        invoice_terms: Yup.string().required('Terms are required'),
        invoice_place_of_supply: Yup.string().required('Place of supply is required'),
        invoice_notes: Yup.string().required('Notes for invoice is required'),
        invoice_items: Yup.array().of(
            Yup.object({
                product_id: Yup.string().required('Product is required'),
                invoice_item_quantity: Yup.number().min(1).required('Quantity is required'),
            })
        ),
    });

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            if (editMode && editInvoiceData) {
                await api.put(`/invoices/${id}?company_id=${values.owner_company}`, values, {
                });
                Toast.fire({
                    icon: "success",
                    title: "Successfully invoice updated"
                });
            } else {
                await api.post(`/invoices?company_id=${values.owner_company}`, values, {
                });
                Toast.fire({
                    icon: "success",
                    title: "Successfully invoice created"
                });
            }

            fetchInvoices(values.owner_company);
            navigate('/invoices');
        } catch (error) {
            if (error.response?.data) {
                console.log("Error in post invoice : ", error.response.data)
                setFieldError((error.response?.data?.detail[0]?.loc[1] || 'invoice_info'), error.response?.data?.detail[0]?.msg || 'Invalid input , check Again !');
            } else {
                alert('Server Error: ' + error.message);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const getFieldIcon = (key) => {
        const iconMap = {
            owner_company: <Building2 className="w-5 h-5" />,
            customer_company: <Users className="w-5 h-5" />,
            invoice_number: <Hash className="w-5 h-5" />,
            invoice_date: <Calendar className="w-5 h-5" />,
            invoice_due_date: <Calendar className="w-5 h-5" />,
            invoice_terms: <FileText className="w-5 h-5" />,
            invoice_place_of_supply: <MapPin className="w-5 h-5" />,
            invoice_notes: <StickyNote className="w-5 h-5" />
        };
        return iconMap[key] || <FileText className="w-5 h-5" />;
    };

    const getFieldPlaceholder = (key) => {
        const placeholderMap = {
            invoice_number: 'Enter invoice number',
            invoice_terms: 'Enter payment terms',
            invoice_place_of_supply: 'Enter place of supply',
            invoice_notes: 'Enter additional notes'
        };
        return placeholderMap[key] || 'Enter value';
    };

    const fieldGroups = [
        {
            title: 'Company Information',
            icon: <Building2 className="w-5 h-5" />,
            fields: ['owner_company', 'customer_company']
        },
        {
            title: 'Invoice Details',
            icon: <FileText className="w-5 h-5" />,
            fields: ['invoice_number', 'invoice_terms', 'invoice_place_of_supply']
        },
        {
            title: 'Dates',
            icon: <Calendar className="w-5 h-5" />,
            fields: ['invoice_date', 'invoice_due_date']
        },
        {
            title: 'Additional Information',
            icon: <StickyNote className="w-5 h-5" />,
            fields: ['invoice_notes']
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="model-form-header">
                    {/* Header */}
                    <div className="model-form-header-div">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Receipt className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">
                                {editMode ? 'Edit Invoice' : 'Create New Invoice'}
                            </h2>
                        </div>
                        <p className="text-blue-100 mt-2">
                            {editMode ? 'Update your invoice information' : 'Generate a new invoice for your customer'}
                        </p>
                    </div>

                    <div className="p-8">
                        <Formik
                            enableReinitialize
                            initialValues={editMode && editInvoiceData ? {
                                ...editInvoiceData,
                                invoice_items: editInvoiceData.invoice_items || initialValues.invoice_items,
                            } : initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                                <Form className="space-y-8">
                                    {/* Company Information */}
                                    {fieldGroups.slice(0, 1).map((group, groupIndex) => (
                                        <div key={groupIndex} className="space-y-6">
                                            <div className="flex items-center space-x-3 pb-4 border-b border-blue-100">
                                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                                    {group.icon}
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-800">{group.title}</h3>
                                            </div>

                                            <div className="model-form-grid">
                                                {/* Owner Company */}
                                                <div className="flex flex-col">
                                                    <label htmlFor="owner_company" className="text-sm font-medium text-gray-700 mb-2">
                                                        Owner Company <span className="text-red-500 ml-1">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                            <Building2 className="w-5 h-5" />
                                                        </div>
                                                        <select
                                                            id="owner_company"
                                                            name="owner_company"
                                                            value={values.owner_company}
                                                            onChange={(e) => { handleChange(e); fetchCustomers(e.target.value); fetchProducts(e.target.value) }}
                                                            onBlur={handleBlur}
                                                            className={`w-full pl-12 pr-10 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none ${touched.owner_company && errors.owner_company
                                                                ? 'border-red-300 focus:border-red-500'
                                                                : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                                                }`}
                                                        >
                                                            <option value="">-- Select Owner Company --</option>
                                                            {yourCompanies.map(company => (
                                                                <option key={company.company_id} value={company.company_id}>
                                                                    {company.company_name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                            <ChevronDown className="w-5 h-5" />
                                                        </div>
                                                        {touched.owner_company && errors.owner_company && (
                                                            <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                                                                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                                                    <span className="text-white text-xs">!</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {touched.owner_company && errors.owner_company && (
                                                        <div className="mt-1 flex items-center space-x-1">
                                                            <span className="text-red-500 text-sm">{errors.owner_company}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Customer Company */}
                                                <div className="flex flex-col">
                                                    <label htmlFor="customer_company" className="text-sm font-medium text-gray-700 mb-2">
                                                        Customer Company <span className="text-red-500 ml-1">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                            <Users className="w-5 h-5" />
                                                        </div>
                                                        <select
                                                            id="customer_company"
                                                            name="customer_company"
                                                            value={values.customer_company}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={`w-full pl-12 pr-10 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none ${touched.customer_company && errors.customer_company
                                                                ? 'border-red-300 focus:border-red-500'
                                                                : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                                                }`}
                                                        >
                                                            <option value="">-- Select Customer Company --</option>
                                                            {yourCustomers.map(customer => (
                                                                <option key={customer.customer_id} value={customer.customer_id}>
                                                                    {customer.customer_name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                            <ChevronDown className="w-5 h-5" />
                                                        </div>
                                                        {touched.customer_company && errors.customer_company && (
                                                            <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                                                                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                                                    <span className="text-white text-xs">!</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {touched.customer_company && errors.customer_company && (
                                                        <div className="mt-1 flex items-center space-x-1">
                                                            <span className="text-red-500 text-sm">{errors.customer_company}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Invoice Details */}
                                    {fieldGroups.slice(1, 2).map((group, groupIndex) => (
                                        <div key={groupIndex} className="space-y-6">
                                            <div className="flex items-center space-x-3 pb-4 border-b border-blue-100">
                                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                                    {group.icon}
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-800">{group.title}</h3>
                                            </div>

                                            <div className="model-form-grid">
                                                {group.fields.map((key) => (
                                                    <div key={key} className={`flex flex-col ${key === 'invoice_place_of_supply' ? 'md:col-span-2' : ''}`}>
                                                        <label htmlFor={key} className="text-sm font-medium text-gray-700 mb-2">
                                                            {key.replace(/invoice_/g, '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                            <span className="text-red-500 ml-1">*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                                {getFieldIcon(key)}
                                                            </div>
                                                            <input
                                                                id={key}
                                                                name={key}
                                                                type="text"
                                                                value={values[key]}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder={getFieldPlaceholder(key)}
                                                                className={`model-form-field ${touched[key] && errors[key]
                                                                    ? 'border-red-300 focus:border-red-500'
                                                                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                                                    }`}
                                                            />
                                                            {touched[key] && errors[key] && (
                                                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                                                        <span className="text-white text-xs">!</span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {touched[key] && errors[key] && (
                                                            <div className="mt-1 flex items-center space-x-1">
                                                                <span className="text-red-500 text-sm">{errors[key]}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Dates */}
                                    {fieldGroups.slice(2, 3).map((group, groupIndex) => (
                                        <div key={groupIndex} className="space-y-6">
                                            <div className="flex items-center space-x-3 pb-4 border-b border-blue-100">
                                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                                    {group.icon}
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-800">{group.title}</h3>
                                            </div>

                                            <div className="model-form-grid">
                                                {group.fields.map((key) => (
                                                    <div key={key} className="flex flex-col">
                                                        <label htmlFor={key} className="text-sm font-medium text-gray-700 mb-2">
                                                            {key.replace(/invoice_/g, '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                            <span className="text-red-500 ml-1">*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                                <Calendar className="w-5 h-5" />
                                                            </div>
                                                            <input
                                                                id={key}
                                                                name={key}
                                                                type="date"
                                                                value={values[key]?.slice(0, 10)}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className={`model-form-field ${touched[key] && errors[key]
                                                                    ? 'border-red-300 focus:border-red-500'
                                                                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                                                    }`}
                                                            />
                                                            {touched[key] && errors[key] && (
                                                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                                                        <span className="text-white text-xs">!</span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {touched[key] && errors[key] && (
                                                            <div className="mt-1 flex items-center space-x-1">
                                                                <span className="text-red-500 text-sm">{errors[key]}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Invoice Items */}
                                    <div className="space-y-6">
                                        <div className="flex items-center space-x-3 pb-4 border-b border-blue-100">
                                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                                <ShoppingCart className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-800">Invoice Items</h3>
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">At least 1 item required</span>
                                        </div>

                                        <FieldArray name="invoice_items">
                                            {({ remove, push }) => (
                                                <div className="space-y-4">
                                                    {values.invoice_items.map((item, index) => (
                                                        <div key={index} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors duration-200">
                                                            <div className="flex justify-between items-center mb-4">
                                                                <h4 className="text-md font-medium text-gray-800 flex items-center space-x-2">
                                                                    <Package className="w-4 h-4 text-blue-600" />
                                                                    <span>Item {index + 1}</span>
                                                                </h4>
                                                                {values.invoice_items?.length > 1 && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => remove(index)}
                                                                        className="flex items-center space-x-1 text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors duration-200"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                        <span>Remove</span>
                                                                    </button>
                                                                )}
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div className="flex flex-col">
                                                                    <label className="text-sm font-medium text-gray-700 mb-2">
                                                                        Product <span className="text-red-500 ml-1">*</span>
                                                                    </label>
                                                                    <div className="relative">
                                                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                                            <Package className="w-5 h-5" />
                                                                        </div>
                                                                        <select
                                                                            name={`invoice_items[${index}].product_id`}
                                                                            value={item.product_id}
                                                                            onChange={handleChange}
                                                                            className={`w-full pl-12 pr-10 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none ${touched.invoice_items?.[index]?.product_id && errors.invoice_items?.[index]?.product_id
                                                                                ? 'border-red-300 focus:border-red-500'
                                                                                : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                                                                }`}
                                                                        >
                                                                            <option value="">-- Select Product --</option>
                                                                            {yourProducts.map(product => (
                                                                                <option key={product.product_id} value={product.product_id}>
                                                                                    {product.product_name}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                                            <ChevronDown className="w-5 h-5" />
                                                                        </div>
                                                                        {touched.invoice_items?.[index]?.product_id && errors.invoice_items?.[index]?.product_id && (
                                                                            <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                                                                                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                                                                    <span className="text-white text-xs">!</span>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    {touched.invoice_items?.[index]?.product_id && errors.invoice_items?.[index]?.product_id && (
                                                                        <div className="mt-1 flex items-center space-x-1">
                                                                            <span className="text-red-500 text-sm">{errors.invoice_items[index].product_id}</span>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div className="flex flex-col">
                                                                    <label className="text-sm font-medium text-gray-700 mb-2">
                                                                        Quantity <span className="text-red-500 ml-1">*</span>
                                                                    </label>
                                                                    <div className="relative">
                                                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                                            <Hash className="w-5 h-5" />
                                                                        </div>
                                                                        <input
                                                                            name={`invoice_items[${index}].invoice_item_quantity`}
                                                                            type="number"
                                                                            value={item.invoice_item_quantity}
                                                                            onChange={handleChange}
                                                                            placeholder="Enter quantity"
                                                                            className={`model-form-field ${touched.invoice_items?.[index]?.invoice_item_quantity && errors.invoice_items?.[index]?.invoice_item_quantity
                                                                                ? 'border-red-300 focus:border-red-500'
                                                                                : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                                                                }`}
                                                                        />
                                                                        {touched.invoice_items?.[index]?.invoice_item_quantity && errors.invoice_items?.[index]?.invoice_item_quantity && (
                                                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                                                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                                                                    <span className="text-white text-xs">!</span>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    {touched.invoice_items?.[index]?.invoice_item_quantity && errors.invoice_items?.[index]?.invoice_item_quantity && (
                                                                        <div className="mt-1 flex items-center space-x-1">
                                                                            <span className="text-red-500 text-sm">{errors.invoice_items[index].invoice_item_quantity}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    <button
                                                        type="button"
                                                        onClick={() => push({ product_id: '', invoice_item_quantity: 1 })}
                                                        className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                                                    >
                                                        <Plus className="w-5 h-5" />
                                                        <span>Add Another Item</span>
                                                    </button>
                                                </div>
                                            )}
                                        </FieldArray>
                                    </div>

                                    {/* Additional Information */}
                                    {fieldGroups.slice(3, 4).map((group, groupIndex) => (
                                        <div key={groupIndex} className="space-y-6">
                                            <div className="flex items-center space-x-3 pb-4 border-b border-blue-100">
                                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                                    {group.icon}
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-800">{group.title}</h3>
                                            </div>

                                            <div className="grid grid-cols-1 gap-6">
                                                {group.fields.map((key) => (
                                                    <div key={key} className="flex flex-col">
                                                        <label htmlFor={key} className="text-sm font-medium text-gray-700 mb-2">
                                                            {key.replace(/invoice_/g, '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                            <span className="text-red-500 ml-1">*</span>
                                                        </label>

                                                        <div className="relative">
                                                            <div className="absolute left-3 top-3 text-gray-400">
                                                                <StickyNote className="w-5 h-5" />
                                                            </div>
                                                            <textarea
                                                                id={key}
                                                                name={key}
                                                                rows="4"
                                                                value={values[key]}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder={getFieldPlaceholder(key)}
                                                                className={`model-form-field resize-none ${touched[key] && errors[key]
                                                                    ? 'border-red-300 focus:border-red-500'
                                                                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                                                    }`}
                                                            />
                                                            {touched[key] && errors[key] && (
                                                                <div className="absolute right-3 top-3">
                                                                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                                                        <span className="text-white text-xs">!</span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {touched[key] && errors[key] && (
                                                            <div className="mt-1 flex items-center space-x-1">
                                                                <span className="text-red-500 text-sm">{errors[key]}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}


                                    {/* Error Display */}
                                    {touched.invoice_info && errors.invoice_info && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                                    <span className="text-white text-xs">!</span>
                                                </div>
                                                <span className="text-red-600 text-sm font-medium">{errors.invoice_info}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Submit Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/invoices')}
                                            className="model-form-actions-cancel"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={
                                                isSubmitting ||
                                                Object.keys(errors).length > 0
                                            }
                                            className={`model-form-actions-submit  ${Object.keys(errors).length > 0 ? 'border-2 border-red-500' : ''}`}

                                        > {isSubmitting ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className=" model-form-actions-submiting"></div>
                                                <span>Processing...</span>
                                            </div>
                                        ) : (
                                            editMode ? 'Update Invoice' : 'Create Invoice'
                                        )}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceForm;