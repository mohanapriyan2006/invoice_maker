import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import DataContext from '../context/DataContest';
// import { api } from '../API/api';
// import deleteI from '../assets/delete1.png'
import editI from '../assets/edit.png'


const ProductDetail = () => {
    const { id } = useParams();
    const { yourProducts, navigate , yourCompanies ,userDetails} = useContext(DataContext);


    const product = yourProducts.find(p => p.product_id === id);
    const company_name = yourCompanies.find(val => val.company_id == product.company_id).company_name;
    // const product = yourProducts[0];

    // delete
    // const handleDeleteProduct = async (id, cId) => {
    //     let isOk = confirm("Are you want to delete this Product ?");
    //     if (isOk) {
    //         try {
    //             await api.delete(`companies/${cId}/products/${id}`,
    //                 {
    //                     headers: {
    //                         'Authorization': `Bearer ${token}`
    //                     }
    //                 }
    //             );
    //             alert("Product Deleted Successfully.");
    //             fetchProducts();
    //             navigate('/products');
    //         } catch (e) {
    //             if (e.response && e.response.data) {
    //                 console.log("Error in Delete Product : ", e.response.data)
    //             } else {
    //                 alert("Server Error in Delete Product : ", e);
    //             }
    //         }
    //     }
    // }

    if (!product) {
        return (<div className='text-center mt-10'>
            <h5 className='text-2xl font-semibold text-yellow-700'>Product Not Found !</h5>
            <button className='btn-1 px-4' onClick={() => navigate('/products')}>Go Back</button>
        </div>)
    }


    return (
        <>
            {!product ? (
                <div className="text-center mt-10">
                    <h5 className='not-found'>Product Not Found!</h5>
                    <button className='btn-1 px-4 mt-4' onClick={() => navigate('/products')}>Go Back</button>
                </div>
            ) : (
                <div className=''>
                    <h3 className='heading'>Your Product Details</h3>
                    <div className="product-details model-details">
                        <h4 className="model-title">{product.product_name}</h4>

                        <div className="text-sm text-gray-700 space-y-2 p-4">
                            <p className='text-[18px]'><strong>Owner Name:</strong> {userDetails.user_name}</p>
                            <p className='text-[18px]'><strong>Company Name:</strong> {company_name}</p>
                            <p><strong>Description:</strong> {product.product_description}</p>
                            <p><strong>Unit of Measure:</strong> {product.product_unit_of_measure}</p>
                            <p><strong>HSN/SAC Code:</strong> {product.product_hsn_sac_code}</p>
                            <p><strong>Unit Price:</strong> ₹{product.product_unit_price}</p>

                            <p><strong>CGST Rate:</strong> {product.product_default_cgst_rate}%</p>
                            <p><strong>SGST Rate:</strong> {product.product_default_sgst_rate}%</p>
                            <p><strong>IGST Rate:</strong> {product.product_default_igst_rate}%</p>
                            <p><strong>Created At:</strong> {new Date(product.created_at).toLocaleString()}</p>
                        </div>

                        <div className="details-btns">
                            <button
                                onClick={() => navigate("/products")}
                                className='back'>
                                Back
                            </button>

                            {/* <button
                                onClick={() => handleDeleteProduct(product.product_id, product.company_id)}
                                className='border-3 h-12 px-4 rounded-2xl bg-red-800 hover:bg-red-700 text-white cursor-pointer  flex items-center gap-2'>
                                <img src={deleteI} className='btn-icon' alt="icon" />
                                Delete</button> */}

                            <button
                                onClick={() => navigate(`productForm/${product.product_id}`)}
                                className='btn-1 edit'>
                                <img src={editI} className='btn-icon' alt="icon" />
                                Edit
                            </button>
                        </div>
                    </div>
                </div >
            )}
        </>
    );
};

export default ProductDetail;
