import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../API/api';

const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const navigate = useNavigate();

    // device width

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // nav

    const [isToggle, setIsToggle] = useState(false);


    // login page 

    const [loginPage, setLoginPage] = useState({
        isLogined: false,
        isActive: true,
    });

    // JWT token
    const [token, setToken] = useState("");
    const [userDeatils, setuserDeatils] = useState({});

    useEffect(() => {
        const tokenStr = localStorage.getItem("token");
        const userdetail = localStorage.getItem("userDetail");
        if (tokenStr) {
            setToken(tokenStr);
            setLoginPage(
                { isActive: false, isLogined: true }
            )
            navigate("/home");
        }

        if (userdetail) {
            setuserDeatils(JSON.parse(userdetail));
        }

    }, [token])


    // Companies

    const [yourCompanies, setYourCompanies] = useState([]);

    const fetchCompany = async () => {
        try {
            const res = await api.get("companies", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setYourCompanies(res.data);
        } catch (e) {
            console.log("Get Companies Error : ", e);
        }
    }

    useEffect(() => {
        fetchCompany();
    }, [])


    // Products

    const [yourProducts, setYourProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await api.get("products", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setYourProducts(res.data);
        } catch (e) {
            console.log("Get Products Error : ", e);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    // Customers

    const [yourCustomers, setYourCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const res = await api.get("customers", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setYourCustomers(res.data);
        } catch (e) {
            console.log("Get Products Error : ", e);
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, [])




    return (
        <DataContext.Provider value={{
            navigate,
            loginPage, setLoginPage,
            token, setToken,
            width, setWidth,
            isToggle, setIsToggle,
            userDeatils, setuserDeatils,
            yourCompanies, setYourCompanies, fetchCompany,
            yourProducts, setYourProducts, fetchProducts,
            yourCustomers, setYourCustomers, fetchCustomers
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
