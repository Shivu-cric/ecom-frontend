import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation-bar">
      <div className="nav-container">
        <div className="nav-buttons">
          <button 
            className={`nav-button ${isActive('/') ? 'active' : ''}`}
            onClick={() => navigate('/')}
          >
            🏠 Home
          </button>
          <button 
            className={`nav-button ${isActive('/products') ? 'active' : ''}`}
            onClick={() => navigate('/products')}
          >
            🛍️ All Products
          </button>
          <button 
            className={`nav-button ${isActive('/wishlist') ? 'active' : ''}`}
            onClick={() => navigate('/wishlist')}
          >
            ❤️ Wishlist
          </button>
          <button 
            className={`nav-button ${isActive('/cart') ? 'active' : ''}`}
            onClick={() => navigate('/cart')}
          >
            🛒 Cart
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar; 