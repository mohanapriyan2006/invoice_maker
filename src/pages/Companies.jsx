import React, { useContext, useEffect } from 'react'
import DataContext from '../context/DataContest'
import loadingI from '../assets/loading.png'



const Companies = () => {

  const { yourCompanies, navigate, isLoading, fetchCompany } = useContext(DataContext);

  useEffect(() => {
    fetchCompany();
  }, [yourCompanies])

  if (isLoading.company) {
    return <div className="loading-div">
      <img className='load-icon' src={loadingI} alt="icon" />
      Loading company<span className='load-span'>...</span></div>;
  }

  return (
    <div className='companies-div model-overview-div'>
      <h3 className='heading'>Your Companies</h3>
      <div className="companies model-space ">
        {yourCompanies.length === 0 ?
          (<div>
            <h5 className='not-found'>Company Not Found !</h5>
            <button className='btn-1 px-4' onClick={() => navigate('/home')}>Go Back</button>
          </div>)
          : yourCompanies.map(
            (company, index) => (
              <div key={index} className="model">
                <div className=''>
                  <h4 className='font-medium text-[20px]'>{company.company_name}</h4>
                  <p className='text-[14px]'>{company.company_email}</p>
                  <p className='font-light text-[12px]'>{company.company_address}</p>
                </div>
                <div className='flex items-center justify-center'>
                  <button
                    onClick={() => navigate(`/companyDetail/${company.company_id}`)}
                    className='btn-1 h-10 px-5'
                  >Details</button>
                </div>
              </div>
            )
          )}
      </div>

      <button
        onClick={() => navigate("/companyForm")}
        className='btn-1 add-btn'>+<span className='text-[18px] ml-1 md:block hidden'> Add Company</span></button>
    </div>
  )
}

export default Companies