import React, { useContext } from 'react'
import SignUp from '../pages/login/signUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import DataContext from '../context/DataContest';
import Login from '../pages/login/login';

const Layout = () => {
  const {loginPage} = useContext(DataContext);

    return (
        <div className={`${loginPage.isActive ? "" : "parent"} `}>

            <div className={`${loginPage.isActive ? "hidden" : "div1"} `}>
                <SideBar />
            </div>
            <div className="div2">
                <Router>
                    <Header/>

                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<SignUp />} />
                    </Routes>

                </Router>
            </div>

        </div>
    )
}

export default Layout