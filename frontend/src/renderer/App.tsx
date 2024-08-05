import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import '@mdi/font/css/materialdesignicons.min.css';
import AddOrder from './components/AddOrder';
import Categories from './components/Category/Categories';
import AllOrders from './components/AllOrders';
import Dashbord from './components/Dashbord/Dashbord';
import OrderDetail from './components/OrderDetail';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkApi = async () => {
      try {
        await axios.get('http://localhost:8080/commandes/total/daily'); // Replace with your API endpoint
        setLoading(false);
      } catch (error) {
        console.error('API check failed:', error);
      }
    };

    const intervalId = setInterval(() => {
      if (loading) {
        checkApi();
      } else {
        clearInterval(intervalId);
      }
    }, 2000); // Check every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [loading]);

  return (
    <Router>
        {loading ? (
          <div className="loading-container">
            <ReactLoading type="spin" color="#000" />
          </div>
        ) : (
          <Routes>

          <Route path="/" element={<Home />}>
            <Route path="/" element={<Dashbord />} />
            <Route path="orders" element={<AllOrders />} />
            <Route path="orders/add" element={<AddOrder />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="categories" element={<Categories />} />
          </Route>
          </Routes>

        )}
    </Router>
  );
}
