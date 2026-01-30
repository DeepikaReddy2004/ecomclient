import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'

function Header() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    navigate('/login')
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-section">
          <div className="logo-icon">🛍️</div>
          <div className="logo-text">AZONMART</div>
        </Link>
        
        <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/ai-chat" className="nav-link">🤖 AI Chat</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/support" className="nav-link">Support</Link>
        </nav>

        <div className="header-actions">
          {token ? (
            <div className="auth-buttons">
              <span className="user-badge">👤 Logged In</span>
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <button 
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header