import React, { useContext } from 'react'
import DataContext from '../context/DataContest'



const Companies = () => {

  const { yourCompanies, navigate } = useContext(DataContext);

  return (
    <div className='companies-div ml-10 p-1 relative'>
      <h3 className='md:text-2xl text-[20px] font-semibold text-blue-900 text-center underline'>Your Companies</h3>
      <div className="companies p-2 flex flex-col gap-4 mt-5 ">
        {yourCompanies.lenght ?
          <div>
            <h5 className='text-2xl font-semibold text-red-700'>Company Not Found !</h5>
            <button className='btn-1 px-4' onClick={() => navigate('/home')}>Go Back</button>
          </div>
          : yourCompanies.map(
            (company, index) => (
              <div key={index} className="shadow hover:shadow-blue-600 max-w-200 min-w-60 p-2 px-5 flex md:flex-row flex-col justify-between gap-1 border border-gray-200 rounded">
                <div className=''>
                  <h4 className='font-medium text-[20px]'>{company.company_name}</h4>
                  <p className='text-[14px]'>{company.company_email}</p>
                  <p className='font-light text-[12px]'>{company.company_address}</p>
                </div>
                <div className='flex items-center justify-center'>
                  <button
                    onClick={() => navigate(`/companyDetail/${company.company_owner}`)}
                    className='btn-1 h-10 px-5'
                  >Details</button>
                </div>
              </div>
            )
          )}
      </div>
      <button
        onClick={() => navigate("/companyForm")}
        className='btn-1 text-3xl font-semibold p-2 h-10 hover:scale-[108%] fixed bottom-4 right-4 flex justify-center items-center'>+<span className='text-[18px] ml-1 md:block hidden'> Add Company</span></button>
    </div>
  )
}

export default Companies