import Quoationpage from './quoation.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Login.js';
import { useState, useEffect } from 'react';
import ProductTable from './Products/ProductTable.js';
import QuotationTable from './Quotations/QuationTable.js';
import Navbar from './Navbar/Navbar.js';

function App() {
  // Initialize the state with localStorage value
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  // Check if user is logged in on mount (useEffect ensures that it's run only on initial load)
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('loggedIn') === 'true';
    if (storedLoginStatus) {
      setLoggedIn(true);
    }
  }, []);

  // Function to handle login validation
  const checkLogin = (username, password) => {
    if (username === 'a' && password === '123') {
      setLoggedIn(true);
      localStorage.setItem('loggedIn', 'true');  // Persist login state in localStorage
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');  // Remove login state from localStorage
  };

  return (
    <>
      {loggedIn && <Navbar onLogout={handleLogout} />} {/* Render Navbar if logged in */}
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage setLoggedIn={checkLogin} />} />
          <Route path="/quotation" element={loggedIn ? (<Quoationpage />) : (<Navigate to='/' />)} />
          <Route path="/products" element={loggedIn ? (<ProductTable />) : (<Navigate to='/' />)} />
          <Route path="/quotations" element={loggedIn ? (<QuotationTable />) : (<Navigate to='/' />)} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
