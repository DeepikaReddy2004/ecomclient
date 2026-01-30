import React, { useState, useEffect } from 'react'
import '../products-dashboard.css'
import { SAMPLE_PRODUCTS } from '../sampleData'

function ProductsDashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [apiAvailable, setApiAvailable] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    price: ''
  })

  const BACKEND_API = import.meta.env.VITE_BACKEND_API || 'http://localhost:3000'
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BACKEND_API}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setProducts(Array.isArray(data) ? data : [])
      setApiAvailable(true)
      setMessage({ type: 'success', text: 'Connected to backend ✓' })
      setTimeout(() => setMessage({ type: '', text: '' }), 2000)
    } catch (error) {
      console.warn('Backend unavailable, using sample products:', error)
      setProducts(SAMPLE_PRODUCTS)
      setApiAvailable(false)
      setMessage({ type: 'warning', text: 'Using sample data - backend offline' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.image || !formData.price) {
      setMessage({ type: 'danger', text: 'Please fill all fields' })
      return
    }

    if (!apiAvailable) {
      setMessage({ type: 'warning', text: 'Backend offline - changes not saved' })
      return
    }

    try {
      const url = editingId 
        ? `${BACKEND_API}/products/${editingId}` 
        : `${BACKEND_API}/products`
      
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({
          title: formData.title,
          image: formData.image,
          price: parseFloat(formData.price)
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.msg || data._id) {
        setMessage({ type: 'success', text: editingId ? 'Product updated ✓' : 'Product added ✓' })
        setFormData({ title: '', image: '', price: '' })
        setEditingId(null)
        setShowForm(false)
        setTimeout(() => fetchProducts(), 500)
      }
    } catch (error) {
      setMessage({ type: 'danger', text: 'Operation failed - check backend connection' })
      console.error(error)
    }
  }

  const handleEdit = (product) => {
    setFormData(product)
    setEditingId(product._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`${BACKEND_API}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      setMessage({ type: 'success', text: 'Product deleted successfully' })
      fetchProducts()
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to delete product' })
    }
  }

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!token) {
    return (
      <div className="dashboard-container">
        <div className="alert alert-danger">
          Please login to manage products
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>📊 Product Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setFormData({ title: '', image: '', price: '' })
            setEditingId(null)
            setShowForm(!showForm)
          }}
        >
          {showForm ? '✕ Cancel' : '+ Add Product'}
        </button>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      {showForm && (
        <div className="form-card">
          <h2>{editingId ? '✏️ Edit Product' : '➕ Add New Product'}</h2>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label>Product Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                step="0.01"
                className="form-input"
              />
            </div>

            <button type="submit" className="btn btn-success">
              {editingId ? '💾 Update Product' : '✓ Add Product'}
            </button>
          </form>
        </div>
      )}

      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input"
        />
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-item">
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.title} />
                <div className="price-badge">${product.price}</div>
              </div>
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="text-secondary">{product.price.toFixed(2)}</p>
                <div className="product-actions">
                  <button 
                    className="btn btn-outline"
                    onClick={() => handleEdit(product)}
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No products found</h2>
          <p>Add your first product to get started</p>
        </div>
      )}
    </div>
  )
}

export default ProductsDashboard
