import React, { useContext } from 'react'
import DataContext from '../context/DataContest'

// {
//     "product_description": "string",
//     "company_id": 3,
//     "product_unit_of_measure": "string",
//     "product_default_cgst_rate": 0,
//     "product_default_igst_rate": 0,
//     "product_id": 4,
//     "product_name": "string",
//     "product_hsn_sac_code": "string",
//     "product_unit_price": 0,
//     "product_default_sgst_rate": 0,
//     "created_at": "2025-07-05T11:48:47.646950"
//   }



const Products = () => {

    const { yourProducts, navigate } = useContext(DataContext);

    return (
        <div className='Products-div ml-10 p-1 relative'>
            <h3 className='md:text-2xl text-[20px] font-semibold text-blue-900 text-center underline'>Your Products</h3>
            <div className="Products p-2 flex flex-col gap-4 mt-5 ">
                {yourProducts.length === 0  ?
                    <div>
                        <h5 className='text-2xl font-semibold text-red-700'>Products Not Found !</h5>
                        <button className='btn-1 px-4' onClick={() => navigate('/home')}>Go Back</button>
                    </div>
                    : (yourProducts.map(
                        (product, index) => (
                            <div key={index} className="shadow hover:shadow-blue-600 max-w-200 min-w-60 p-2 px-5 flex md:flex-row flex-col justify-between gap-1 border border-gray-200 rounded">
                                <div className=''>
                                    <h4 className='font-medium text-[20px]'>{product.product_name}</h4>
                                    <p className='text-[14px]'>Company id : {product.company_id}</p>
                                    <p className='font-light text-[12px]'>{product.product_description}</p>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <button
                                        onClick={() => navigate(`/productsDetail/${product.product_id}`)}
                                        className='btn-1 h-10 px-5'
                                    >Details</button>
                                </div>
                            </div>
                        )
                    ))}
            </div>
            <button
                onClick={() => navigate("/productForm")}
                className='btn-1 text-3xl font-semibold p-2 h-10 hover:scale-[108%] fixed bottom-4 right-4 flex justify-center items-center'>+<span className='text-[18px] ml-1 md:block hidden'> Add product</span></button>
        </div>
    )
}

export default Products