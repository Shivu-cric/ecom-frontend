import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        
        // Get category from URL query parameters
        const params = new URLSearchParams(location.search);
        const category = params.get('category');

        // Filter products if category is specified
        const filteredProducts = category
          ? data.filter(product => product.category.toLowerCase() === category.toLowerCase())
          : data;

        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    getProducts();
  }, [location.search]); // Re-fetch when URL parameters change

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="no-products">No products found in this category.</div>;
  }

  return (
    <div className="products-container">
      <div className="products-header">
        {/* Get category from URL and display as title */}
        <h1 className="products-title">
          {new URLSearchParams(location.search).get('category')
            ? `${new URLSearchParams(location.search).get('category').charAt(0).toUpperCase()}${new URLSearchParams(location.search).get('category').slice(1)} Products`
            : 'All Products'}
        </h1>
      </div>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
