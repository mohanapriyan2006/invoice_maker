import React, { useContext, useEffect, useRef } from 'react';
import avatar from '../assets/avatar.png'
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContest';
import profileI from '../assets/profile.png'
import dashboardI from '../assets/dashboard.png'
import invoiceI from '../assets/invoice2.png'
import companyI from '../assets/company2.png'
import productI from '../assets/product2.png'
import customerI from '../assets/customer2.png'
import logoutI from '../assets/logout.png'
import deleteI from '../assets/delete2.png'
import menuWI from '../assets/menuwhite.svg';
import { api } from '../API/api';


const SideBar = () => {
    const navigate = useNavigate();
    const { setLoginPage, logoutAlert, confirmUsernameBeforeDelete, setToken, width, isToggle, setIsToggle, userDetails, setYourCompanies, setYourProducts, setYourCustomers, setYourInvoices } = useContext(DataContext);

    const handleLogout = async () => {
        setIsToggle(false);
        let isOk = await logoutAlert();
        if (isOk) {
            navigate('/');
            localStorage.removeItem("token");
            setLoginPage((p) => ({ ...p, isActive: true }));
            setToken("");
            setYourCompanies([]);
            setYourProducts([]);
            setYourCustomers([]);
            setYourInvoices([]);
        }
    }

    // delete
    const handleDeleteAccount = async (id) => {
        setIsToggle(false);
        let isOK = await confirmUsernameBeforeDelete();
        if (isOK) {
            try {
                await api.delete(`users/${id}`
                );
                navigate('/');
                localStorage.removeItem("token");
                setLoginPage({
                    isLogined: false,
                    isActive: true,
                })
                setToken("");
                setYourCompanies([]);
                setYourProducts([]);
                setYourCustomers([]);
                setYourInvoices([]);
            } catch (e) {
                if (e.response && e.response.data) {
                    console.log("Error in Delete Account : ", e.response.data)
                } else {
                    console.log("Server Error in Delete Account : ", e);
                }
            }
        }
        else {
            console.log("Wrong username !");
        }
    }

    const sidebarRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                if (width < 500 && isToggle) {
                    setIsToggle(false);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isToggle, width]);

    const style = {
        links: 'font-semibold hover:underline cursor-pointer w-fit flex gap-2 items-center',
    }



    return (
        <>
            <div
                ref={sidebarRef}
                className={`sideBar overflow-y-auto fixed top-0 h-screen bg-blue-900  p-4 transition-all ease-in-out z-[9999] ${width < 500 ? (isToggle ? "left-0 text-white w-60" : "-left-47 text-blue-900 w-56") : "block md:w-80 w-fit text-white"}`}>
                {width < 500 && (
                    <div className="absolute right-1 top-2">
                        <img
                            onClick={() => setIsToggle((p) => (!p))}
                            src={menuWI} alt="Menu Icon"
                            className={`w-auto h-8 hover:scale-[108%] cursor-pointer ${isToggle ? "" : "rotate-180"} `} />
                    </div>)
                }
                <div className="profile flex gap-4 mt-4 -ml-2 flex-wrap">
                    <img className='h-auto w-20 border-dashed border-2 border-gray-300 rounded-full' src={avatar} alt="avatar" />
                    <div className='flex flex-col justify-center gap-1'>
                        <h1><span className='text-sm'>Username : </span>{userDetails.user_name}</h1>
                        <h3><span className='text-sm'>Created At : </span>{new Date(userDetails.created_at).toLocaleDateString()}</h3>
                    </div>
                    <h2
                        onClick={() => { navigate('/changePassword'); setIsToggle(false); setLoginPage((p) => ({ ...p, isActive: true })) }}
                        className={style.links}>
                        <img src={profileI} alt='icon' className='h-4 w-4' /> Change username/password</h2>
                </div>

                <div className="divider border-b-2 border-dashed max-full my-6"></div>

                <div className="nav-links pl-2 flex flex-col gap-4">
                    <p
                        onClick={() => { navigate('/home'); setIsToggle(false); }}
                        className={style.links}
                    >
                        <img src={dashboardI} alt='icon' className='h-5 w-5' />Dashboard</p>
                    <p
                        onClick={() => { navigate("/invoices"); setIsToggle(false); }}
                        className={style.links}>
                        <img src={invoiceI} alt='icon' className='h-5 w-5' />Invioces</p>
                    <p
                        onClick={() => { navigate("/companies"); setIsToggle(false); }}
                        className={style.links}>
                        <img src={companyI} alt='icon' className='h-5 w-5' />Companies</p>
                    <p
                        onClick={() => { navigate("/products"); setIsToggle(false); }}
                        className={style.links}
                    >
                        <img src={productI} alt='icon' className='h-5 w-5' />Products</p>
                    <p
                        onClick={() => { navigate("/customers"); setIsToggle(false); }}
                        className={style.links}
                    >
                        <img src={customerI} alt='icon' className='h-5 w-5' />Customers</p>

                    <p onClick={handleLogout}
                        className='font-semibold hover:underline cursor-pointer text-red-400 mt-8 w-fit flex gap-1 items-center'
                    >
                        <img src={logoutI} alt='icon' className='h-5 w-5' />Logout</p>
                </div>

                <div className="divider border-b-2 border-dashed max-full mt-6 mb-1"></div>

                <p onClick={() => handleDeleteAccount(userDetails.user_id)}
                    className='font-semibold hover:underline cursor-pointer text-red-400 mt-4 w-fit flex gap-1 items-center'
                >
                    <img src={deleteI} alt='icon' className='h-5 w-5' />Detele Account</p>

                <div className="about pl-2 mt-6 flex flex-col gap-1 text-white">
                    <p>&copy; 2025 </p>
                    <p>Invoice manager</p>
                </div>

                <div className="divider border-b-2 border-dashed max-full mt-2 mb-6"></div>
            </div>
        </>
    )
}

export default SideBar;