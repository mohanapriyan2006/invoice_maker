import React, { useContext } from 'react';
import DataContext from '../context/DataContest';

const Customers = () => {
    const { yourCustomers, navigate } = useContext(DataContext);

    return (
        <div className='Customers-div ml-10 p-1 relative'>
            <h3 className='md:text-2xl text-[20px] font-semibold text-blue-900 text-center underline'>Your Customers</h3>

            <div className="Customers p-2 flex flex-col gap-4 mt-5">
                {yourCustomers.length === 0 ? (
                    <div>
                        <h5 className='text-2xl font-semibold text-red-700'>Customers Not Found!</h5>
                        <button className='btn-1 px-4' onClick={() => navigate('/home')}>Go Back</button>
                    </div>
                ) : (
                    yourCustomers.map((customer, index) => (
                        <div
                            key={index}
                            className="shadow hover:shadow-blue-600 max-w-200 min-w-60 p-2 px-5 flex md:flex-row flex-col justify-between gap-1 border border-gray-200 rounded"
                        >
                            <div>
                                <h4 className='font-medium text-[20px]'>{customer.customer_name}</h4>
                                <p className='text-[14px]'>Email: {customer.customer_email}</p>
                                <p className='text-[14px]'>Phone: {customer.customer_phone}</p>
                                <p className='font-light text-[12px]'>
                                    {customer.customer_address_line1}, {customer.customer_address_line2}, {customer.customer_city}, {customer.customer_state}, {customer.customer_postal_code}, {customer.customer_country}
                                </p>
                            </div>
                            <div className='flex items-center justify-center'>
                                <button
                                    onClick={() => navigate(`/customersDetail/${customer.customer_to}`)}
                                    className='btn-1 h-10 px-5'
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button
                onClick={() => navigate("/customerForm")}
                className='btn-1 text-3xl font-semibold p-2 h-10 hover:scale-[108%] fixed bottom-4 right-4 flex justify-center items-center'
            >
                +<span className='text-[18px] ml-1 md:block hidden'> Add Customer</span>
            </button>
        </div>
    );
};

export default Customers;
