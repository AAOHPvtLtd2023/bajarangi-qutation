import React from 'react';
import './Navbar.css'; // Add your styles here

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href='/products'>
                    <button className="navbar-button">Products</button>
                </a>
                <a href='quotations'>
                    <button className="navbar-button">Quotations</button>
                </a>
            </div>
            <div className="navbar-right">
                <a href='/quotation'>
                    <span className="company-name">Bajarangi Industries</span>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
