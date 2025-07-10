import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import DataContext from '../context/DataContest';
import { api } from '../API/api';
import deleteI from '../assets/delete1.png'
import editI from '../assets/edit.png'



const CompanyDetail = () => {

    const { id } = useParams();

    const { token, navigate, yourCompanies, userDetails } = useContext(DataContext);

    const company = yourCompanies.find(val => val.company_id === id);
    // const company = yourCompanies[0];

    // delete
    const handleDeleteCompany = async (id) => {
        let isOk = confirm("Are you want to delete this Company ?");
        if (isOk) {
            try {
                await api.delete(`companies/${id}`);
                alert("Company Deleted Successfully.");
                navigate('/companies')
            } catch (e) {
                if (e.response && e.response.data) {
                    console.log("Error in Delete Company : ", e.response.data)
                } else {
                    alert("Server Error in Delete Company : ", e);
                }
            }
        }
    }


    if (!company) {
        return (<div className='text-center mt-10'>
            <h5 className='text-2xl font-semibold text-yellow-700'>Company Not Found !</h5>
            <button className='btn-1 px-4' onClick={() => navigate('/companies')}>Go Back</button>
        </div>)
    }

    return (
        <>
            <div className=''>
                <h3 className='heading'>Your Company Details</h3>
                <div className="company-details model-details">
                    <h4 className="model-title">{company.company_name}</h4>

                    <div className="text-sm text-gray-700 space-y-2 p-4">
                        <p className='text-[18px]'><strong>Owner Name:</strong> {userDetails.user_name}</p>
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

                    <div className="details-btns">
                        <button
                            onClick={() => navigate("/companies")}
                            className='back'>
                            Back</button>

                        <button
                            onClick={() => handleDeleteCompany(company.company_id)}
                            className='delete'
                        >
                            <img src={deleteI} className='btn-icon' alt="icon" />
                            Delete</button>

                        <button
                            onClick={() => navigate(`/companyForm/${company.company_id}`)}
                            className='btn-1 edit'>
                            <img src={editI} className='btn-icon' alt="icon" />
                            Edit</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CompanyDetail