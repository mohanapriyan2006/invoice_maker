import React, { useContext } from 'react'
import '../style/Home.css'
import DataContext from '../context/DataContest';
import RecentInvoices from '../components/RecentInvoices';
import companyI from '../assets/company1.png'
import productI from '../assets/product1.png'
import customerI from '../assets/customer1.png'
import invoiceI from '../assets/invoice1.png'


const Home = () => {

  const { navigate, userDetails } = useContext(DataContext);

  return (
    <>
      <div className="home px-2 text-gray-700">

        <h1 className='text-lg sm:text-[14px] md:text-2xl font-semibold md:ml-0 ml-6 flex sm:justify-start justify-center items-center gap-0.5 sm:gap-2'>
          Welcome back
          <span className="text-blue-800 underline">{userDetails.user_name}</span> !
        </h1>

        <div className="home-actions flex gap-5 flex-wrap justify-evenly p-4 px-8">

          <button
            onClick={() => navigate('/companyForm')}
            className="action bg-cyan-500 hover:bg-cyan-600">
            <p className='action-text flex items-center gap-2 justify-center'>
              <span className='text-4xl'>+</span>  Add Company
              <img src={companyI} className='h-auto md:w-14 w-8' alt='icon' />
            </p>
          </button>

          <button
            onClick={() => navigate('/productForm')}
            className="action bg-amber-600 hover:bg-amber-700">
            <p className='action-text  flex items-center gap-2 justify-center'>
              <span className='text-4xl'>+</span> Add Products
              <img src={productI} className='h-auto md:w-14 w-8' alt='icon' />
            </p>
          </button>

          <button
            onClick={() => navigate('/customerForm')}
            className="action bg-emerald-500 hover:bg-emerald-600">
            <p className='action-text flex items-center gap-2 justify-center'>
              <span className='text-4xl'>+</span> Add Customer
              <img src={customerI} className='h-auto md:w-14 w-8' alt='icon' />
            </p>
          </button>

          <button
            onClick={() => navigate('/invoiceForm')}
            className="action bg-indigo-500 hover:bg-indigo-600">
            <p className='action-text flex items-center gap-2 justify-center'>
              <span className='text-4xl'>+</span> Create Invoice
              <img src={invoiceI} className='h-auto md:w-14 w-8' alt='icon' />
            </p>
          </button>
        </div>

        <div className="divider w-full border-t-3 border-dashed border-gray-500 mb-5"></div>

        <h2 className='sm:text-[22px] text-[18px] font-medium text-center'> Recenty Added Invoices</h2>

        <div className="recent-invoice flex flex-wrap items-center justify-center my-8 ">
          <RecentInvoices />
        </div>
      </div>
    </>
  )
}

export default Home;