import React, { useContext, useEffect, useState } from 'react';
import { Formik, FieldArray, Form } from 'formik';
import * as Yup from 'yup';
import { api } from '../API/api';
import DataContext from '../context/DataContest';
import { useParams } from 'react-router-dom';

const InvoiceForm = ({ editMode = false }) => {
    const { id } = useParams();
    const { token, navigate, fetchInvoices, yourInvoices, yourCompanies, yourCustomers, yourProducts, fetchCustomers, fetchProducts } = useContext(DataContext);
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
    };

    const validationSchema = Yup.object({
        owner_company: Yup.string().required('Owner company is required'),
        customer_company: Yup.string().required('Customer company is required'),
        invoice_number: Yup.string().required('Invoice number is required'),
        invoice_date: Yup.date().required('Invoice date is required'),
        invoice_due_date: Yup.date().required('Due date is required'),
        invoice_terms: Yup.string().required('Terms are required'),
        invoice_place_of_supply: Yup.string().required('Place of supply is required'),
        invoice_notes: Yup.string(),
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
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await api.post(`/invoices?company_id=${values.owner_company}`, values, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            fetchInvoices();
            navigate('/invoices');
        } catch (error) {
            if (error.response?.data) {
                console.log("Error in post invoice : ", error.response.data)
                setFieldError('invoice_number', 'Duplicate invoice number or invalid input');
            } else {
                alert('Server Error: ' + error.message);
            }
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <Formik
            enableReinitialize
            initialValues={editMode && editInvoiceData ? {
                ...editInvoiceData,
                invoice_items: editInvoiceData.invoice_items || initialValues.invoice_items,
            } : initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur }) => {

                return (
                    <Form className="model-form">
                        <h2 className="form-title">
                            {editMode ? 'Edit Invoice' : 'Create Invoice'}
                        </h2>

                        {/* Owner Company Dropdown */}
                        <div key="owner_company" className="mb-4">
                            <label htmlFor="owner_company" className="block font-semibold mb-1">Owner Company *</label>
                            <select
                                id="owner_company"
                                name="owner_company"
                                value={values.owner_company}
                                onChange={(e) => { handleChange(e); fetchCustomers(e.target.value); fetchProducts(e.target.value) }}
                                onBlur={handleBlur}
                                className="w-full border border-gray-300 p-2 rounded"
                            >
                                <option value="">Select Owner Company</option>
                                {yourCompanies.map(company => (
                                    <option key={company.company_id} value={company.company_id}>
                                        {company.company_name}
                                    </option>
                                ))}
                            </select>
                            {touched.owner_company && errors.owner_company && (
                                <div className="text-red-500 text-sm">{errors.owner_company}</div>
                            )}
                        </div>

                        {/* Customer Company Dropdown */}
                        <div key="custmoer_company" className="mb-4">
                            <label htmlFor="customer_company" className="block font-semibold mb-1">Customer Company *</label>
                            <select
                                id="customer_company"
                                name="customer_company"
                                value={values.customer_company}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full border border-gray-300 p-2 rounded"
                            >
                                <option value="">Select Customer Company</option>
                                {yourCustomers.map(customer => (
                                    <option key={customer.customer_id} value={customer.customer_id}>
                                        {customer.customer_name}
                                    </option>
                                ))}
                            </select>
                            {touched.customer_company && errors.customer_company && (
                                <div className="text-red-500 text-sm">{errors.customer_company}</div>
                            )}
                        </div>

                        {/* Remaining Text Fields */}
                        {['invoice_number', 'invoice_terms', 'invoice_place_of_supply', 'invoice_notes']
                            .map((key) => (
                                <div key={key} className="mb-4">
                                    <label htmlFor={key} className="block font-semibold capitalize mb-1">
                                        {key.replace(/_/g, ' ')} <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id={key}
                                        name={key}
                                        type="text"
                                        value={values[key]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                    {touched[key] && errors[key] && (
                                        <div className="text-red-500 text-sm">{errors[key]}</div>
                                    )}
                                </div>
                            ))}

                        {/* Dates */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {['invoice_date', 'invoice_due_date'].map((key) => (
                                <div key={key}>
                                    <label htmlFor={key} className="block font-semibold mb-1 capitalize">
                                        {key.replace(/_/g, ' ')} <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id={key}
                                        name={key}
                                        type="date"
                                        value={values[key]?.slice(0, 10)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                    {touched[key] && errors[key] && (
                                        <div className="text-red-500 text-sm">{errors[key]}</div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Invoice Items */}
                        <div className="mt-6">
                            <h3 className="font-semibold text-lg mb-2">
                                Invoice Items <span className="text-xs text-gray-500">(At least 1)</span>
                            </h3>
                            <FieldArray name="invoice_items">
                                {({ remove, push }) => (
                                    <>
                                        {values.invoice_items.map((item, index) => (
                                            <div key={index} className="border border-gray-200 p-3 mb-4 rounded grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block mb-1 font-medium">Product</label>
                                                    <select
                                                        name={`invoice_items[${index}].product_id`}
                                                        value={item.product_id}
                                                        onChange={handleChange}
                                                        className="w-full border border-gray-300 p-2 rounded"
                                                    >
                                                        <option value="">Select Product</option>
                                                        {yourProducts.map(product => (
                                                            <option key={product.product_id} value={product.product_id}>
                                                                {product.product_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {touched.invoice_items?.[index]?.product_id &&
                                                        errors.invoice_items?.[index]?.product_id && (
                                                            <div className="text-red-500 text-sm">
                                                                {errors.invoice_items[index].product_id}
                                                            </div>
                                                        )}
                                                </div>
                                                <div>
                                                    <label className="block mb-1 font-medium">Quantity</label>
                                                    <input
                                                        name={`invoice_items[${index}].invoice_item_quantity`}
                                                        type="number"
                                                        value={item.invoice_item_quantity}
                                                        onChange={handleChange}
                                                        className="w-full border border-gray-300 p-2 rounded"
                                                    />
                                                    {touched.invoice_items?.[index]?.invoice_item_quantity &&
                                                        errors.invoice_items?.[index]?.invoice_item_quantity && (
                                                            <div className="text-red-500 text-sm">
                                                                {errors.invoice_items[index].invoice_item_quantity}
                                                            </div>
                                                        )}
                                                </div>
                                                <div className="col-span-2 text-right">
                                                    <button type="button" onClick={() => remove(index)} className="text-red-600 hover:underline cursor-pointer">
                                                        Remove Item
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => push({ product_id: '', invoice_item_quantity: 1 })} className="btn-1 mb-4 px-2">
                                            + Add Item
                                        </button>
                                    </>
                                )}
                            </FieldArray>
                        </div>

                        {/* Buttons */}
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/invoices')}
                                className="border-2 border-blue-600 text-blue-700 h-12 px-6 rounded-2xl hover:bg-blue-600 hover:text-white"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn-1 h-12 px-6">
                                {editMode ? 'Update Invoice' : 'Submit Invoice'}
                            </button>
                        </div>

                    </Form>
                );
            }}
        </Formik>
    );
};

export default InvoiceForm;
