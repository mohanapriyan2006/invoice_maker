import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import DataContext from '../context/DataContest';
import { api } from '../API/api';
import deleteI from '../assets/delete1.png'
import editI from '../assets/edit.png'

const CustomerDetail = () => {
    const { id } = useParams();
    const { token, yourCustomers, navigate } = useContext(DataContext);

    // const customer = yourCustomers.find(c => c.customer_to === Number(id));

    const customer = yourCustomers[0];

    // delete
    const handleDeleteCustomer = async (id, cId) => {
        let isOk = confirm("Are you want to delete this Customer ?");
        if (isOk) {
            try {
                await api.delete(`companies/${cId}/customers/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                alert("Customer Deleted Successfully.");
            } catch (e) {
                if (e.response && e.response.data) {
                    console.log("Error in Delete Customer : ", e.response.data)
                } else {
                    alert("Server Error in Delete Customer : ", e);
                }
            }
        }
    }

    return (
        <>
            {!customer ? (
                <div className="text-center mt-10">
                    <h5 className='text-2xl font-semibold text-red-700'>Customer Not Found!</h5>
                    <button className='btn-1 px-4 mt-4' onClick={() => navigate('/customers')}>Go Back</button>
                </div>
            ) : (
                <div className=''>
                    <h3 className='md:text-2xl text-[20px] font-semibold text-blue-900 text-center underline'>Your Customer Details</h3>
                    <div className="customer-details border border-gray-300 rounded-xl p-4 mt-10 ml-12 md:mx-auto shadow-md bg-white w-fit md:max-w-150 justify-center items-center">
                        <h4 className="md:text-3xl text-xl font-bold text-blue-800 mb-2 text-center">{customer.customer_name}</h4>

                        <div className="text-sm text-gray-700 space-y-2 p-4">
                            <p className='text-[18px]'><strong>Customer ID:</strong> {customer.customer_to}</p>
                            <p><strong>Email:</strong> {customer.customer_email}</p>
                            <p><strong>Phone:</strong> {customer.customer_phone}</p>
                            <p><strong>GSTIN:</strong> {customer.customer_gstin}</p>
                            <p><strong>Address Line 1:</strong> {customer.customer_address_line1}</p>
                            <p><strong>Address Line 2:</strong> {customer.customer_address_line2}</p>
                            <p><strong>City:</strong> {customer.customer_city}</p>
                            <p><strong>State:</strong> {customer.customer_state}</p>
                            <p><strong>Postal Code:</strong> {customer.customer_postal_code}</p>
                            <p><strong>Country:</strong> {customer.customer_country}</p>
                        </div>

                        <div className="btns flex justify-center gap-0 md:gap-10 mt-6">
                            <button
                                onClick={() => navigate("/customers")}
                                className='border-3 border-blue-600 h-12 px-2 md:px-6 rounded-2xl hover:bg-blue-500 hover:text-white cursor-pointer'>
                                Back
                            </button>
                            <button
                                onClick={() => handleDeleteCustomer(1, 1)}
                                className='border-3 h-12 px-4 rounded-2xl bg-red-800 hover:bg-red-700 text-white cursor-pointer  flex items-center gap-2'>
                                <img src={deleteI} className='h-auto w-5' alt="icon" />
                                Delete</button>

                            <button className='btn-1 px-6 h-12  flex items-center gap-2'>
                                <img src={editI} className='h-auto w-5' alt="icon" />
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomerDetail;
