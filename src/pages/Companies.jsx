import React, { useContext, useEffect } from 'react'
import DataContext from '../context/DataContest'
import loadingI from '../assets/loading.png'

const Companies = () => {

  const { yourCompanies, navigate, isLoading, fetchCompany } = useContext(DataContext);

  useEffect(() => {
    fetchCompany();
  }, [])

  if (isLoading.company) {
    return (
      <div className="model-loading-div">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-200">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img className='w-16 h-16 animate-spin' src={loadingI} alt="loading" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Loading Companies</h3>
              <div className="flex items-center justify-center space-x-1">
                <span className="text-blue-600">Please wait</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6'>
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-8">
          <div className="model-header-div">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="model-header-icon">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h1 className='sm:text-3xl text-2xl font-bold text-blue-900'>Your Companies</h1>
                  <p className="text-blue-600 mt-1">Manage and view all your registered companies</p>
                </div>
              </div>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                {yourCompanies?.length}
              </div>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="mb-8">
          { yourCompanies == null || yourCompanies?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="model-not-found">
                <div className="model-not-found-icon">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Companies Found</h3>
                <p className="text-gray-600 mb-8">You haven't added any companies yet. Start by creating your first company!</p>
                <button
                  className='model-not-found-btn'
                  onClick={() => navigate('/home')}
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Go Back to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {yourCompanies?.map((company, index) => (
                <div key={index} className="group model-overview">

                  {/* Company Header */}
                  <div className="model-overview-header">
                    <div className="flex items-center justify-between">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                        {company.company_name}
                      </div>
                    </div>
                  </div>

                  {/* Company Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className='model-overview-content'>
                        {company.company_name}
                      </h4>

                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm">{company.company_email}</span>
                        </div>

                        <div className="flex items-start text-gray-600">
                          <svg className="w-4 h-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm leading-relaxed">{company.company_address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-gray-100">
                      <button
                        onClick={() => navigate(`/companyDetail/${company.company_id}`)}
                        className='model-overview-btn'
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>

                  {/* Hover Effect Gradient */}
                  <div className="model-overview-hover"></div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Floating Add Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => navigate("/companyForm")}
            className='model-overview-floating-add group'
          >
            <svg className="model-overview-floating-add-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Desktop Add Button */}
        <div className="hidden md:block">
          <div className="model-header-div">
            <button
              onClick={() => navigate("/companyForm")}
              className='model-overview-add'
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-lg">Add New Company</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Companies