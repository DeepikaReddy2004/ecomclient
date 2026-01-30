import React, { useState } from 'react'
import '../pages.css'

function Support() {
  const [openFAQ, setOpenFAQ] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const faqs = [
    {
      question: '❓ What is your return policy?',
      answer: 'We offer a 30-day return policy on most items. If you\'re not satisfied with your purchase, you can return it within 30 days for a full refund or exchange.'
    },
    {
      question: '🚚 How long does shipping take?',
      answer: 'Standard shipping typically takes 5-7 business days. Express shipping is available and usually arrives within 2-3 business days.'
    },
    {
      question: '🌍 Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.'
    },
    {
      question: '🔒 Is my payment information secure?',
      answer: 'Absolutely! We use industry-standard SSL encryption and PCI compliance to protect your payment information.'
    },
    {
      question: '📦 How can I track my order?',
      answer: 'You\'ll receive a tracking number via email once your order ships. You can use this number to track your package in real-time.'
    },
    {
      question: '💔 What if my product arrives damaged?',
      answer: 'We stand behind our products. If you receive a damaged item, contact our support team immediately with photos, and we\'ll send a replacement or issue a refund.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
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
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setMessage({ type: 'danger', text: 'Please fill in all fields' })
      return
    }

    setMessage({ type: 'success', text: '✓ Message sent! We\'ll get back to you soon.' })
    setFormData({ name: '', email: '', subject: '', message: '' })
    
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  return (
    <section className="support-section">
      <div className="container">
        <div className="support-header">
          <h1>🎧 Customer Support</h1>
          <p>We're here to help! Find answers to common questions or contact us directly</p>
        </div>

        <div className="faq-container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div 
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span className={`arrow ${openFAQ === index ? 'open' : ''}`}>▼</span>
                </div>
                <div className={`faq-answer ${openFAQ === index ? 'active' : ''}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-container">
          <div className="contact-form">
            <h2>Contact Us</h2>
            
            {message.text && (
              <div className={`alert alert-${message.type}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  className="form-input"
                  placeholder="Enter your full name" 
                  value={formData.name}
                  onChange={handleChange}
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
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  className="form-input"
                  placeholder="What is this about?" 
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea 
                  name="message"
                  className="form-input"
                  placeholder="Tell us how we can help..." 
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                ✉️ Send Message
              </button>
            </form>
          </div>

          <div className="contact-info">
            <h2>Other Ways to Reach Us</h2>
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>Email</h3>
              <p>support@azonmart.com</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📱</div>
              <h3>Phone</h3>
              <p>+1 (800) 123-4567</p>
            </div>
            <div className="info-card">
              <div className="info-icon">⏰</div>
              <h3>Hours</h3>
              <p>24/7 Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Support
