import React from 'react'
import '../style/Home.css'

const Home = () => {
  return (
    <>
    <div className="home px-4">

      <h1 className='text-2xl font-semibold text-center mt-3'>Welcome back <span className="text-blue-800">(user_name)</span></h1>

      <div className="home-actions flex gap-10 flex-wrap justify-evenly p-10">
        <button className="action bg-cyan-500 hover:bg-cyan-600">
          <p className='action-text'><span>+</span>  Add Company</p>
        </button>
        <button className="action bg-amber-600 hover:bg-amber-700">
          <p className='action-text'><span>+</span> Add Products</p>
        </button>
        <button className="action bg-emerald-500 hover:bg-emerald-600">
          <p className='action-text'><span>+</span> Add Customer</p>
        </button>
        <button className="action bg-indigo-500 hover:bg-indigo-600">
          <p className='action-text'><span>+</span> Create Invoice</p>
        </button>
      </div>

      <div className="divider w-full border-t-3 border-dashed border-gray-500 mb-5"></div>

      <h2 className='text-[22px] font-medium text-center'> Recenty Added Invoices</h2>

      <div className="recent-invoice flex justify-center items-center m-5">
        <h3 className='text-lg text-yellow-800 font-medium'>No Invoices are found !</h3>
      </div>
    </div>
    </>
  )
}

export default Home;