import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, setBearerToken } from '../API/api';
import Swal from 'sweetalert2'
import { setupAutoLogout } from '../API/auth';

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

    // sweat alert

    // success alert
    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    // delete alert
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "delete mr-2",
            cancelButton: "back mr-2"
        },
        buttonsStyling: false
    });

    const deleteAlert = async () => {
        const result = await swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        });

        if (result.isConfirmed) {
            await swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your data has been deleted.",
                icon: "success"
            });
            return true;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            await swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your data is safe :)",
                icon: "error"
            });
            return false;
        }
    };

    // logout alert
    const logoutAlert = async () => {
        const result = await Swal.fire({
            title: "Are you want to Logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes"
        })

        if (result.isConfirmed) return true;
        else return false;
    }

    // deleteAccount alert
    const confirmUsernameBeforeDelete = async () => {
        const { value: usernameInput } = await Swal.fire({
            title: "Enter your username to delete this Account",
            input: "text",
            inputLabel: "Username",
            inputPlaceholder: "Enter your username",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete",
            inputValidator: (value) => {
                if (!value) {
                    return "You need to write your username!";
                }
            }
        });

        if (usernameInput) {
            if (userDetails.user_name === usernameInput) {
                Swal.fire("Username matched!", "Proceeding with account deletion.", "success");
                return true;
            } else {
                Swal.fire("Username does not match!", "Account deletion cancelled.", "error");
                return false;
            }
        }
    };




    // login page 

    const [loginPage, setLoginPage] = useState({
        isLogined: false,
        isActive: true,
    });


    // JWT token
    const [token, setToken] = useState("");
    const [userDetails, setuserDetails] = useState({});

    const initDataLoad = async () => {
        const companies = await fetchCompany();
        if (companies?.length > 0) {
            const companyId = companies[0]?.company_id;
            await Promise.all([
                fetchCustomers(companyId),
                fetchProducts(companyId),
                fetchInvoices(companyId),
            ]);
        }
    };


    const fetchToken = async () => {
        const tokenStr = await localStorage.getItem("token");
        const userdetail = await localStorage.getItem("userDetail");
        if (tokenStr) {
            setToken(tokenStr);
            // console.log("Token fetched from localStorage:", tokenStr);
            setLoginPage(
                { isActive: false, isLogined: true }
            )
            setBearerToken(tokenStr);

            initDataLoad();

            navigate("/home");
        }

        if (userdetail) {
            setuserDetails(JSON.parse(userdetail));
        }

    }

    const checkTokenExpiry = () => {
        const tokenStr = localStorage.getItem("token");
        if (tokenStr) {
            const isExpired = setupAutoLogout(tokenStr, navigate, setLoginPage, setToken, setYourCompanies, setYourProducts, setYourCustomers, setYourInvoices, Toast);
            return isExpired;
        }
        return true; // No token means expired
    };

    useEffect(() => {
        fetchToken();
    }, [])


    // Auto logout setup - only run once when token changes
    useEffect(() => {
        if (token) {
            setupAutoLogout(token, navigate, setLoginPage, setToken, setYourCompanies, setYourProducts, setYourCustomers, setYourInvoices, Toast);

            // Check token on user activity
            const checkOnActivity = () => {
                checkTokenExpiry();
            };

            // Add event listeners for user activity
            const events = ['click', 'keypress', 'scroll', 'mousemove', 'touchstart'];

            events.forEach(event => {
                document.addEventListener(event, checkOnActivity);
            });

            // Cleanup event listeners
            return () => {
                events.forEach(event => {
                    document.removeEventListener(event, checkOnActivity);
                });
            };
        }
    }, [token]);



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
            const res = await api.get("/companies");
            // console.log("Get Companies Response : ", res);
            setYourCompanies(res.data.data);
            setIsLoading((p) => ({ ...p, company: false }))
            return res.data.data;
        } catch (e) {
            console.log("Get Companies Error : ", e);
            setIsLoading((p) => ({ ...p, company: false }));
            return [];
        }
    }



    // -----------------------------
    // Products
    // -----------------------------

    const [yourProducts, setYourProducts] = useState([]);

    const fetchProducts = async (cId) => {
        try {
            const res = await api.get(`companies/${cId}/products`);
            // console.log("Get Products Response : ", res);
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
            const res = await api.get(`companies/${cId}/customers/`);
            // console.log("Get Customers Response : ", res);
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
            const res = await api.get(`invoices?company_id=${cId}`);
            // console.log("Get Invoices Response : ", res);
            setYourInvoices(res.data.data);
            setIsLoading((p) => ({ ...p, invoice: false }));
            await Promise.all([
                fetchProducts(cId)
            ]);
        } catch (e) {
            console.log("Get Invoice Error : ", e);
            setIsLoading((p) => ({ ...p, invoice: false }));
        }
    }

    const [isEditing, setIsEditing] = useState(false);



    // -----------------------------
    // AI 
    // -----------------------------

    const [isAIActive, setIsAIActive] = useState(false);


    return (
        <DataContext.Provider value={{
            navigate, initDataLoad, Toast, deleteAlert, logoutAlert, confirmUsernameBeforeDelete,
            loginPage, setLoginPage, fetchToken,
            token, setToken,
            width, setWidth,
            isToggle, setIsToggle,
            userDetails, setuserDetails,
            isLoading, setIsLoading,
            yourCompanies, setYourCompanies, fetchCompany,
            yourProducts, setYourProducts, fetchProducts,
            yourCustomers, setYourCustomers, fetchCustomers,
            yourInvoices, setYourInvoices, fetchInvoices, isEditing, setIsEditing,
            isAIActive, setIsAIActive,
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;