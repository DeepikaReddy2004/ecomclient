import React, { useState, useRef, useEffect } from 'react'
import '../ai-chat.css'

function AIChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! 👋 I\'m your AI shopping assistant. How can I help you today?', sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiAvailable, setApiAvailable] = useState(true)
  const messagesEndRef = useRef(null)

  const BACKEND_API = import.meta.env.VITE_BACKEND_API || 'http://localhost:3000'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')

    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: userMessage,
      sender: 'user'
    }])

    setLoading(true)

    try {
      const response = await fetch(`${BACKEND_API}/aichat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: userMessage })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setApiAvailable(true)

      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: data.text || data.response || 'Sorry, I couldn\'t process that. Please try again.',
        sender: 'bot'
      }])
    } catch (error) {
      console.error('Chat error:', error)
      setApiAvailable(false)
      const errorMessage = error.message.includes('Failed to fetch') 
        ? '⚠️ Backend offline. Tip: Try asking shopping-related questions!' 
        : '❌ Connection error. Please try again later.'
      
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: errorMessage,
        sender: 'bot'
      }])

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-title">
          <h1>🤖 AI Shopping Assistant</h1>
          <p>Powered by Gemini AI</p>
        </div>
        <div className="chat-status">
          <span className="status-dot"></span>
          Online
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-avatar">
              {message.sender === 'user' ? '👤' : '🤖'}
            </div>
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="message bot">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-suggestions">
        <p>Quick prompts:</p>
        <div className="suggestion-buttons">
          <button className="suggestion-btn" onClick={() => setInput('Show me summer fashion trends')}>
            🕶️ Fashion Trends
          </button>
          <button className="suggestion-btn" onClick={() => setInput('What are the best deals today?')}>
            💰 Best Deals
          </button>
          <button className="suggestion-btn" onClick={() => setInput('How do I track my order?')}>
            📦 Track Order
          </button>
          <button className="suggestion-btn" onClick={() => setInput('What\'s new in electronics?')}>
            ⚡ Electronics
          </button>
        </div>
      </div>

      <form onSubmit={handleSend} className="chat-input-form">
        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="chat-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="btn btn-primary send-btn"
            disabled={!input.trim() || loading}
          >
            {loading ? '⏳' : '➤'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AIChat
