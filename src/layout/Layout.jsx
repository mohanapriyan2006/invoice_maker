import React, { useContext } from 'react'
import SignUp from '../pages/login/signUp';
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import DataContext from '../context/DataContest';
import Login from '../pages/login/login';
import Companies from '../pages/Companies';
import CompanyForm from '../components/CompanyForm';
import CompanyDetail from '../components/CompanyDetail';
import Products from '../pages/Products';
import ProductForm from '../components/ProductsForm';
import ProductDetail from '../components/ProductsDetail';
import Customers from '../pages/Customers';
import CustomerForm from '../components/CustomerForm';
import CustomerDetail from '../components/CustomerDetail';
import Invoices from '../pages/Invoices';
import InvoiceForm from '../components/InvoiceForm';
import InvoiceDetail from '../components/InvoiceDetials';
import ChangePassword from '../pages/login/ChangePassword';
import NotFound from '../pages/NotFound';
import AIChatBox from '../components/AIChatBox';
import AIButton from '../components/AIButton';

const Layout = () => {
    const { loginPage, width, isAIActive } = useContext(DataContext);

    const location = useLocation();

    return (
        <div className={`${width < 500 ? "-mt-2" : loginPage.isActive ? "" : "parent"} `}>

            <div className={`${loginPage.isActive ? "hidden" : "div1"} `}>
                <SideBar />
            </div>
            <div className="div2 relative">
                <Header />
                
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/' element={<Login />} />
                    <Route path='/changePassword' element={<ChangePassword />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/companies' element={<Companies />} />
                    <Route path='/companyDetail/:id' element={<CompanyDetail />} />
                    <Route path='/companyForm' element={<CompanyForm />} />
                    <Route path='/companyForm/:id' element={<CompanyForm editMode={true} />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/productForm' element={<ProductForm />} />
                    <Route path='/productForm/:id' element={<ProductForm editMode={true} />} />
                    <Route path='/productsDetail/:id' element={<ProductDetail />} />
                    <Route path='/customers' element={<Customers />} />
                    <Route path='/customerForm' element={<CustomerForm />} />
                    <Route path='/customerForm/:id' element={<CustomerForm editMode={true} />} />
                    <Route path='/customersDetail/:id' element={<CustomerDetail />} />
                    <Route path='/invoices' element={<Invoices />} />
                    <Route path='/invoiceForm' element={<InvoiceForm />} />
                    <Route path='/invoiceForm/:id' element={<InvoiceForm editMode={true} />} />
                    <Route path='/invoiceDetail/:id' element={<InvoiceDetail />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                {isAIActive && <AIChatBox />}
                {!['/home','/','/signup','/changePassword'].find(val => val === location.pathname) && <AIButton />}

            </div>

        </div>
    )
}

export default Layout;