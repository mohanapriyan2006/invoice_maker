import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import DataContext from '../context/DataContest';

const ProductDetail = () => {
    const { id } = useParams();
    const { yourProducts, navigate } = useContext(DataContext);


    const product = yourProducts.find(p => p.product_id === Number(id));

    return (
        <>
            {!product ? (
                <div className="text-center mt-10">
                    <h5 className='text-2xl font-semibold text-red-700'>Product Not Found!</h5>
                    <button className='btn-1 px-4 mt-4' onClick={() => navigate('/products')}>Go Back</button>
                </div>
            ) : (
                <div className=''>
                    <div className="product-details border border-gray-300 rounded-xl p-4 mt-10 ml-12 md:mx-auto shadow-md bg-white max-w-60 md:max-w-150 justify-center items-center">
                        <h4 className="md:text-3xl text-xl font-bold text-blue-800 mb-2 text-center">{product.product_name}</h4>

                        <div className="text-sm text-gray-700 space-y-2 p-4">
                            <p className='text-[18px]'><strong>Product ID:</strong> {product.product_id}</p>
                            <p><strong>Description:</strong> {product.product_description}</p>
                            <p><strong>Unit of Measure:</strong> {product.product_unit_of_measure}</p>
                            <p><strong>HSN/SAC Code:</strong> {product.product_hsn_sac_code}</p>
                            <p><strong>Unit Price:</strong> ₹{product.product_unit_price}</p>

                            <p><strong>CGST Rate:</strong> {product.product_default_cgst_rate}%</p>
                            <p><strong>SGST Rate:</strong> {product.product_default_sgst_rate}%</p>
                            <p><strong>IGST Rate:</strong> {product.product_default_igst_rate}%</p>
                            <p><strong>Company ID:</strong> {product.company_id}</p>
                            <p><strong>Created At:</strong> {new Date(product.created_at).toLocaleString()}</p>
                        </div>

                        <div className="btns flex justify-center gap-0 md:gap-10 mt-6">
                            <button
                                onClick={() => navigate("/products")}
                                className='border-3 border-blue-600 h-12 px-2 md:px-6 rounded-2xl hover:bg-blue-500 hover:text-white cursor-pointer'>
                                Back
                            </button>
                            <button className='border-3 h-12 px-4 rounded-2xl bg-red-800 hover:bg-red-700 text-white cursor-pointer'>
                                Delete
                            </button>
                            <button className='btn-1 px-6 h-12'>
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetail;
