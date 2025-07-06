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

    }, [])




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
            setYourCompanies(res.data);
        } catch (e) {
            console.log("Get Companies Error : ", e);
            // sample
            setYourCompanies([
                {
                    company_id: "COMP12345",
                    company_owner: "John Doe",
                    company_name: "Acme Corporation",
                    company_address: "123 Business Park, Sector 5, Mumbai - 400001",
                    company_gstin: "22ABCDE1234F1Z5",
                    company_msme: "UDYAM-MH-05-1234567",
                    company_email: "contact@acmecorp.example.com",
                    company_bank_account_no: "9876543210123456",
                    company_bank_name: "State Bank of India",
                    company_account_holder: "Acme Corporation",
                    company_branch: "Mumbai Main Branch",
                    company_ifsc_code: "SBIN0001234",
                    created_at: "2025-07-06T12:53:20.200Z"
                },
                {
                    company_id: "COMP12345",
                    company_owner: "John Doe",
                    company_name: "Acme Corporation",
                    company_address: "123 Business Park, Sector 5, Mumbai - 400001",
                    company_gstin: "22ABCDE1234F1Z5",
                    company_msme: "UDYAM-MH-05-1234567",
                    company_email: "contact@acmecorp.example.com",
                    company_bank_account_no: "9876543210123456",
                    company_bank_name: "State Bank of India",
                    company_account_holder: "Acme Corporation",
                    company_branch: "Mumbai Main Branch",
                    company_ifsc_code: "SBIN0001234",
                    created_at: "2025-07-06T12:53:20.200Z"
                }
            ])
        }
    }

    useEffect(() => {
        fetchCompany();
    }, [])



    // -----------------------------
    // Products
    // -----------------------------

    const [yourProducts, setYourProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await api.get("companies/1/products", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setYourProducts(res.data);
        } catch (e) {
            console.log("Get Products Error : ", e);
            setYourProducts([
                {
                    product_id: "PROD2025002",
                    company_id: "COMP12345",
                    product_name: "Stainless Steel Water Bottle",
                    product_description: "1L insulated stainless steel water bottle",
                    product_hsn_sac_code: "7323",
                    product_unit_of_measure: "PCS",
                    product_unit_price: 599,
                    product_default_cgst_rate: 9,
                    product_default_sgst_rate: 9,
                    product_default_igst_rate: 18,
                    created_at: "2025-07-05T10:15:22.100Z"
                },
                {
                    product_id: "PROD2025003",
                    company_id: "COMP12345",
                    product_name: "Organic Green Tea (100g)",
                    product_description: "Premium organic green tea leaves",
                    product_hsn_sac_code: "0902",
                    product_unit_of_measure: "BOX",
                    product_unit_price: 350,
                    product_default_cgst_rate: 2.5,
                    product_default_sgst_rate: 2.5,
                    product_default_igst_rate: 5,
                    created_at: "2025-07-04T14:30:45.755Z"
                }
            ])
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])


    // -----------------------------
    // Customers
    // -----------------------------

    const [yourCustomers, setYourCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const res = await api.get("companies/10/customers/", {
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
        setYourCustomers([
            // Business customer
            {
                customer_id: "CUST2025002",
                customer_to: "Business",
                customer_name: "Global Retail Chains",
                customer_address_line1: "Plot No. 45, Industrial Area",
                customer_address_line2: "Phase II, Chandigarh",
                customer_city: "Chandigarh",
                customer_state: "Punjab",
                customer_postal_code: "160002",
                customer_country: "India",
                customer_gstin: "03AABCU2345P2ZM",
                customer_email: "purchases@globalretail.example.com",
                customer_phone: "+919988776655",
                created_at: "2025-07-05T11:25:10.120Z"
            },

            // Individual customer (no GSTIN)
            {
                customer_id: "CUST2025003",
                customer_to: "Individual",
                customer_name: "Rahul Sharma",
                customer_address_line1: "Flat 303, Green Heights",
                customer_address_line2: "Linking Road, Bandra West",
                customer_city: "Mumbai",
                customer_state: "Maharashtra",
                customer_postal_code: "400050",
                customer_country: "India",
                customer_gstin: "", // Individuals typically don't have GSTIN
                customer_email: "rahul.sharma@example.com",
                customer_phone: "+919712345678",
                created_at: "2025-07-04T09:15:33.450Z"
            },
            {
                customer_id: "CUST2025004",
                customer_to: "Business",
                customer_name: "Singapore Trading Co.",
                customer_address_line1: "101 Cross Street",
                customer_address_line2: "#05-15, Peninsula Plaza",
                customer_city: "Singapore",
                customer_state: "",
                customer_postal_code: "048366",
                customer_country: "Singapore",
                customer_gstin: "", // No GSTIN for foreign customers
                customer_email: "orders@sgtrading.example.com",
                customer_phone: "+6561234567",
                created_at: "2025-07-03T14:40:22.800Z"
            }
        ])
    }, [])


    // -----------------------------
    // Invoices
    // -----------------------------

    const [yourInvoices, setYourInvoices] = useState([]);

    const fetchInvoices = async () => {
        try {
            const res = await api.get("companies/10/invoices/", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setYourInvoices(res.data);
        } catch (e) {
            console.log("Get Products Error : ", e);
            setYourInvoices([{
                invoice_id: "inv-001",
                owner_company: "TechNova Pvt Ltd",
                customer_company: "Green Earth Solutions",
                invoice_number: "TN-2025-001",
                invoice_date: "2025-07-06T06:49:44.838Z",
                invoice_due_date: "2025-07-16T06:49:44.838Z",
                invoice_terms: "Net 10",
                invoice_place_of_supply: "Chennai, Tamil Nadu",
                invoice_notes: "Thank you for your business!",
                invoice_subtotal: 10000,
                invoice_total_cgst: 900,
                invoice_total_sgst: 900,
                invoice_total_igst: 0,
                invoice_total: 11800,
                created_at: "2025-07-06T06:49:44.838Z",
                invoice_by: {
                    company_id: "c001",
                    company_owner: "u123",
                    company_name: "TechNova Pvt Ltd",
                    company_address: "Plot 12, Phase 3, IT Park, Chennai",
                    company_gstin: "33AABCT1234F1Z5",
                    company_msme: "TN1234567",
                    company_email: "contact@technova.in",
                    company_bank_account_no: "123456789012",
                    company_bank_name: "HDFC Bank",
                    company_account_holder: "TechNova Pvt Ltd",
                    company_branch: "Velachery Branch",
                    company_ifsc_code: "HDFC0000123",
                    created_at: "2025-07-01T10:00:00.000Z"
                },
                client: {
                    customer_id: "cust001",
                    customer_to: "u456",
                    customer_name: "Green Earth Solutions",
                    customer_address_line1: "15 Green Street",
                    customer_address_line2: "Industrial Area",
                    customer_city: "Coimbatore",
                    customer_state: "Tamil Nadu",
                    customer_postal_code: "641001",
                    customer_country: "India",
                    customer_gstin: "33AAACG1234F1Z7",
                    customer_email: "accounts@greenearth.co.in",
                    customer_phone: "+91-9876543210",
                    created_at: "2025-07-02T12:30:00.000Z"
                },
                products: [
                    {
                        product_id: "p001",
                        product_name: "Solar Panel 300W",
                        product_unit_price: 5000,
                        invoice_item_quantity: 2
                    }
                ]
            }, {
                invoice_id: "inv-001",
                owner_company: "TechNova Pvt Ltd",
                customer_company: "Green Earth Solutions",
                invoice_number: "TN-2025-001",
                invoice_date: "2025-07-06T06:49:44.838Z",
                invoice_due_date: "2025-07-16T06:49:44.838Z",
                invoice_terms: "Net 10",
                invoice_place_of_supply: "Chennai, Tamil Nadu",
                invoice_notes: "Thank you for your business!",
                invoice_subtotal: 10000,
                invoice_total_cgst: 900,
                invoice_total_sgst: 900,
                invoice_total_igst: 0,
                invoice_total: 11800,
                created_at: "2025-07-06T06:49:44.838Z",
                invoice_by: {
                    company_id: "c001",
                    company_owner: "u123",
                    company_name: "TechNova Pvt Ltd",
                    company_address: "Plot 12, Phase 3, IT Park, Chennai",
                    company_gstin: "33AABCT1234F1Z5",
                    company_msme: "TN1234567",
                    company_email: "contact@technova.in",
                    company_bank_account_no: "123456789012",
                    company_bank_name: "HDFC Bank",
                    company_account_holder: "TechNova Pvt Ltd",
                    company_branch: "Velachery Branch",
                    company_ifsc_code: "HDFC0000123",
                    created_at: "2025-07-01T10:00:00.000Z"
                },
                client: {
                    customer_id: "cust001",
                    customer_to: "u456",
                    customer_name: "Green Earth Solutions",
                    customer_address_line1: "15 Green Street",
                    customer_address_line2: "Industrial Area",
                    customer_city: "Coimbatore",
                    customer_state: "Tamil Nadu",
                    customer_postal_code: "641001",
                    customer_country: "India",
                    customer_gstin: "33AAACG1234F1Z7",
                    customer_email: "accounts@greenearth.co.in",
                    customer_phone: "+91-9876543210",
                    created_at: "2025-07-02T12:30:00.000Z"
                },
                products: [
                    {
                        product_id: "p001",
                        product_name: "Solar Panel 300W",
                        product_unit_price: 5000,
                        invoice_item_quantity: 2
                    }
                ]
            }, {
                invoice_id: "inv-001",
                owner_company: "TechNova Pvt Ltd",
                customer_company: "Green Earth Solutions",
                invoice_number: "TN-2025-001",
                invoice_date: "2025-07-06T06:49:44.838Z",
                invoice_due_date: "2025-07-16T06:49:44.838Z",
                invoice_terms: "Net 10",
                invoice_place_of_supply: "Chennai, Tamil Nadu",
                invoice_notes: "Thank you for your business!",
                invoice_subtotal: 10000,
                invoice_total_cgst: 900,
                invoice_total_sgst: 900,
                invoice_total_igst: 0,
                invoice_total: 11800,
                created_at: "2025-07-06T06:49:44.838Z",
                invoice_by: {
                    company_id: "c001",
                    company_owner: "u123",
                    company_name: "TechNova Pvt Ltd",
                    company_address: "Plot 12, Phase 3, IT Park, Chennai",
                    company_gstin: "33AABCT1234F1Z5",
                    company_msme: "TN1234567",
                    company_email: "contact@technova.in",
                    company_bank_account_no: "123456789012",
                    company_bank_name: "HDFC Bank",
                    company_account_holder: "TechNova Pvt Ltd",
                    company_branch: "Velachery Branch",
                    company_ifsc_code: "HDFC0000123",
                    created_at: "2025-07-01T10:00:00.000Z"
                },
                client: {
                    customer_id: "cust001",
                    customer_to: "u456",
                    customer_name: "Green Earth Solutions",
                    customer_address_line1: "15 Green Street",
                    customer_address_line2: "Industrial Area",
                    customer_city: "Coimbatore",
                    customer_state: "Tamil Nadu",
                    customer_postal_code: "641001",
                    customer_country: "India",
                    customer_gstin: "33AAACG1234F1Z7",
                    customer_email: "accounts@greenearth.co.in",
                    customer_phone: "+91-9876543210",
                    created_at: "2025-07-02T12:30:00.000Z"
                },
                products: [
                    {
                        product_id: "p001",
                        product_name: "Solar Panel 300W",
                        product_unit_price: 5000,
                        invoice_item_quantity: 2
                    }
                ]
            }])
        }
    }

    useEffect(() => {
        fetchInvoices();
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
            yourCustomers, setYourCustomers, fetchCustomers,
            yourInvoices, setYourInvoices, fetchInvoices
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
