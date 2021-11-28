import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Quests from './pages/Quests';
import OrderItem from './pages/OrderItem';
import AllQuests from './pages/AllQuests';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/quests" element={<AllQuests />} />
          <Route path="/quests/:id" element={<Quests />} />
          <Route path="/orders/:id" element={<OrderItem />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
