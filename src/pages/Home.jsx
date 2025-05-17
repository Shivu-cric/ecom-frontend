import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";

const categories = [
  { name: "electronics", icon: "📱", color: "#4361ee", label: "Electronics" },
  { name: "clothing", icon: "👗", color: "#ff6b00", label: "Fashion" },
  { name: "jewelery", icon: "💍", color: "#ff006e", label: "Jewelry" },
  { name: "accessories", icon: "👜", color: "#8338ec", label: "Accessories" }
];

const testimonials = [
  {
    name: "Alice Smith",
    text: "Shopsy made my shopping experience so easy and fun! Fast delivery and great products.",
    avatar: "👩"
  },
  {
    name: "John Doe",
    text: "Excellent customer service and amazing deals. Highly recommended!",
    avatar: "👨"
  },
  {
    name: "Priya Patel",
    text: "I love the variety and quality. Will definitely shop again!",
    avatar: "👩"
  }
];

const benefits = [
  { icon: "🚚", text: "Free & Fast Shipping" },
  { icon: "🔄", text: "Easy Returns" },
  { icon: "💳", text: "Secure Payments" },
  { icon: "📞", text: "24/7 Support" }
];

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName}`);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Shopsy</h1>
          <p className="hero-subtitle">
            Your one-stop destination for modern shopping
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn primary-btn">
              Browse Products
            </Link>
            {!user && (
              <Link to="/signup" className="btn outline-btn">
                Create an Account
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.name}
              className="category-card"
              style={{ backgroundColor: `${category.color}11` }}
              onClick={() => handleCategoryClick(category.name)}
            >
              <span className="category-icon">{category.icon}</span>
              <h3 className="category-name">{category.label}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <span className="benefit-icon">{benefit.icon}</span>
              <p className="benefit-text">{benefit.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-avatar">{testimonial.avatar}</div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-name">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
