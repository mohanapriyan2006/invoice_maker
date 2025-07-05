import React, { useContext } from 'react'
// import { useParams } from 'react-router-dom'
import DataContext from '../context/DataContest';


const company = {
    "company_owner": 0,
    "company_name": "string",
    "company_address": "string",
    "company_gstin": "string",
    "company_msme": "string",
    "company_email": "user@example.com",
    "company_bank_account_no": "string",
    "company_bank_name": "string",
    "company_account_holder": "string",
    "company_branch": "string",
    "company_ifsc_code": "string",
    "customers": []
}

const CompanyDetail = () => {

    // const { id } = useParams();

    const { navigate, yourCompanies, setYourCompanies } = useContext(DataContext);

    // const company = yourCompanies.find(val => val.company_owner == id);

    return (
        <>
            {company.length ? (
                <div>
                    <h5 className='text-2xl font-semibold text-red-700'>Company Not Found !</h5>
                    <button className='btn-1 px-4' onClick={() => navigate('/companies')}>Go Back</button>
                </div>
            )
                : (
                    <div className=''>
                        <div className="company-details border border-gray-300 rounded-xl p-4 mt-10 ml-12 md:mx-auto shadow-md bg-white max-w-60 md:max-w-150 justify-center items-center">
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

                                <p><strong>Customers Count:</strong> {company.customers.length}</p>
                            </div>

                            <div className="btns flex justify-center gap-0 md:gap-10 mt-6">
                                <button 
                                onClick={() => navigate("/companies")}
                                className='border-3 border-blue-600 h-12 px-2 md:px-6 rounded-2xl hover:bg-blue-500 hover:text-white cursor-pointer'>Back</button>
                                <button className='border-3 h-12 px-4 rounded-2xl bg-red-800 hover:bg-red-700 text-white cursor-pointer'>Delete</button>
                                <button className='btn-1 px-6 h-12'>Edit</button>
                            </div>
                        </div>

                    </div>)}
        </>
    )
}

export default CompanyDetail