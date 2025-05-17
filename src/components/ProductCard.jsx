import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Check if product is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setIsInWishlist(wishlist.some(item => item.id === product.id));
  }, [product.id]);

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
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
        </div>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button 
          className="add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation();
            // Add to cart logic here
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
