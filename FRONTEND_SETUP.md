# 🛍️ AZONMART - E-Commerce Frontend

A modern, beautiful, and fully-functional e-commerce frontend built with React and Vite. Features product management, AI-powered chat, user authentication, and more.

## 🌟 Features

### ✨ Modern UI/UX
- **Dark Theme**: Premium dark mode with vibrant gradients
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Elegant transitions and loading states
- **Intuitive Navigation**: Easy-to-use routing with React Router

### 🛒 E-Commerce Features
- **Product Browsing**: Browse and filter products
- **Product Management**: Add, edit, and delete products (admin dashboard)
- **Shopping Cart**: Add products to cart functionality
- **Favorites**: Mark products as favorites
- **Search**: Search products by title

### 👤 Authentication
- **User Registration**: Create new accounts with role selection (Customer/Seller)
- **User Login**: Secure login with JWT token
- **Remember Me**: Option to remember email
- **Token Management**: Automatic token storage

### 🤖 AI Integration
- **AI Chat Assistant**: Powered by Gemini AI
- **Smart Suggestions**: Quick suggestion buttons
- **Real-time Chat**: Instant messaging interface
- **Typing Indicators**: Visual feedback for AI responses

### 📞 Support & Information
- **FAQ Section**: Expandable FAQ with common questions
- **Contact Form**: Send support messages
- **About Page**: Company information and statistics
- **Support Page**: 24/7 customer support information

## 🚀 Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM
- **Styling**: Modern CSS with CSS variables
- **HTTP Client**: Fetch API
- **State Management**: React Hooks

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see setup below)

## 🔧 Setup Instructions

### 1. Clone & Install Dependencies

```bash
cd ecommorce-frontend-megha
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and set your backend API URL:

```
VITE_BACKEND_API=http://localhost:3000
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── Pages/
│   ├── Home.jsx              # Main product browsing page
│   ├── Login.jsx             # User login
│   ├── Signup.jsx            # User registration
│   ├── About.jsx             # About company
│   ├── Support.jsx           # Support & FAQ
│   ├── ProductsDashboard.jsx # Admin product management
│   └── AIChat.jsx            # AI chat interface
├── Header.jsx                # Navigation header
├── App.jsx                   # Main app component with routing
├── App.css                   # App styles
├── index.css                 # Global styles
├── pages.css                 # Page-specific styles
├── products.css              # Products page styles
├── header.css                # Header styles
├── products-dashboard.css    # Dashboard styles
├── ai-chat.css              # Chat styles
└── main.jsx                 # Entry point
```

## 🎨 Color Scheme

```css
Primary: #6366f1 (Indigo)
Secondary: #ec4899 (Pink)
Dark BG: #0f172a
Card BG: #1e293b
Text Primary: #f1f5f9
Text Secondary: #cbd5e1
```

## 📱 Key Pages

### Home (`/`)
- Hero section with quick actions
- Product grid with search and filtering
- Product cards with favorites
- Features section highlighting benefits

### Login (`/login`)
- Email and password fields
- Remember me checkbox
- Social login options (UI ready)
- Forgot password link

### Signup (`/signup`)
- Full registration form
- Role selection (Customer/Seller)
- Password confirmation
- Terms agreement checkbox

### Products Dashboard (`/products`)
- Admin-only product management
- Create, read, update, delete products
- Search functionality
- Beautiful product cards with images

### AI Chat (`/ai-chat`)
- Real-time chat interface
- Quick suggestion buttons
- Typing indicators
- Message history
- AI-powered responses

### About (`/about`)
- Company information
- Statistics cards
- Core values section
- Benefits list

### Support (`/support`)
- Expandable FAQ section
- Contact form
- Additional support information
- Multiple contact methods

## 🔌 API Integration

The frontend connects to the backend APIs:

```
POST   /register         - User registration
POST   /login            - User login
GET    /products         - Get all products
POST   /products         - Add new product
PUT    /products/:id     - Update product
DELETE /products/:id     - Delete product
POST   /aichat          - AI chat messages
GET    /status          - Health check
```

## 🛡️ Authentication

- JWT tokens stored in `localStorage`
- Protected routes based on token availability
- Automatic logout on token expiration
- Remember email feature with localStorage

## 🎯 Features in Detail

### Product Management
- Add products with title, image URL, and price
- Edit existing products
- Delete products with confirmation
- Search products by title

### AI Chat Features
- Send messages to AI
- Receive instant responses
- Quick suggestion buttons for common queries
- Message history in conversation
- Typing indicators

### Responsive Design
- Mobile-first approach
- Hamburger menu on small screens
- Touch-friendly buttons and inputs
- Optimized for all screen sizes

## 🔄 State Management

Uses React Hooks:
- `useState` for component state
- `useEffect` for side effects
- `useNavigate` for routing
- `useRef` for DOM references

## 🎬 Running Tests

```bash
npm run lint
```

## 🚢 Build for Production

```bash
npm run build
```

## 📦 Deployment

The built files are in `dist/` directory:

```bash
npm run preview
```

## 🐛 Troubleshooting

### Backend Connection Issues
- Verify backend is running on configured port
- Check `VITE_BACKEND_API` environment variable
- Look at browser console for detailed errors

### Styling Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Verify CSS files are loaded
- Check for conflicting CSS classes

### Authentication Issues
- Clear localStorage: `localStorage.clear()`
- Re-login with correct credentials
- Verify token is being stored

## 📝 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Feel free to submit pull requests or open issues for any improvements!

## 📄 License

MIT License - feel free to use this project!

## 📧 Support

For support, email: support@azonmart.com

---

**Made with ❤️ by Team AZONMART**
