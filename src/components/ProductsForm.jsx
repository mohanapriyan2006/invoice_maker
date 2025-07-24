import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Package, FileText, Ruler, Percent, DollarSign, Hash, Building2, ChevronDown } from 'lucide-react';
import DataContext from '../context/DataContest';
import { useParams } from 'react-router-dom';
import { api } from '../API/api';



const ProductForm = ({ editMode = false }) => {
    const { navigate, fetchProducts, yourCompanies, yourProducts, fetchCompany, Toast } = useContext(DataContext);
    const [editProductData, setEditProductData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (!yourCompanies || yourCompanies.length === 0) {
            fetchCompany();
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            product_name: '',
            product_description: '',
            product_unit_of_measure: '',
            product_default_cgst_rate: 0,
            product_default_sgst_rate: 0,
            product_default_igst_rate: 0,
            product_unit_price: 0,
            product_hsn_sac_code: '',
            company_id: ''
        },

        validationSchema: Yup.object({
            product_name: Yup.string().required('Product name is required'),
            product_description: Yup.string().required('Description is required'),
            product_unit_of_measure: Yup.string().required('Unit of measure is required'),
            product_default_cgst_rate: Yup.number().min(0).required('CGST rate is required'),
            product_default_sgst_rate: Yup.number().min(0).required('SGST rate is required'),
            product_default_igst_rate: Yup.number().min(0).required('IGST rate is required'),
            product_unit_price: Yup.number().min(0).required('Unit price is required'),
            product_hsn_sac_code: Yup.string().required('HSN/SAC code is required'),
            company_id: Yup.string().required('Please select a company'),
        }),

        onSubmit: (values, { setFieldError , setSubmitting }) => {
            const saveProduct = async () => {
                try {
                    if (editMode && editProductData) {
                        await api.put(
                            `companies/${values.company_id}/products/${editProductData.product_id}`,
                            values,
                        );
                        Toast.fire({
                            icon: "success",
                            title: "Successfully product updated"
                        });
                    } else {
                        await api.post(
                            `companies/${values.company_id}/products/`,
                            values,
                        );
                        Toast.fire({
                            icon: "success",
                            title: "Successfully product created"
                        });
                    }
                    

                    setSubmitting(false);
                    fetchProducts();
                    navigate('/products');
                } catch (e) {
                    setSubmitting(false);
                    if (e.response && e.response.data) {
                        setFieldError(e.response?.data?.detail[0]?.loc[1] || 'product_name', e.response.data.detail[0].msg || 'Invalid Product');
                        console.error("Error:", e.response.data);
                    } else {
                        console.error('Server Error:', e.message);
                    }
                }
            };

            saveProduct();
        },
    });

    useEffect(() => {
        if (editMode) {
            const temp = yourProducts.find(val => val.product_id === id);
            setEditProductData(temp);
        }
        if (editMode && editProductData) {
            formik.setValues({
                product_name: editProductData.product_name || '',
                product_description: editProductData.product_description || '',
                product_unit_of_measure: editProductData.product_unit_of_measure || '',
                product_default_cgst_rate: editProductData.product_default_cgst_rate || 0,
                product_default_sgst_rate: editProductData.product_default_sgst_rate || 0,
                product_default_igst_rate: editProductData.product_default_igst_rate || 0,
                product_unit_price: editProductData.product_unit_price || 0,
                product_hsn_sac_code: editProductData.product_hsn_sac_code || '',
                company_id: editProductData.company_id || ''
            });
        }
    }, [editMode, editProductData]);

    const getFieldIcon = (key) => {
        const iconMap = {
            product_name: <Package className="w-5 h-5" />,
            product_description: <FileText className="w-5 h-5" />,
            product_unit_of_measure: <Ruler className="w-5 h-5" />,
            product_default_cgst_rate: <Percent className="w-5 h-5" />,
            product_default_sgst_rate: <Percent className="w-5 h-5" />,
            product_default_igst_rate: <Percent className="w-5 h-5" />,
            product_unit_price: <DollarSign className="w-5 h-5" />,
            product_hsn_sac_code: <Hash className="w-5 h-5" />,
            company_id: <Building2 className="w-5 h-5" />
        };
        return iconMap[key] || <Package className="w-5 h-5" />;
    };

    const getFieldType = (key) => {
        if (typeof formik.initialValues[key] === 'number') return 'number';
        return 'text';
    };

    const getFieldPlaceholder = (key) => {
        const placeholderMap = {
            product_name: 'Enter product name',
            product_description: 'Enter product description',
            product_unit_of_measure: 'e.g., Piece, Kg, Meter',
            product_default_cgst_rate: 'Enter CGST rate (%)',
            product_default_sgst_rate: 'Enter SGST rate (%)',
            product_default_igst_rate: 'Enter IGST rate (%)',
            product_unit_price: 'Enter unit price',
            product_hsn_sac_code: 'Ask AI For HSN/SAC code',
            company_id: 'Select a company'
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
            title: 'Product Information',
            icon: <Package className="w-5 h-5" />,
            fields: ['product_name', 'product_description', 'product_unit_of_measure', 'product_hsn_sac_code']
        },
        {
            title: 'Pricing & Tax Information',
            icon: <DollarSign className="w-5 h-5" />,
            fields: ['product_unit_price', 'product_default_cgst_rate', 'product_default_sgst_rate', 'product_default_igst_rate']
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">
                                {editMode ? 'Edit Product' : 'Add New Product'}
                            </h2>
                        </div>
                        <p className="text-blue-100 mt-2">
                            {editMode ? 'Update your product information' : 'Add a new product to your inventory'}
                        </p>
                    </div>

                    <div className="p-8">
                        <div className="space-y-8">
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {group.fields.map((key) => (
                                            <div key={key} className={`flex flex-col ${key === 'product_description' ? 'md:col-span-2' : ''
                                                }`}>
                                                <label htmlFor={key} className="text-sm font-medium text-gray-700 mb-2">
                                                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
                                                ) : key === 'product_description' ? (
                                                    <div className="relative">
                                                        <div className="absolute left-3 top-4 text-gray-400">
                                                            {getFieldIcon(key)}
                                                        </div>
                                                        <textarea
                                                            id={key}
                                                            name={key}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values[key]}
                                                            placeholder={getFieldPlaceholder(key)}
                                                            rows={3}
                                                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none ${formik.touched[key] && formik.errors[key]
                                                                ? 'border-red-300 focus:border-red-500'
                                                                : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                                                }`}
                                                        />
                                                        {formik.touched[key] && formik.errors[key] && (
                                                            <div className="absolute right-3 top-4">
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
                                                            type={getFieldType(key)}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values[key]}
                                                            placeholder={getFieldPlaceholder(key)}
                                                            step={getFieldType(key) === 'number' ? '0.01' : undefined}
                                                            min={getFieldType(key) === 'number' ? '0' : undefined}
                                                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${formik.touched[key] && formik.errors[key]
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
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-gray-200">
                            <button
                                onClick={() => navigate('/products')}
                                type="button"
                                className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/20"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={formik.handleSubmit}
                                type="button"
                                disabled={!formik.isValid || formik.isSubmitting}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                            >
                                {formik.isSubmitting ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Processing...</span>
                                    </div>
                                ) : (
                                    editMode ? 'Update Product' : 'Add Product'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;