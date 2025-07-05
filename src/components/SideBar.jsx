import React, { useContext, useEffect, useRef } from 'react';
import avatar from '../assets/avatar.png'
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContest';

import menuW from '../assets/menuwhite.svg';


const SideBar = () => {
    const navigate = useNavigate();
    const { setLoginPage, setToken, width, isToggle, setIsToggle } = useContext(DataContext);

    const handleLogout = () => {
        navigate('/');
        localStorage.removeItem("token");
        setLoginPage((p) => ({ ...p, isActive: true }));
        setToken("");
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
        links: 'font-semibold hover:underline cursor-pointer',
    }



    return (
        <>
            <div
                ref={sidebarRef}
                className={`sideBar fixed top-0 h-screen bg-blue-900  p-4 transition-all ease-in-out z-[9999] ${width < 500 ? (isToggle ? "left-0 text-white" : "-left-47 text-blue-900") : "block md:w-80 w-50 text-white"}`}>
                {width < 500 && (
                    <div className="absolute right-1 top-2">
                        <img
                            onClick={() => setIsToggle((p) => (!p))}
                            src={menuW} alt="Menu Icon"
                            className={`w-auto h-8 hover:scale-[108%] cursor-pointer ${isToggle ? "" : "rotate-180"} `} />
                    </div>)
                }
                <div className="profile flex gap-4 mt-4 -ml-2 flex-wrap">
                    <img className='h-auto w-20 border-dashed border-2 border-gray-300 rounded-full' src={avatar} alt="avatar" />
                    <div className='flex flex-col justify-center gap-1'>
                        <h1>(user_name)</h1>
                        <h2 className={style.links}>your profile</h2>
                    </div>
                </div>

                <div className="divider border-b-2 border-dashed max-full my-6"></div>

                <div className="nav-links pl-2 flex flex-col gap-4">
                    <p
                        onClick={() => navigate('/home')}
                        className={style.links}
                    >Dashboard</p>
                    <p
                        onClick={() => navigate("/invoices")}
                        className={style.links}>
                        Invioces</p>
                    <p
                        onClick={() => navigate("/companies")}
                        className={style.links}>
                        Companies</p>
                    <p
                        onClick={() => navigate("/products")}
                        className={style.links}
                    >Products</p>
                    <p
                        onClick={() => navigate("/customers")}
                        className={style.links}
                    >Customers</p>

                    <p onClick={handleLogout}
                        className='font-semibold hover:underline cursor-pointer text-red-400 mt-15'
                    >Logout</p>
                </div>

                <div className="divider border-b-2 border-dashed max-full mt-10 mb-6"></div>

                <div className="about pl-2 flex flex-col gap-1 text-white">
                    <p>&copy; 2025 </p>
                    <p>Invoice manager</p>
                </div>

            </div>
        </>
    )
}

export default SideBar;