import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { api } from '../API/api';
import DataContext from '../context/DataContest';

const CustomerForm = () => {
    const { token, navigate, fetchCustomers } = useContext(DataContext);

    const formik = useFormik({
        initialValues: {
            customer_to: 0,
            customer_name: '',
            customer_address_line1: '',
            customer_address_line2: '',
            customer_city: '',
            customer_state: '',
            customer_postal_code: '',
            customer_country: '',
            customer_gstin: '',
            customer_email: '',
            customer_phone: ''
        },

        validationSchema: Yup.object({
            customer_to: Yup.number().min(1).required('Customer ID is required'),
            customer_name: Yup.string().required('Customer name is required'),
            customer_address_line1: Yup.string().required('Address Line 1 is required'),
            customer_address_line2: Yup.string().required('Address Line 2 is required'),
            customer_city: Yup.string().required('City is required'),
            customer_state: Yup.string().required('State is required'),
            customer_postal_code: Yup.string().required('Postal code is required'),
            customer_country: Yup.string().required('Country is required'),
            customer_gstin: Yup.string().required('GSTIN is required'),
            customer_email: Yup.string().email('Invalid email').required('Email is required'),
            customer_phone: Yup.string().required('Phone number is required'),
        }),

        onSubmit: (values, { setFieldError }) => {
            const postCustomer = async () => {
                try {
                    await api.post(`companies/${values.company_id}/customers/`, values, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    fetchCustomers();
                    navigate('/customers');
                } catch (e) {
                    if (e.response && e.response.data) {
                        setFieldError('customer_name', 'Invalid or duplicate customer');
                    } else {
                        alert('Server Error:', e.message);
                    }
                }
            };

            postCustomer();
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="ml-15 md:mx-auto p-4 space-y-4 bg-white shadow rounded"
        >
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Add New Customer</h2>

            {Object.keys(formik.initialValues).map((key) => (
                <div key={key} className="flex flex-col">
                    <label htmlFor={key} className="capitalize font-semibold">
                        {key.replace(/_/g, ' ')}<span className="text-red-600">*</span>
                    </label>
                    <input
                        id={key}
                        name={key}
                        type={typeof formik.initialValues[key] === 'number' ? 'number' : 'text'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values[key]}
                        className="border border-gray-300 p-2 rounded"
                    />
                    {formik.touched[key] && formik.errors[key] && (
                        <span className="text-red-500 text-sm">{formik.errors[key]}</span>
                    )}
                </div>
            ))}

            <div className="grid grid-cols-2 items-center gap-1 md:gap-10">
                <button
                    onClick={() => navigate('/customers')}
                    type="button"
                    className="border-3 border-blue-600 h-12 px-6 rounded-2xl hover:bg-blue-500 hover:text-white cursor-pointer"
                >
                    Cancel
                </button>
                <button type="submit" className="btn-1 px-6 h-12">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default CustomerForm;
