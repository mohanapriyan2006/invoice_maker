import React, { useContext } from 'react'
import '../style/Home.css'
import DataContext from '../context/DataContest';
import RecentInvoices from '../components/RecentInvoices';
import companyI from '../assets/company1.png'
import productI from '../assets/product1.png'
import customerI from '../assets/customer1.png'
import invoiceI from '../assets/invoice1.png'
import AIChatBox from '../components/AIChatBox';

const Home = () => {
  const { navigate, userDetails } = useContext(DataContext);

  return (
    <>
      <div className="min-h-screen mb-10 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        {/* Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>
          </div>

          <div className="relative px-4 py-8 md:py-12">
            <div className="max-w-7xl mx-auto">
              <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left mb-2'>
                Welcome back
                <span className="text-cyan-400 ml-2 relative">
                  {userDetails.user_name}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                </span>
                !
              </h1>
              <p className="text-gray-300 text-center md:text-left text-sm md:text-base">
                Manage your business operations with ease and efficiency
              </p>
            </div>
          </div>
        </div>

        <div className="home px-4 py-8 max-w-7xl mx-auto">
          {/* Action Cards Section */}
          <div className="mb-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Quick Actions</h2>
              <p className="text-gray-600">Start managing your business operations</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Company Card */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button
                  onClick={() => navigate('/companyForm')}
                  className="w-full p-6 text-left relative z-10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">+</span>
                    </div>
                    <img src={companyI} className="w-auto h-14 md:h-20 opacity-80 group-hover:opacity-100 transition-opacity duration-300" alt="company icon" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Add Company</h3>
                  <p className="text-gray-600 text-sm">Register new companies to your system</p>
                </button>
              </div>

              {/* Product Card */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button
                  onClick={() => navigate('/productForm')}
                  className="w-full p-6 text-left relative z-10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">+</span>
                    </div>
                    <img src={productI} className="w-auto h-14 md:h-20 opacity-80 group-hover:opacity-100 transition-opacity duration-300" alt="product icon" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Add Products</h3>
                  <p className="text-gray-600 text-sm">Manage your product inventory</p>
                </button>
              </div>

              {/* Customer Card */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button
                  onClick={() => navigate('/customerForm')}
                  className="w-full p-6 text-left relative z-10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">+</span>
                    </div>
                    <img src={customerI} className="w-auto h-14 md:h-20 opacity-80 group-hover:opacity-100 transition-opacity duration-300" alt="customer icon" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Add Customer</h3>
                  <p className="text-gray-600 text-sm">Register new customers</p>
                </button>
              </div>

              {/* Invoice Card */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button
                  onClick={() => navigate('/invoiceForm')}
                  className="w-full p-6 text-left relative z-10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">+</span>
                    </div>
                    <img src={invoiceI} className="w-auto h-14 md:h-20 opacity-80 group-hover:opacity-100 transition-opacity duration-300" alt="invoice icon" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Create Invoice</h3>
                  <p className="text-gray-600 text-sm">Generate professional invoices</p>
                </button>
              </div>
            </div>
          </div>

          {/* Elegant Divider */}
          <div className="relative flex items-center justify-center mb-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
            <div className="relative px-6 bg-gradient-to-r from-slate-50 to-gray-50">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Recent Invoices Section */}
          <div className="mb-2">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Recent Invoices</h2>
              <p className="text-gray-600">Keep track of your latest transactions</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="p-1 md:p-6">
                <RecentInvoices />
              </div>
            </div>
          </div>

          {/* AI Chat Box */}
          <AIChatBox />
        </div>
      </div>
    </>
  )
}

export default Home;