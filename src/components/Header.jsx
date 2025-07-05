// import React, { useContext } from 'react'
import DataContext from '../context/DataContest';
// import { useNavigate } from 'react-router-dom'



const Header = () => {

  // const navigate = useNavigate();
  // const {width} = useContext(DataContext);

  

  const styles = {
    header: "header p-2 relative text-center mt-2 mb-3 md:mb-8 border-b border-gray-300",
    // button: "bg-blue-600 text-white rounded-lg text-[20px] font-semibold px-4 py-1 cursor-pointer hover:bg-blue-800 absolute right-3 top-3"
  }


  return (
    <>
      <header className={styles.header}>

        <h1 className={` text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-linear-30 from-blue-500 to-blue-800 `}>Invoice Manager</h1>
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