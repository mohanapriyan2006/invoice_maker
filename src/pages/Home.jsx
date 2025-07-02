import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
     const navigate = useNavigate();
  return (
    <div className='place-items-center place-content-center h-100'>
        <h1>Home</h1>
        <button className='px-5 btn-1' onClick={() => navigate('/login')}>Login</button>
    </div>
  )
}

export default Home;