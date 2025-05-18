import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Wishlist.css';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(items);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setWishlistItems(updatedWishlist);
    // Trigger storage event for header to update wishlist count
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({
        ...product,
        quantity: 1
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    removeFromWishlist(product.id);
    navigate('/cart');
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="wishlist-container">
      <Link to="/products" className="back-to-products">
        <FaArrowLeft /> Back to Products
      </Link>
      
      <h1>My Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-wishlist-icon">❤️</div>
          <p>Your wishlist is empty</p>
          <button onClick={() => navigate('/products')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map(item => (
            <div key={item.id} className="wishlist-item">
              <div className="wishlist-item-image" onClick={() => handleProductClick(item.id)}>
                <img src={item.image} alt={item.title} />
              </div>
              <div className="wishlist-item-details">
                <h3 onClick={() => handleProductClick(item.id)}>{item.title}</h3>
                <div className="wishlist-item-price">${item.price}</div>
                <div className="wishlist-item-rating">
                  <span className="stars">{'⭐'.repeat(Math.round(item.rating.rate))}</span>
                  <span className="rating-count">({item.rating.count} reviews)</span>
                </div>
                <div className="wishlist-item-actions">
                  <button 
                    className="move-to-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    Move to Cart
                  </button>
                  <button 
                    className="remove-from-wishlist-btn"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist; 