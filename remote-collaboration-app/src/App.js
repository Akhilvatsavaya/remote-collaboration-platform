//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {

    const [user, setUser] = useState(null);

    useEffect(
        () => {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
            });
            return () => unsubscribe(); //Clean Up the listener on unmount
        }, []
    );

    const handleLogout = async() => {
        try{
            await signOut(auth);
            alert("You've been logged out successfully!");
        } catch(error){
            console.error("Logout Error: ", error);
        }
    };

  return (
    <Router>
        <nav>
            <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> |
            <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
            {user && <button onClick={handleLogout}>Logout</button>}
        </nav>
        <Routes>
            <Route path="/" element={<Home />} />
            {/* Conditional route for dashboard based on user authentication */}
                    {user ? (
                      <Route path="/dashboard" element={<Dashboard />} />
                    ) : (
                      <Route path="/dashboard" element={<Navigate to="/login" replace />} />
                    )}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;
