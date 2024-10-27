//import logo from './logo.svg';
import './App.css';
import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <Router>
        <nav>
            <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> |
            <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
        </nav>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;
