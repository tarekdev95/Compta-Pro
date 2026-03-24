import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import BusinessDashboard from './components/BusinessDashboard';
import Invoices from './components/Invoices';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/business-dashboard" element={<BusinessDashboard />} />
          <Route path="/invoices" element={<Invoices />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;