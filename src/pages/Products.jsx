import React, { useContext, useEffect, useState } from 'react';
import DataContext from '../context/DataContest';
import loadingI from '../assets/loading.png';

const Products = () => {
    const {
        yourProducts,
        navigate,
        isLoading,
        fetchProducts,
        yourCompanies,
        fetchCompany
    } = useContext(DataContext);

    const [selectedCompanyId, setSelectedCompanyId] = useState(yourCompanies[0].company_id);

    useEffect(() => {
        fetchCompany()
    }, [])

    useEffect(() => {
        if (yourCompanies.length > 0 && !selectedCompanyId) {
            setSelectedCompanyId(yourCompanies[0].company_id);
        }
    }, [yourCompanies]);

    useEffect(() => {
        if (selectedCompanyId) {
            fetchProducts(selectedCompanyId);
        }
    }, [selectedCompanyId]);

    const handleCompanyChange = (e) => {
        setSelectedCompanyId(e.target.value);
    };


    return (
        <div className="Products-div model-overview-div">
            <h3 className="heading mb-4">
                Your Products
            </h3>

            {/* Company Selector */}
            <div className="mb-6 max-w-md mx-auto">
                <label className="font-medium">Select Company:</label>
                <select
                    value={selectedCompanyId}
                    onChange={handleCompanyChange}
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                >
                    {yourCompanies.map((company) => (
                        <option key={company.company_id} value={company.company_id}>
                            {company.company_name}
                        </option>
                    ))}
                </select>
            </div>

            {isLoading.product && (
                <div className="loading-div">
                    <img className="load-icon" src={loadingI} alt="icon" />
                    Products are loading<span className="load-span">...</span>
                </div>
            )}

            {/* Products List */}
            <div className="Products model-space">
                {yourProducts.length === 0 ? (
                    <div>
                        <h5 className="not-found">
                            Products Not Found!
                        </h5>
                        <button className="btn-1 px-4" onClick={() => navigate('/home')}>
                            Go Back
                        </button>
                    </div>
                ) : (
                    yourProducts.map((product, index) => (
                        <div
                            key={index}
                            className="model"
                        >
                            <div>
                                <h4 className="font-medium text-[20px]">
                                    {product.product_name}
                                </h4>
                                <p className="text-[14px]">Company ID: {product.company_id}</p>
                                <p className="font-light text-[12px]">
                                    {product.product_description}
                                </p>
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    onClick={() => navigate(`/productsDetail/${product.product_id}`)}
                                    className="btn-1 h-10 px-5"
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button
                onClick={() => navigate('/productForm')}
                className="btn-1 add-btn"
            >
                +<span className="text-[18px] ml-1 md:block hidden"> Add Product</span>
            </button>
        </div>
    );
};

export default Products;
