import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2 className="footer-brand">Shopsy</h2>
        </div>

        <div className="footer-bottom">
          <div className="footer-social">
            <a href="https://facebook.com" className="social-icon">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" className="social-icon">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" className="social-icon">
              <FaLinkedinIn />
            </a>
          </div>

          <div className="footer-copyright">
            <p>© 2025 Shopsy. All rights reserved.</p>
            <div className="footer-legal-links">
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms">Terms of Use</a>
              <a href="/sitemap">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
