//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {

    const [user, setUser] = useState(null);

    useEffect(
        () => {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                console.log("Current user:", currentUser);
                setUser(currentUser);
            });
            return () => unsubscribe(); //Clean Up the listener on unmount
        }, []
    );

  return (
    <Router>
        <nav>
            <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> |
            <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
        </nav>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" replace />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;
