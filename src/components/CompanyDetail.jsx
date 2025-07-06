import React, { useContext } from 'react'
// import { useParams } from 'react-router-dom'
import DataContext from '../context/DataContest';
import { api } from '../API/api';
import deleteI from '../assets/delete1.png'
import editI from '../assets/edit.png'


const CompanyDetail = () => {

    // const { id } = useParams(); , yourCompanies, setYourCompanies 

    const { token, navigate, yourCompanies } = useContext(DataContext);

    // const company = yourCompanies.find(val => val.company_owner == id);
    const company = yourCompanies[0];

    // delete
    const handleDeleteCompany = async (id) => {
        let isOk = confirm("Are you want to delete this Company ?");
        if (isOk) {
            try {
                await api.delete(`companies/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                alert("Company Deleted Successfully.");
            } catch (e) {
                if (e.response && e.response.data) {
                    console.log("Error in Delete Company : ", e.response.data)
                } else {
                    alert("Server Error in Delete Company : ", e);
                }
            }
        }
    }

    return (
        <>
            {!company ? (
                <div className='text-center mt-10'>
                    <h5 className='text-2xl font-semibold text-red-700'>Company Not Found !</h5>
                    <button className='btn-1 px-4' onClick={() => navigate('/companies')}>Go Back</button>
                </div>
            )
                : (
                    <div className=''>
                        <h3 className='md:text-2xl text-[20px] font-semibold text-blue-900 text-center underline'>Your Company Details</h3>
                        <div className="company-details border border-gray-300 rounded-xl p-4 mt-10 ml-10 md:mx-auto shadow-md bg-white min-w-fit md:max-w-150 justify-center items-center">
                            <h4 className=" md:text-3xl text-xl font-bold text-blue-800 mb-2 text-center">{company.company_name}</h4>

                            <div className="text-sm text-gray-700 space-y-2 p-4">
                                <p className='text-[18px]'><strong>Owner ID:</strong> {company.company_owner}</p>
                                <p><strong>Email:</strong> {company.company_email}</p>
                                <p><strong>Address:</strong> {company.company_address}</p>
                                <p><strong>GSTIN:</strong> {company.company_gstin}</p>
                                <p><strong>MSME:</strong> {company.company_msme}</p>

                                <p><strong>Bank Account No:</strong> {company.company_bank_account_no}</p>
                                <p><strong>Bank Name:</strong> {company.company_bank_name}</p>
                                <p><strong>Account Holder:</strong> {company.company_account_holder}</p>
                                <p><strong>Branch:</strong> {company.company_branch}</p>
                                <p><strong>IFSC Code:</strong> {company.company_ifsc_code}</p>

                            </div>

                            <div className="btns flex justify-center gap-0 md:gap-10 mt-6">
                                <button
                                    onClick={() => navigate("/companies")}
                                    className='border-3 border-blue-600 h-12 px-2 md:px-6 rounded-2xl hover:bg-blue-500 hover:text-white cursor-pointer'>
                                    Back</button>

                                <button
                                    onClick={() => handleDeleteCompany(1)}
                                    className='border-3 h-12 px-4 rounded-2xl bg-red-800 hover:bg-red-700 text-white cursor-pointer flex items-center gap-2'
                                >
                                    <img src={deleteI} className='h-auto w-5' alt="icon" />
                                    Delete</button>

                                <button className='btn-1 px-6 h-12  flex items-center gap-2'>
                                    <img src={editI} className='h-auto w-5' alt="icon" />
                                    Edit</button>
                            </div>
                        </div>

                    </div>)}
        </>
    )
}

export default CompanyDetail