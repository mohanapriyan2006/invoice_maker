
import './App.css'
import { DataProvider } from './context/DataContest';
import Layout from './layout/Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/next"

function App() {


  return (
    <Router>
      <DataProvider>
        <Layout />
      </DataProvider>
      <Analytics />
    </Router>
  )
}

export default App;
