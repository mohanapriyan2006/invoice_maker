import { useEffect } from 'react'
import { api } from './API/api';
import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/login/signUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';


function App() {

  useEffect(() => {

    const fetch = async () => {
      const res = await api.get("companies");
      console.log(res.data);
    }

    fetch();
  }
    , []);

  return (
    <>
      <Router>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>



      </Router>
    </>
  )
}

export default App
