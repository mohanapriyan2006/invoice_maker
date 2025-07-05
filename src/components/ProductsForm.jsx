import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { api } from '../API/api';
import DataContext from '../context/DataContest';

const ProductForm = () => {
    const { token, navigate, fetchProduct } = useContext(DataContext);

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
            company_id: 0
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
            company_id: Yup.number().min(1).required('Company ID is required'),
        }),

        onSubmit: (values, { setFieldError }) => {
            const postProduct = async () => {
                try {
                    await api.post("/products", { ...values }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    fetchProduct();
                    navigate("/products");

                } catch (e) {
                    if (e.response && e.response.data) {
                        setFieldError("product_name", "Invalid or duplicate product");
                    } else {
                        alert("Server Error:", e.message);
                    }
                }
            };

            postProduct();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="ml-15 md:mx-auto p-4 space-y-4 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Add New Product</h2>

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

            <div className='grid grid-cols-2 items-center gap-1 md:gap-10'>
                <button
                    onClick={() => navigate("/products")}
                    type='button'
                    className="border-3 border-blue-600 h-12 px-6 rounded-2xl hover:bg-blue-500 hover:text-white cursor-pointer"
                >Cancel</button>
                <button type="submit" className="btn-1 px-6 h-12">Submit</button>
            </div>
        </form>
    );
};

export default ProductForm;
