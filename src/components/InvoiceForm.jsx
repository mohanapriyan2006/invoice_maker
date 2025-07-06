import React, { useContext } from 'react';
import { Formik, FieldArray, Form } from 'formik';
import * as Yup from 'yup';
import { api } from '../API/api';
import DataContext from '../context/DataContest';

const InvoiceForm = () => {
    const { token, navigate, fetchInvoices } = useContext(DataContext);

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
                product_id: Yup.string().required('Product ID is required'),
                invoice_item_quantity: Yup.number().min(1).required('Quantity is required'),
            })
        ),
    });

    const onSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            await api.post('/invoices', values, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchInvoices();
            navigate('/invoices');
        } catch (error) {
            if (error.response?.data) {
                setFieldError('invoice_number', 'Duplicate invoice number or invalid input');
            } else {
                alert('Server Error: ' + error.message);
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form className="ml-15 md:mx-auto p-4 space-y-4 bg-white shadow rounded">
                    <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Create Invoice</h2>

                    {/* Text Fields */}
                    {[
                        'owner_company',
                        'customer_company',
                        'invoice_number',
                        'invoice_terms',
                        'invoice_place_of_supply',
                        'invoice_notes',
                    ].map((key) => (
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

                    {/* Date Fields */}
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
                        <h3 className="font-semibold text-lg mb-2">Invoice Items <span className='text-xs text-gray-500'>(Aleast add one product)</span></h3>
                        <FieldArray name="invoice_items">
                            {({ remove, push }) => (
                                <>
                                    {values.invoice_items.map((item, index) => (
                                        <div key={index} className="border border-gray-200 p-3 mb-4 rounded grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block mb-1 font-medium">Product ID</label>
                                                <input
                                                    name={`invoice_items[${index}].product_id`}
                                                    type="text"
                                                    value={item.product_id}
                                                    onChange={handleChange}
                                                    className="w-full border border-gray-300 p-2 rounded"
                                                />
                                                {touched.invoice_items?.[index]?.product_id && errors.invoice_items?.[index]?.product_id && (
                                                    <div className="text-red-500 text-sm">{errors.invoice_items[index].product_id}</div>
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

                    {/* Submit Buttons */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <button type="button" onClick={() => navigate('/invoices')} className="border-2 border-blue-600 text-blue-700 h-12 px-6 rounded-2xl hover:bg-blue-600 hover:text-white cursor-pointer">
                            Cancel
                        </button>
                        <button type="submit" className="btn-1 h-12 px-6">
                            Submit Invoice
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default InvoiceForm;
