import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../pages.css'

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [agreeTerms, setAgreeTerms] = useState(false)

  const BACKEND_API = import.meta.env.VITE_BACKEND_API || 'http://localhost:3000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password) {
      setMessage({ type: 'danger', text: 'Please fill in all fields' })
      return false
    }
    if (formData.password.length < 6) {
      setMessage({ type: 'danger', text: 'Password must be at least 6 characters' })
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'danger', text: 'Passwords do not match' })
      return false
    }
    if (!agreeTerms) {
      setMessage({ type: 'danger', text: 'Please agree to terms and conditions' })
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await fetch(`${BACKEND_API}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.msg === 'REGISTRATION SUCCESSFULL' || data._id) {
        setMessage({ type: 'success', text: '✓ Registration successful! Redirecting to login...' })
        setTimeout(() => navigate('/login'), 1500)
      } else {
        setMessage({ type: 'danger', text: data.msg || 'Registration failed' })
      }
    } catch (error) {
      console.error('Signup error:', error)
      if (error.message.includes('Failed to fetch')) {
        setMessage({ type: 'danger', text: '❌ Cannot connect to backend. Check if server is running.' })
      } else {
        setMessage({ type: 'danger', text: 'Network error. Please try again.' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join our community and start shopping today</p>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              name="username"
              className="form-input"
              placeholder="Enter your full name" 
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              name="email"
              className="form-input"
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Account Type</label>
            <select 
              name="role"
              className="form-input"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              name="password"
              className="form-input"
              placeholder="Create a password" 
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              className="form-input"
              placeholder="Confirm your password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-checkbox">
            <input 
              type="checkbox" 
              id="terms" 
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              disabled={loading}
            />
            <label htmlFor="terms">
              I agree to the <a href="#" className="link">Terms of Service</a> and <a href="#" className="link">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading || !agreeTerms}>
            {loading ? '🔄 Creating Account...' : '✓ Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <a href="/login" className="auth-link">Sign in here</a>
        </p>
      </div>

      <div className="auth-illustration">
        <div className="illustration-circle" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' }}></div>
        <div className="illustration-text">
          <h2>Join Our Community</h2>
          <p>Become a part of millions of happy shoppers</p>
        </div>
      </div>
    </div>
  )
}

export default Signup