
import './App.css'
import { DataProvider } from './context/DataContest';
import Layout from './layout/Layout';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {


  return (
    <Router>
      <DataProvider>
        <Layout />
      </DataProvider>
    </Router>
  )
}

export default App;
