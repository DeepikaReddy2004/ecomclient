import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../products.css'
import { SAMPLE_PRODUCTS } from '../sampleData'

function Home() {
  const [product, setproduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [error, setError] = useState(null)

  const BACKEND_API = import.meta.env.VITE_BACKEND_API || 'http://localhost:3000'

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`${BACKEND_API}/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        setproduct(Array.isArray(result) ? result : [])
      } catch (error) {
        console.warn('Backend unavailable, using sample products:', error)
        setError('Backend unavailable - showing sample products')
        setproduct(SAMPLE_PRODUCTS)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [BACKEND_API])

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    )
  }

  const addToCart = (product) => {
    setCart(prev => [...prev, product])
    alert(`✓ ${product.title} added to cart!`)
  }

  return (
    <section className="products-section">
      <div className="hero-section">
        <div className="hero-content">
          <h1>🛍️ Welcome to AZONMART</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">
              Manage Products
            </Link>
            <Link to="/ai-chat" className="btn btn-secondary">
              🤖 Ask AI Assistant
            </Link>
          </div>
        </div>
      </div>

      <div className="products-header">
        <h2>Featured Products</h2>
        <p>Discover our curated collection of premium items</p>
      </div>

      {error && (
        <div className="alert alert-info" style={{ margin: '20px 0', textAlign: 'center' }}>
          ℹ️ {error}
        </div>
      )}

      {loading ? (
        <div className="products-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="product-skeleton"></div>
          ))}
        </div>
      ) : product.length > 0 ? (
        <div className="products-grid">
          {product.map((p) => (
            <div key={p._id} className="product-card">
              <div className="product-image-container">
                <img 
                  className="product-image"
                  src={p.image} 
                  alt={p.title}
                />
                <div className="product-badge">
                  <span>⭐ New</span>
                </div>
                <button 
                  className={`favorite-btn ${favorites.includes(p._id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(p._id)}
                >
                  {favorites.includes(p._id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div className="product-info">
                <h3 className="product-title">{p.title}</h3>
                <div className="product-rating">
                  <span>★★★★★</span> (128 reviews)
                </div>
                <div className="product-price">
                  <span className="price">${p.price}</span>
                  <span className="discount">-15%</span>
                </div>
                <div className="product-buttons">
                  <button 
                    className="btn btn-primary btn-full"
                    onClick={() => addToCart(p)}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>📭 No Products Found</h2>
          <p>We're working on adding more products. Please check back soon!</p>
        </div>
      )}

      <div className="features-section">
        <div className="feature-item">
          <div className="feature-icon">🚚</div>
          <h3>Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">💯</div>
          <h3>100% Authentic</h3>
          <p>Guaranteed quality products</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">↩️</div>
          <h3>Easy Returns</h3>
          <p>30-day money back guarantee</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🎧</div>
          <h3>24/7 Support</h3>
          <p>Dedicated customer service</p>
        </div>
      </div>
    </section>
  )
}

export default Home
