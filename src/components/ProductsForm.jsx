import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { api } from '../API/api';
import DataContext from '../context/DataContest';
import { useParams } from 'react-router-dom';

const ProductForm = ({ editMode = false }) => {

    const { id } = useParams();

    const { token, navigate, fetchProducts, yourCompanies, yourProducts, fetchCompany } = useContext(DataContext);
    const [editProductData, setEditProductData] = useState(null)

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

        onSubmit: (values, { setFieldError }) => {
            const saveProduct = async () => {
                try {
                    if (editMode && editProductData) {
                        // PUT request
                        await api.put(
                            `companies/${values.company_id}/products/${editProductData.product_id}`,
                            values,
                        );
                    } else {
                        // POST request
                        await api.post(
                            `companies/${values.company_id}/products/`,
                            values,
                        );
                    }

                    fetchProducts();
                    navigate('/products');
                } catch (e) {
                    if (e.response && e.response.data) {
                        setFieldError('product_name', e.response.data.detail || 'Invalid Product');
                        console.error("Error:", e.response.data);
                    } else {
                        console.error('Server Error:', e.message);
                    }
                }
            };

            saveProduct();
        },
    });

    // Prefill form when editing
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

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="model-form"
        >
            <h2 className="form-title">
                {editMode ? 'Edit Product' : 'Add New Product'}
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

            {/* Other Input Fields */}
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

            {/* Submit and Cancel */}
            <div className="grid grid-cols-2 items-center gap-1 md:gap-10">
                <button
                    onClick={() => navigate('/products')}
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

export default ProductForm;
