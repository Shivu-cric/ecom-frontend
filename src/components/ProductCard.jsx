import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    // Check if product is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setIsInWishlist(wishlist.some(item => item.id === product.id));
  }, [product.id]);

  const handleProductClick = () => {
    // Save current category/search state in URL
    const currentPath = `${location.pathname}${location.search}`;
    navigate(`/product/${product.id}`, { state: { from: currentPath } });
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter(item => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
    } else {
      // Add to wishlist
      const updatedWishlist = [...wishlist, product];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(true);
    }

    // Trigger storage event for header to update wishlist count
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsAddingToCart(true);

    try {
      // Get existing cart items
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

      // Show success feedback
      setTimeout(() => {
        setIsAddingToCart(false);
        navigate('/cart');
      }, 500);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAddingToCart(false);
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.round(rating));
  };

  return (
    <div className="product-card" onClick={handleProductClick}>
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
        <button 
          className={`wishlist-button ${isInWishlist ? 'active' : ''}`} 
          onClick={handleWishlistClick}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isInWishlist ? '❤️' : '♡'}
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">
          <span>{renderStars(product.rating.rate)}</span>
          <span className="rating-count">({product.rating.count})</span>
        </div>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button 
          className={`add-to-cart-btn ${isAddingToCart ? 'adding' : ''}`}
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? 'Adding...' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
