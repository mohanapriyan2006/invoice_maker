import React, { useContext, useEffect, useRef } from 'react';
import avatar from '../assets/avatar.jpg'
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
import { Info } from 'lucide-react';


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
        sidebarRef.current.scrollTo({ top: 0, behavior: 'smooth' })

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
        links: 'font-semibold hover:underline cursor-pointer w-fit flex gap-2 items-center py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-blue-600 hover:shadow-md hover:transform hover:scale-103',
    }

    return (
        <>
            <div
                ref={sidebarRef}
                className={`sideBar scroll-bar fixed top-0 h-screen bg-gradient-to-b from-blue-900 to-blue-800 shadow-2xl border-r border-blue-700 transition-transform ease-in-out duration-150 z-[9999] ${width < 500 ? (isToggle ? "translate-x-0 text-white w-64 overflow-y-scroll overflow-x-hidden" : "-translate-x-full text-blue-900 w-56") : "block overflow-y-scroll md:w-80 w-fit text-white"}`}>
                {/* Mobile Menu Toggle */}
                {width < 500 && (
                    <div className="absolute -right-10 top-3 z-10">
                        <div className="bg-blue-800 p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200">
                            <img
                                onClick={() => setIsToggle((p) => (!p))}
                                src={menuWI} alt="Menu Icon"
                                className={`w-5 h-5 hover:scale-110 cursor-pointer transition-transform duration-200 ${isToggle ? "" : "rotate-180"}`} />
                        </div>
                    </div>
                )}
                {isToggle && (
                    <div className="absolute right-3 top-3 z-10">
                        <div className="bg-blue-800 p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200">
                            <img
                                onClick={() => setIsToggle((p) => (!p))}
                                src={menuWI} alt="Menu Icon"
                                className={`w-5 h-5 hover:scale-110 cursor-pointer transition-transform duration-200 ${isToggle ? "" : "rotate-180"}`} />
                        </div>
                    </div>
                )}

                {/* Profile Section */}
                <div className="profile bg-blue-800/50 backdrop-blur-sm rounded-xl mx-4 mt-6 p-4 border border-blue-600/30 shadow-lg">
                    <div className="flex gap-4 items-center mb-4">
                        <div className="relative">
                            <img className='h-16 w-16 border-2 border-blue-400 rounded-full shadow-md object-cover' src={avatar} alt="avatar" />
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-blue-800"></div>
                        </div>
                        <div className='flex flex-col justify-center gap-1'>
                            <h1 className="text-sm font-medium text-blue-100">
                                <span className='text-xs text-blue-300'>Username: </span>
                                <span className="text-white font-semibold">{userDetails.user_name}</span>
                            </h1>
                            <h3 className="text-xs text-blue-200">
                                <span className='text-blue-300'>Created: </span>
                                {new Date(userDetails.created_at).toLocaleDateString()}
                            </h3>
                        </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-blue-600/30">
                        <h2
                            onClick={() => { navigate('/changePassword'); setIsToggle(false); setLoginPage((p) => ({ ...p, isActive: true })) }}
                            className="text-sm font-medium hover:underline cursor-pointer w-fit flex gap-2 items-center py-2 px-3 rounded-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-md text-blue-100 hover:text-white">
                            <img src={profileI} alt='icon' className='h-4 w-4' />
                            Change username/password
                        </h2>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="nav-links px-4 mt-6 flex flex-col gap-2">
                    <h3 className="text-xs font-semibold text-blue-300 uppercase tracking-wide mb-2 px-3">Navigation</h3>

                    <p
                        onClick={() => { navigate('/home'); setIsToggle(false); }}
                        className={style.links}
                    >
                        <img src={dashboardI} alt='icon' className='h-5 w-5' />
                        <span>Dashboard</span>
                    </p>

                    <p
                        onClick={() => { navigate("/invoices"); setIsToggle(false); }}
                        className={style.links}>
                        <img src={invoiceI} alt='icon' className='h-5 w-5' />
                        <span>Invoices</span>
                    </p>

                    <p
                        onClick={() => { navigate("/companies"); setIsToggle(false); }}
                        className={style.links}>
                        <img src={companyI} alt='icon' className='h-5 w-5' />
                        <span>Companies</span>
                    </p>

                    <p
                        onClick={() => { navigate("/products"); setIsToggle(false); }}
                        className={style.links}
                    >
                        <img src={productI} alt='icon' className='h-5 w-5' />
                        <span>Products</span>
                    </p>

                    <p
                        onClick={() => { navigate("/customers"); setIsToggle(false); }}
                        className={style.links}
                    >
                        <img src={customerI} alt='icon' className='h-5 w-5' />
                        <span>Customers</span>
                    </p>
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Action Buttons */}
                <div className="px-4 mb-2">
                    <div className="bg-blue-800/30 rounded-xl p-3 border border-blue-600">
                        <h3 className="text-xs font-semibold text-blue-300 uppercase tracking-wide mb-3 px-2">Actions</h3>

                        <p onClick={handleLogout}
                            className='font-semibold cursor-pointer text-red-300 hover:text-red-200 w-fit flex gap-2 items-center py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-red-900/30 hover:shadow-md mb-2 hover:transform hover:scale-105'
                        >
                            <img src={logoutI} alt='icon' className='h-5 w-5' />
                            <span>Logout</span>
                        </p>

                        <p onClick={() => handleDeleteAccount(userDetails.user_id)}
                            className='font-semibold cursor-pointer text-red-400 hover:text-red-300 w-fit flex gap-2 items-center py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-red-900/30 hover:shadow-md hover:transform hover:scale-105'
                        >
                            <img src={deleteI} alt='icon' className='h-5 w-5' />
                            <span>Delete Account</span>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 pb-4">
                    <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl p-3 border border-blue-600/30 text-center">
                        <p onClick={() => { navigate('/about'); setIsToggle(false); }} className={style.links}> <Info /> <span>About</span></p>
                        <p onClick={() => { navigate('/terms'); setIsToggle(false); }} className='font-semibold text-sm mt-4 cursor-pointer hover:underline' >Terms & Conditions <span className="text-xs text-blue-200">&copy; {new Date().getFullYear()}</span></p>
                        <p className="text-sm font-medium text-blue-100">Invoice Manager</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar;