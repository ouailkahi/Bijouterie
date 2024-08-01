import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Main from './components/Main';

import AddOrder from './components/AddOrder';
import Categories from './components/Category/Categories';
import AllOrders from './components/AllOrders';
import Dashbord from './components/Dashbord/Dashbord';
import OrderDetail from './components/OrderDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Dashbord />} />
          <Route path="orders" element={<AllOrders />} />
          <Route path="orders/add" element={<AddOrder />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>
    </Router>
  );
}
