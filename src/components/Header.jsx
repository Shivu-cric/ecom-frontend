import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";
import { FaShoppingCart, FaHeart, FaUserCircle, FaSearch, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate scroll progress
      const progress = (currentScrollY / scrollHeight) * 100;
      setScrollProgress(progress);

      // Add scrolled class when page is scrolled
      if (currentScrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add scroll event listener with throttling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : 'transparent'}`}>
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="logo">
              Shopsy
            </Link>
          </div>
          <div className="search-container">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <FaSearch />
              </button>
            </form>
          </div>
          <div className="user-section">
            {user ? (
              <div className="user-menu">
                <FaUserCircle className="user-icon" />
                <span className="user-email">{user.email}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="auth-btn login">
                  <FaSignInAlt /> Login
                </Link>
                <Link to="/signup" className="auth-btn signup">
                  <FaUserPlus /> Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <div 
        className="scroll-progress" 
        style={{ 
          width: `${scrollProgress}%`,
          transition: 'width 0.1s ease-out'
        }}
      />
    </>
  );
};

export default Header;
