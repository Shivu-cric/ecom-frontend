import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";
import { FaShoppingCart, FaHeart, FaUserCircle, FaSearch } from 'react-icons/fa';

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
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

      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      // Add scrolled class for background effect
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    // Update wishlist count whenever localStorage changes
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlistCount(wishlist.length);
    };

    updateWishlistCount();
    window.addEventListener('storage', updateWishlistCount);
    return () => window.removeEventListener('storage', updateWishlistCount);
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
      <header className={`header ${hidden ? 'hidden' : ''} ${scrolled ? 'scrolled' : ''}`}>
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
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <FaSearch />
              </button>
            </form>
          </div>
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Shop</Link>
            
            {user ? (
              <>
                <Link to="/wishlist" className="wishlist-icon">
                  <FaHeart />
                  {wishlistCount > 0 && <span className="wishlist-count">{wishlistCount}</span>}
                </Link>
                <Link to="/cart" className="cart-icon">
                  <FaShoppingCart />
                </Link>
                <div className="user-menu">
                  <FaUserCircle className="user-icon" />
                  <span className="user-email">{user.email}</span>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="nav-link sign-up">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollProgress}%` }}
      />
    </>
  );
};

export default Header;
