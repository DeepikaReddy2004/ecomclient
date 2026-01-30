import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../pages.css'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [rememberMe, setRememberMe] = useState(false)

  const BACKEND_API = import.meta.env.VITE_BACKEND_API || 'http://localhost:3000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      setMessage({ type: 'danger', text: 'Please fill in all fields' })
      return
    }

    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await fetch(`${BACKEND_API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.token) {
        setMessage({ type: 'success', text: '✓ Login successful! Redirecting...' })
        localStorage.setItem('token', data.token)
        localStorage.setItem('email', formData.email)
        if (rememberMe) {
          localStorage.setItem('rememberEmail', formData.email)
        }
        setTimeout(() => navigate('/'), 1500)
      } else {
        setMessage({ type: 'danger', text: data.msg || 'Login failed - Invalid credentials' })
      }
    } catch (error) {
      console.error('Login error:', error)
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
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue shopping</p>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              name="email"
              className="form-input"
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              name="password"
              className="form-input"
              placeholder="Enter your password" 
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-remember">
            <input 
              type="checkbox" 
              id="remember" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={loading}
            />
            <label htmlFor="remember">Remember me</label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? '🔄 Logging in...' : '✓ Sign In'}
          </button>
        </form>

        <div className="auth-divider">or</div>

        <div className="auth-alternatives">
          <button className="btn btn-outline btn-block">
            Continue with Google
          </button>
          <button className="btn btn-outline btn-block">
            Continue with GitHub
          </button>
        </div>

        <p className="auth-footer">
          Don't have an account? <a href="/signup" className="auth-link">Sign up here</a>
        </p>
      </div>

      <div className="auth-illustration">
        <div className="illustration-circle"></div>
        <div className="illustration-text">
          <h2>Shop with Confidence</h2>
          <p>Access your personalized shopping experience</p>
        </div>
      </div>
    </div>
  )
}

export default Login
