import React, { useContext } from 'react'
import SignUp from '../pages/login/signUp';
import { Routes, Route } from 'react-router-dom'
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

const Layout = () => {
    const { loginPage, width } = useContext(DataContext);

    return (
        <div className={`${width < 500 ? "-mt-2" : loginPage.isActive ? "" : "parent"} `}>

            <div className={`${loginPage.isActive ? "hidden" : "div1"} `}>
                <SideBar />
            </div>
            <div className="div2">
                <Header />

                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/companies' element={<Companies />} />
                    <Route path='/companyDetail/:id' element={<CompanyDetail />} />
                    <Route path='/companyForm' element={<CompanyForm />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/productForm' element={<ProductForm />} />
                    <Route path='/productsDetail/:id' element={<ProductDetail />} />
                    <Route path='/customers' element={<Customers />} />
                    <Route path='/customerForm' element={<CustomerForm />} />
                    <Route path='/customersDetail/:id' element={<CustomerDetail />} />
                </Routes>

            </div>

        </div>
    )
}

export default Layout