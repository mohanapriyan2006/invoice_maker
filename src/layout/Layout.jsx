import React, { useContext } from 'react'
import SignUp from '../pages/login/SignUp';
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import DataContext from '../context/DataContest';
import Login from '../pages/login/Login';
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
import AboutPage from '../pages/About';
import TermsAndConditions from '../pages/Terms&Conditions';
import ProtectedRoute from '../hooks/ProtectedRoute';

const Layout = () => {
    const { loginPage, width, isAIActive } = useContext(DataContext);

    const location = useLocation();

    return (
        <div className={`${width < 1000 ? "-mt-2" : loginPage.isActive ? "" : "parent"} `}>

            <div className={`${loginPage.isActive ? "hidden" : "div1"} `}>
                <SideBar />
            </div>
            <div className="div2 relative">
                <Header />

                <Routes>
                    {/* Public Routes */}
                    <Route path='/' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />

                    {/* Protected Routes */}
                    <Route path='/changePassword' element={
                        <ProtectedRoute>
                            <ChangePassword />
                        </ProtectedRoute>
                    } />
                    <Route path='/home' element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } />
                    <Route path='/companies' element={
                        <ProtectedRoute>
                            <Companies />
                        </ProtectedRoute>
                    } />
                    <Route path='/companyDetail/:id' element={
                        <ProtectedRoute>
                            <CompanyDetail />
                        </ProtectedRoute>
                    } />
                    <Route path='/companyForm' element={
                        <ProtectedRoute>
                            <CompanyForm />
                        </ProtectedRoute>
                    } />
                    <Route path='/companyForm/:id' element={
                        <ProtectedRoute>
                            <CompanyForm editMode={true} />
                        </ProtectedRoute>
                    } />
                    <Route path='/products' element={
                        <ProtectedRoute>
                            <Products />
                        </ProtectedRoute>
                    } />
                    <Route path='/productForm' element={
                        <ProtectedRoute>
                            <ProductForm />
                        </ProtectedRoute>
                    } />
                    <Route path='/productForm/:id' element={
                        <ProtectedRoute>
                            <ProductForm editMode={true} />
                        </ProtectedRoute>
                    } />
                    <Route path='/productsDetail/:id' element={
                        <ProtectedRoute>
                            <ProductDetail />
                        </ProtectedRoute>
                    } />
                    <Route path='/customers' element={
                        <ProtectedRoute>
                            <Customers />
                        </ProtectedRoute>
                    } />
                    <Route path='/customerForm' element={
                        <ProtectedRoute>
                            <CustomerForm />
                        </ProtectedRoute>
                    } />
                    <Route path='/customerForm/:id' element={
                        <ProtectedRoute>
                            <CustomerForm editMode={true} />
                        </ProtectedRoute>
                    } />
                    <Route path='/customersDetail/:id' element={
                        <ProtectedRoute>
                            <CustomerDetail />
                        </ProtectedRoute>
                    } />
                    <Route path='/invoices' element={
                        <ProtectedRoute>
                            <Invoices />
                        </ProtectedRoute>
                    } />
                    <Route path='/invoiceForm' element={
                        <ProtectedRoute>
                            <InvoiceForm />
                        </ProtectedRoute>
                    } />
                    <Route path='/invoiceForm/:id' element={
                        <ProtectedRoute>
                            <InvoiceForm editMode={true} />
                        </ProtectedRoute>
                    } />
                    <Route path='/invoiceDetail/:id' element={
                        <ProtectedRoute>
                            <InvoiceDetail />
                        </ProtectedRoute>
                    } />
                    <Route path='/about' element={
                        <ProtectedRoute>
                            <AboutPage />
                        </ProtectedRoute>
                    } />
                    <Route path='/terms' element={
                        <ProtectedRoute>
                            <TermsAndConditions />
                        </ProtectedRoute>
                    } />
                    
                    {/* 404 Route */}
                    <Route path='*' element={<NotFound />} />
                </Routes>

                {!['/home', '/', '/signup', '/changePassword'].find(val => val === location.pathname) && isAIActive && <AIChatBox />}
                {!['/home', '/', '/signup', '/changePassword'].find(val => val === location.pathname) && <AIButton />}

            </div>

        </div>
    )
}

export default Layout;