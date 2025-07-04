// import { useEffect } from 'react'
// import { api } from './API/api';
import './App.css'
import { DataProvider } from './context/DataContest';
import Layout from './layout/Layout';


function App() {


  // useEffect(() => {

  //   const fetch = async () => {
  //     const res = await api.get("companies");
  //     console.log(res.data);
  //   }

  //   fetch();
  // }
  //   , []);

  return (

    <DataProvider>
     <Layout/>
    </DataProvider>
  )
}

export default App;
