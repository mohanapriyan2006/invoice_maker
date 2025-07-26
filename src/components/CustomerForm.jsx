import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    User,
    MapPin,
    Building2,
    Mail,
    Phone,
    FileText,
    Globe,
    ChevronDown,
    Users
} from 'lucide-react';
import { api } from '../API/api';
import DataContext from '../context/DataContest';
import { useParams } from 'react-router-dom';

const CustomerForm = ({ editMode = false }) => {
    const { id } = useParams();
    const { navigate, fetchCustomers, yourCompanies, yourCustomers, fetchCompany, Toast } = useContext(DataContext);
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
                        setFieldError(e.response?.data?.detail[0]?.loc[1] || 'customer_gstin', e.response.data.detail[0].msg || 'Invalid customer input. Check again.');
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

    const getFieldIcon = (key) => {
        const iconMap = {
            company_id: <Building2 className="w-5 h-5" />,
            customer_name: <User className="w-5 h-5" />,
            customer_address_line1: <MapPin className="w-5 h-5" />,
            customer_address_line2: <MapPin className="w-5 h-5" />,
            customer_city: <Building2 className="w-5 h-5" />,
            customer_state: <MapPin className="w-5 h-5" />,
            customer_postal_code: <MapPin className="w-5 h-5" />,
            customer_country: <Globe className="w-5 h-5" />,
            customer_gstin: <FileText className="w-5 h-5" />,
            customer_email: <Mail className="w-5 h-5" />,
            customer_phone: <Phone className="w-5 h-5" />
        };
        return iconMap[key] || <User className="w-5 h-5" />;
    };

    const getFieldPlaceholder = (key) => {
        const placeholderMap = {
            company_id: 'Select a company',
            customer_name: 'Enter customer name',
            customer_address_line1: 'Enter address line 1',
            customer_address_line2: 'Enter address line 2',
            customer_city: 'Enter city',
            customer_state: 'Enter state',
            customer_postal_code: 'Enter postal code',
            customer_country: 'Enter country',
            customer_gstin: 'Enter GSTIN number',
            customer_email: 'Enter email address',
            customer_phone: 'Enter phone number'
        };
        return placeholderMap[key] || 'Enter value';
    };

    const fieldGroups = [
        {
            title: 'Company Selection',
            icon: <Building2 className="w-5 h-5" />,
            fields: ['company_id']
        },
        {
            title: 'Customer Information',
            icon: <User className="w-5 h-5" />,
            fields: ['customer_name', 'customer_email', 'customer_phone']
        },
        {
            title: 'Address Details',
            icon: <MapPin className="w-5 h-5" />,
            fields: ['customer_address_line1', 'customer_address_line2', 'customer_city', 'customer_state', 'customer_postal_code', 'customer_country']
        },
        {
            title: 'Tax Information',
            icon: <FileText className="w-5 h-5" />,
            fields: ['customer_gstin']
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="model-form-header">
                    {/* Header */}
                    <div className="model-form-header-div">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">
                                {editMode ? 'Edit Customer' : 'Add New Customer'}
                            </h2>
                        </div>
                        <p className="text-blue-100 mt-2">
                            {editMode ? 'Update your customer information' : 'Add a new customer to your database'}
                        </p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={formik.handleSubmit} className="space-y-8">
                            {fieldGroups.map((group, groupIndex) => (
                                <div key={groupIndex} className="space-y-6">
                                    {/* Group Header */}
                                    <div className="flex items-center space-x-3 pb-4 border-b border-blue-100">
                                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                            {group.icon}
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800">{group.title}</h3>
                                    </div>

                                    {/* Group Fields */}
                                    <div className="model-form-grid">
                                        {group.fields.map((key) => (
                                            <div key={key} className={`flex flex-col ${key === 'customer_address_line1' || key === 'customer_address_line2'
                                                ? 'md:col-span-2' : ''
                                                }`}>
                                                <label htmlFor={key} className="text-sm font-medium text-gray-700 mb-2">
                                                    {key.replace(/customer_/g, '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                    <span className="text-red-500 ml-1">*</span>
                                                </label>

                                                {key === 'company_id' ? (
                                                    <div className="relative">
                                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                            {getFieldIcon(key)}
                                                        </div>
                                                        <select
                                                            id={key}
                                                            name={key}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values[key]}
                                                            className={`w-full pl-12 pr-10 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none ${formik.touched[key] && formik.errors[key]
                                                                ? 'border-red-300 focus:border-red-500'
                                                                : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                                                }`}
                                                        >
                                                            <option value="">-- Select Company --</option>
                                                            {yourCompanies.map((company) => (
                                                                <option key={company.company_id} value={company.company_id}>
                                                                    {company.company_name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                            <ChevronDown className="w-5 h-5" />
                                                        </div>
                                                        {formik.touched[key] && formik.errors[key] && (
                                                            <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                                                                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                                                    <span className="text-white text-xs">!</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="relative">
                                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                            {getFieldIcon(key)}
                                                        </div>
                                                        <input
                                                            id={key}
                                                            name={key}
                                                            type={key === 'customer_email' ? 'email' : 'text'}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values[key]}
                                                            placeholder={getFieldPlaceholder(key)}
                                                            className={`model-form-field ${formik.touched[key] && formik.errors[key]
                                                                ? 'border-red-300 focus:border-red-500'
                                                                : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                                                }`}
                                                        />
                                                        {formik.touched[key] && formik.errors[key] && (
                                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                                                    <span className="text-white text-xs">!</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {formik.touched[key] && formik.errors[key] && (
                                                    <div className="mt-1 flex items-center space-x-1">
                                                        <span className="text-red-500 text-sm">{formik.errors[key]}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Action Buttons */}
                            <div className="model-form-actions">
                                <button
                                    onClick={() => navigate('/customers')}
                                    type="button"
                                    className=" model-form-actions-cancel"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="model-form-actions-submit"
                                > {formik.isSubmitting ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className=" model-form-actions-submiting"></div>
                                        <span>Processing...</span>
                                    </div>
                                ) : (
                                    editMode ? 'Update Customer' : 'Add Customer'
                                )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerForm;