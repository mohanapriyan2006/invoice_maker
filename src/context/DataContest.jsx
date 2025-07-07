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


    const fetchToken = async () => {
        const tokenStr = await localStorage.getItem("token");
        const userdetail = await localStorage.getItem("userDetail");
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

    }

    useEffect(() => {
        fetchToken();
    }, [])


    const [isLoading, setIsLoading] = useState({
        invoice: true,
        company: true,
        product: true,
        customer: true,
    })


    // --------------------------------------------
    // Companies
    // ---------------------------------------------

    // GET

    const [yourCompanies, setYourCompanies] = useState([]);

    const fetchCompany = async () => {
        try {
            const res = await api.get("companies", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setYourCompanies(res.data.data);
            setIsLoading((p) => ({ ...p, company: false }))
        } catch (e) {
            console.log("Get Companies Error : ", e);
            setIsLoading((p) => ({ ...p, company: false }));
        }
    }



    // -----------------------------
    // Products
    // -----------------------------

    const [yourProducts, setYourProducts] = useState([]);

    const fetchProducts = async (cId) => {
        try {
            const res = await api.get(`companies/${cId}/products`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setYourProducts(res.data.data);
            setIsLoading((p) => ({ ...p, product: false }));
        } catch (e) {
            console.log("Get Products Error : ", e);
            setIsLoading((p) => ({ ...p, product: false }));
        }
    }



    // -----------------------------
    // Customers
    // -----------------------------

    const [yourCustomers, setYourCustomers] = useState([]);

    const fetchCustomers = async (cId) => {
        try {
            const res = await api.get(`companies/${cId}/customers/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setYourCustomers(res.data.data);
            setIsLoading((p) => ({ ...p, customer: false }));
        } catch (e) {
            console.log("Get Customer Error : ", e);
            setIsLoading((p) => ({ ...p, customer: false }));
        }
    }




    // -----------------------------
    // Invoices
    // -----------------------------

    const [yourInvoices, setYourInvoices] = useState([]);

    const fetchInvoices = async (cId) => {
        try {
            const res = await api.get(`invoices?company_id=${cId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setYourInvoices(res.data.data);
            setIsLoading((p) => ({ ...p, invoice: false }));
        } catch (e) {
            console.log("Get Invoice Error : ", e);
            setIsLoading((p) => ({ ...p, invoice: false }));
        }
    }




    return (
        <DataContext.Provider value={{
            navigate,
            loginPage, setLoginPage, fetchToken,
            token, setToken,
            width, setWidth,
            isToggle, setIsToggle,
            userDeatils, setuserDeatils,
            isLoading, setIsLoading,
            yourCompanies, setYourCompanies, fetchCompany,
            yourProducts, setYourProducts, fetchProducts,
            yourCustomers, setYourCustomers, fetchCustomers,
            yourInvoices, setYourInvoices, fetchInvoices
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
