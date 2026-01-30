import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import About from './Pages/About'
import Support from './Pages/Support'
import ProductsDashboard from './Pages/ProductsDashboard'
import AIChat from './Pages/AIChat'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/products" element={<ProductsDashboard />} />
            <Route path="/ai-chat" element={<AIChat />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App