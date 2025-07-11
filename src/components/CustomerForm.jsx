import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { api } from '../API/api';
import DataContext from '../context/DataContest';
import { useParams } from 'react-router-dom';

const CustomerForm = ({ editMode = false }) => {
    const { id } = useParams();
    const { navigate, fetchCustomers, yourCompanies, yourCustomers, fetchCompany , Toast } = useContext(DataContext);
    const [editCustomerData, setEditCustomerData] = useState(null);

    useEffect(() => {
        if (!yourCompanies || yourCompanies.length === 0) {
            fetchCompany();
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            company_id: '',
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
            company_id: Yup.string().required('Please select a company'),
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
            const saveCustomer = async () => {
                try {
                    if (editMode && editCustomerData) {
                        // PUT
                        await api.put(
                            `companies/${values.company_id}/customers/${editCustomerData.customer_id}`,
                            values,
                        );
                        Toast.fire({
                            icon: "success",
                            title: "Successfully customer updated"
                        });
                    } else {
                        // POST
                        await api.post(
                            `companies/${values.company_id}/customers/`,
                            { ...values, customer_to: values.company_id },
                        );
                        Toast.fire({
                            icon: "success",
                            title: "Successfully customer created"
                        });
                    }

                    fetchCustomers(values.company_id);
                    navigate('/customers');
                } catch (e) {
                    if (e.response && e.response.data) {
                        setFieldError('customer_phone', e.response.data.detail[0].msg || 'Invalid customer input. Check again.');
                        console.error('API Error:', e.response.data);
                    } else {
                        alert('Server Error: ' + e.message);
                    }
                }
            };

            saveCustomer();
        },
    });

    // Prefill form on edit
    useEffect(() => {
        if (editMode) {
            const existing = yourCustomers.find(cust => cust.customer_id === id);
            setEditCustomerData(existing);
        }

        if (editMode && editCustomerData) {
            formik.setValues({
                company_id: editCustomerData.company_id || '',
                customer_name: editCustomerData.customer_name || '',
                customer_address_line1: editCustomerData.customer_address_line1 || '',
                customer_address_line2: editCustomerData.customer_address_line2 || '',
                customer_city: editCustomerData.customer_city || '',
                customer_state: editCustomerData.customer_state || '',
                customer_postal_code: editCustomerData.customer_postal_code || '',
                customer_country: editCustomerData.customer_country || '',
                customer_gstin: editCustomerData.customer_gstin || '',
                customer_email: editCustomerData.customer_email || '',
                customer_phone: editCustomerData.customer_phone || ''
            });
        }
    }, [editMode, editCustomerData]);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="model-form"
        >
            <h2 className="form-title">
                {editMode ? 'Edit Customer' : 'Add New Customer'}
            </h2>

            {/* Company Dropdown */}
            <div className="flex flex-col">
                <label htmlFor="company_id" className="capitalize font-semibold">
                    Select Company <span className="text-red-600">*</span>
                </label>
                <select
                    id="company_id"
                    name="company_id"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.company_id}
                    className="border border-gray-300 p-2 rounded"
                >
                    <option value="">-- Select Company --</option>
                    {yourCompanies.map((company) => (
                        <option key={company.company_id} value={company.company_id}>
                            {company.company_name}
                        </option>
                    ))}
                </select>
                {formik.touched.company_id && formik.errors.company_id && (
                    <span className="text-red-500 text-sm">{formik.errors.company_id}</span>
                )}
            </div>

            {/* Other Fields */}
            {Object.keys(formik.initialValues)
                .filter((key) => key !== 'company_id')
                .map((key) => (
                    <div key={key} className="flex flex-col">
                        <label htmlFor={key} className="capitalize font-semibold">
                            {key.replace(/_/g, ' ')} <span className="text-red-600">*</span>
                        </label>
                        <input
                            id={key}
                            name={key}
                            type="text"
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

            {/* Actions */}
            <div className="grid grid-cols-2 items-center gap-1 md:gap-10">
                <button
                    onClick={() => navigate('/customers')}
                    type="button"
                    className="cancel"
                >
                    Cancel
                </button>
                <button type="submit" className="btn-1 px-6 h-12">
                    {editMode ? 'Update' : 'Submit'}
                </button>
            </div>
        </form>
    );
};

export default CustomerForm;
