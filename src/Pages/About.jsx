import React from 'react'
import '../pages.css'

function About() {
  return (
    <div className="page-container">
      <section className="about-section">
        <div className="container">
          <div className="about-header">
            <h1>About AZONMART</h1>
            <p>Your trusted online shopping destination</p>
          </div>

          <div className="about-grid">
            <div className="about-content">
              <h2>Welcome to AZONMART</h2>
              <p>
                Founded in 2024, AZONMART is dedicated to providing customers with the best online shopping experience. 
                We believe in quality, affordability, and exceptional customer service.
              </p>
              <p>
                Our mission is to make premium products accessible to everyone by offering competitive prices and a 
                wide selection of items across multiple categories.
              </p>
              <p>
                We partner with trusted sellers and verify all products to ensure authenticity and quality. 
                Your satisfaction is our top priority.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">1M+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Products</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">99%</div>
                <div className="stat-label">Satisfaction</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </div>

          <div className="values-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">🎯</div>
                <h3>Quality First</h3>
                <p>We maintain the highest standards for all products</p>
              </div>
              <div className="value-card">
                <div className="value-icon">💰</div>
                <h3>Best Prices</h3>
                <p>Competitive pricing without compromising quality</p>
              </div>
              <div className="value-card">
                <div className="value-icon">🤝</div>
                <h3>Customer Focused</h3>
                <p>Your satisfaction is our ultimate goal</p>
              </div>
              <div className="value-card">
                <div className="value-icon">🚀</div>
                <h3>Innovation</h3>
                <p>Continuously improving our services</p>
              </div>
            </div>
          </div>

          <div className="team-section">
            <h2>Why Choose Us?</h2>
            <ul className="benefits-list">
              <li>✓ 100% Original Products</li>
              <li>✓ Fastest Delivery</li>
              <li>✓ Secure Payments</li>
              <li>✓ Easy Returns</li>
              <li>✓ 24/7 Customer Support</li>
              <li>✓ Best Price Guarantee</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
