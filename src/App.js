import Quoationpage from './quoation.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Login.js';
import { useState } from 'react';



function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const checkLogin = (username, password) => {
    if (username === 'Bajarangi' && password === 'BI2014') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    // <Routes>
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage setLoggedIn={checkLogin} />} />
        <Route path="/quotation" element={loggedIn ? (<Quoationpage />)
          : (<Navigate to='/' />)}>
        </Route>

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
}

export default App;
