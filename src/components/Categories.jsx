import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Categories.css';

const Categories = ({ onSelectCategory, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(['all', ...data]); // Add 'all' as a category option
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Sync with URL parameters
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam && categoryParam !== selectedCategory) {
      onSelectCategory(categoryParam);
    }
  }, [location.search, selectedCategory, onSelectCategory]);

  const handleCategoryClick = (category) => {
    onSelectCategory(category);
    // Update URL with selected category
    if (category === 'all') {
      navigate('/products');
    } else {
      navigate(`/products?category=${category}`);
    }
  };

  if (loading) {
    return <div className="categories-loading">Loading categories...</div>;
  }

  return (
    <div className="categories-container">
      <h2 className="categories-title">Categories</h2>
      <div className="categories-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories; 