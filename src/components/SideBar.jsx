import React from 'react';
import avatar from '../assets/avatar.png'

const SideBar = () => {
    return (
        <div className="sideBar h-dvh bg-blue-900 text-white p-4">
            <div className="profile flex gap-4 mt-4 -ml-2 flex-wrap">
                <img className='h-auto w-20 border-dashed border-2 border-gray-300 rounded-full' src={avatar} alt="avatar" />
                <div className='flex flex-col justify-center gap-1'>
                    <h1>(user_name)</h1>
                    <h2 className='font-semibold hover:underline cursor-pointer'>your profile</h2>
                </div>
            </div>

            <div className="divider border-b-2 border-dashed max-full my-6"></div>

            <div className="nav-links pl-2 flex flex-col gap-4">
                <p className='font-semibold hover:underline cursor-pointer'>Dashboard</p>
                <p className='font-semibold hover:underline cursor-pointer'>Create Invioce</p>
                <p className='font-semibold hover:underline cursor-pointer'>Add Companies</p>
                <p className='font-semibold hover:underline cursor-pointer'>Add Products</p>
                <p className='font-semibold hover:underline cursor-pointer'>Add Customers</p>
                <p className='font-semibold hover:underline cursor-pointer text-red-400 mt-15'>Logout</p>
            </div>

            <div className="divider border-b-2 border-dashed max-full mt-10 mb-6"></div>

            <div className="about pl-2 flex flex-col gap-1 text-white">
                <p>&copy; 2025 </p>
                <p>Invoice manager</p>
            </div>

        </div>
    )
}

export default SideBar