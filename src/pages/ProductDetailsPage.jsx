import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./ProductDetailsPage.css";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    try {
      const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const existingItemIndex = existingCartItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        existingCartItems[existingItemIndex].quantity += 1;
      } else {
        existingCartItems.push({
          ...product,
          quantity: 1
        });
      }
      
      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
      setAddedToCart(true);
      
      setTimeout(() => {
        setAddedToCart(false);
        navigate('/cart');
      }, 500);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleBack = () => {
    // Go back to the previous page if it exists in history
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate('/products');
    }
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-details-container">
      <button className="back-button" onClick={handleBack}>
        ← Back
      </button>
      
      <div className="product-details-content">
        <div className="product-details-left">
          <div className="product-details-image-container">
            <img src={product.image} alt={product.title} className="product-details-image" />
          </div>
        </div>

        <div className="product-details-right">
          <h1 className="product-details-title">{product.title}</h1>
          
          <div className="product-details-rating">
            <span className="stars">{'⭐'.repeat(Math.round(product.rating.rate))}</span>
            <span className="rating-text">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          <div className="product-details-price">
            <span className="price-label">Price:</span>
            <span className="price-amount">${product.price}</span>
          </div>

          <div className="product-details-description">
            <h3>Description:</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-details-category">
            <span className="category-label">Category:</span>
            <span className="category-value">{product.category}</span>
          </div>

          <div className="product-details-actions">
            <button 
              className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={addedToCart}
            >
              <span className="cart-icon">🛒</span>
              {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            <button 
              className="buy-now-btn"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
