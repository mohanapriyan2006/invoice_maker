// import React, { useContext } from 'react'
import DataContext from '../context/DataContest';
import invoiceLogo from '../assets/invoice-logo.png'



const Header = () => {

  // const { userDetails } = useContext(DataContext);



  const styles = {
    header: "header p-2 relative mt-2 mb-2 md:mb-4 border-b border-gray-300 flex justify-center items-center",
    // button: "bg-blue-600 text-white rounded-lg text-[20px] font-semibold px-4 py-1 cursor-pointer hover:bg-blue-800 absolute right-3 top-3"
  }


  return (
    <>
      <header className={styles.header}>
        {/* <h1 className='text-lg sm:text-[14px] md:text-2xl font-semibold '>
          Welcome back
          <span className="text-blue-800 underline">{userDetails.user_name}</span>
        </h1> */}
        <img src={invoiceLogo} className='h-auto w-8 sm:w-12 ' alt="logo" />
        <h1 className={` text-lg sm:text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-linear-30 from-blue-500 to-blue-800 `}>Invoice Manager</h1>
        {/* <button
          onClick={() => {
            navigate('/login');
            setLoginPage((p) => ({ ...p, isActive: true }))
          }}
          className={`${loginPage.isActive ? "hidden" : ""} ${loginPage.isLogined ? "hidden" : ""} ${styles.button}`}>
          Login/SignUp</button> */}
      </header >
    </>
  )
}

export default Header