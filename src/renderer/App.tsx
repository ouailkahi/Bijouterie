import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import Home from './components/Home';
import Main from './components/Main';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Main />} />
        </Route>
      </Routes>
    </Router>
  );
}
