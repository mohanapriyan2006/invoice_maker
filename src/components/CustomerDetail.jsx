import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import DataContext from '../context/DataContest';
import { api } from '../API/api';
import deleteI from '../assets/delete1.png'
import editI from '../assets/edit.png'


const CustomerDetail = () => {
    const { id } = useParams();
    const { token, yourCustomers, yourCompanies , navigate ,userDetails } = useContext(DataContext);

    const customer = yourCustomers.find(c => c.customer_id === id);
    // const customer = yourCustomers[0];

    const company_name = yourCompanies.find(val => val.company_id == customer.customer_to).company_name;


    // delete
    const handleDeleteCustomer = async (id, cId) => {
        let isOk = confirm("Are you want to delete this Customer ?");
        if (isOk) {
            try {
                await api.delete(`companies/${cId}/customers/${id}`  
                );
                alert("Customer Deleted Successfully.");
                navigate("/customers")
            } catch (e) {
                if (e.response && e.response.data) {
                    console.log("Error in Delete Customer : ", e.response.data)
                } else {
                    alert("Server Error in Delete Customer : ", e);
                }
            }
        }
    }



    if (!customer) {
        return (<div className='text-center mt-10'>
            <h5 className='text-2xl font-semibold text-yellow-700'>Customer Not Found !</h5>
            <button className='btn-1 px-4' onClick={() => navigate('/customers')}>Go Back</button>
        </div>)
    }


    return (
        <>
            <div className=''>
                <h3 className='heading'>Your Customer Details</h3>
                <div className="customer-details model-details">
                    <h4 className="model-title">{customer.customer_name}</h4>

                    <div className="text-sm text-gray-700 space-y-2 p-4">
                        <p className='text-[18px]'><strong>Owner Name:</strong> {userDetails.user_name}</p>
                        <p className='text-[18px]'><strong>Company Name:</strong> {company_name}</p>
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

                    <div className="details-btns">
                        <button
                            onClick={() => navigate("/customers")}
                            className='back'>
                            Back
                        </button>
                        <button
                            onClick={() => handleDeleteCustomer(customer.customer_id, customer.customer_to)}
                            className='delete'>
                            <img src={deleteI} className='btn-icon' alt="icon" />
                            Delete</button>

                        <button
                            onClick={() => navigate(`customerForm/${customer.customer_id}`)}
                            className='btn-1 edit'>
                            <img src={editI} className='btn-icon' alt="icon" />
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerDetail;
