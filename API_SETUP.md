# 🔧 API CONFIGURATION & SETUP GUIDE

## ✅ What's Been Implemented

### ✓ Sample Products
The frontend now includes **12 high-quality sample products** with real Unsplash images:
- Premium Wireless Headphones ($149.99)
- Smart Watch Pro ($299.99)
- Vintage Camera ($599.99)
- 4K Webcam ($189.99)
- Mechanical Keyboard RGB ($129.99)
- Portable Power Bank 20000mAh ($39.99)
- Premium Leather Wallet ($79.99)
- Portable Bluetooth Speaker ($89.99)
- USB-C Hub Multi-port ($49.99)
- Minimalist Phone Stand ($24.99)
- Professional Microphone ($199.99)
- Wireless Charging Pad ($34.99)

**Automatic Fallback:** If backend is offline, products display automatically!

### ✓ API Error Handling
All pages now have robust error handling:
- **Login/Signup**: Clear error messages for connection failures
- **Products**: Fallback to sample data if backend unavailable
- **AI Chat**: Graceful error handling with helpful messages
- **Dashboard**: Warning when offline with read-only mode

### ✓ Environment Variables
```
VITE_BACKEND_API=http://localhost:3000
```
Create `.env` file in root directory with this value.

---

## 🚀 Getting Started

### Step 1: Start Backend Server
```bash
# Terminal 1 - Backend
node server.js
# Expected: "Server running on port 3000"
```

### Step 2: Start Frontend
```bash
# Terminal 2 - Frontend
npm run dev
# Expected: "Local: http://localhost:5173/"
```

### Step 3: Test the App
1. Open http://localhost:5173
2. You should see products immediately
3. Try signup → login → browse products

---

## 📡 API Endpoints Reference

### Health Check
```
GET /status
Response: { msg: "Server is running" }
```

### Authentication
```
POST /register
Body: { username, email, password, role }
Response: { _id, username, email, role, msg }

POST /login
Body: { email, password }
Response: { token, email, msg }
```

### Products Management
```
GET /products
Response: [{ _id, title, image, price, description, stock }]

POST /products
Headers: Authorization: Bearer {token}
Body: { title, image, price }
Response: { _id, title, image, price, msg }

PUT /products/:id
Headers: Authorization: Bearer {token}
Body: { title, image, price }
Response: { msg: "Product updated" }

DELETE /products/:id
Headers: Authorization: Bearer {token}
Response: { msg: "Product deleted" }
```

### AI Chat
```
POST /aichat
Body: { prompt: "your question" }
Response: { text: "AI response" }
```

---

## ✅ Testing Checklist

### Step 1: Frontend Loads
- [ ] http://localhost:5173 loads
- [ ] Products display (sample or backend)
- [ ] No console errors

### Step 2: Backend Connection
- [ ] Backend running on port 3000
- [ ] No "connection refused" errors
- [ ] API status shows "Connected" (after backend starts)

### Step 3: Authentication Flow
- [ ] Signup page works
- [ ] Can create account with test credentials
- [ ] Login page works
- [ ] Can login with created account
- [ ] Token stored in localStorage

### Step 4: Product Features
- [ ] Products display with images
- [ ] Can favorite products (❤️)
- [ ] Can add to cart
- [ ] Product Dashboard loads
- [ ] Can add new products (if logged in as seller)

### Step 5: AI Chat
- [ ] AI Chat page loads
- [ ] Can send messages
- [ ] AI responds (if backend available)
- [ ] Graceful error if backend offline

### Step 6: Responsive Design
- [ ] Works on desktop (1920px)
- [ ] Works on tablet (768px)
- [ ] Works on mobile (375px)

---

## 🔐 Credentials for Testing

### Test Account (Create New)
```
Signup:
- Username: testuser
- Email: test@example.com
- Password: password123
- Role: customer
- Accept Terms: ✓
```

### Then Login With:
```
Email: test@example.com
Password: password123
```

---

## ⚙️ Environment Setup

### Windows Setup
```bash
copy .env.example .env
# Edit .env with your backend URL
```

### Mac/Linux Setup
```bash
cp .env.example .env
# Edit .env with your backend URL
```

### .env File Contents
```
VITE_BACKEND_API=http://localhost:3000
```

---

## 🐛 Troubleshooting

### Products Not Showing
**Problem:** Products list is empty
**Solution:** 
1. Check backend is running: `node server.js`
2. Check .env file has correct API URL
3. Check backend logs for errors
4. Frontend will show sample products if backend is offline

### Cannot Login
**Problem:** Login fails with "Cannot connect to backend"
**Solution:**
1. Check backend URL in .env
2. Verify backend is running on port 3000
3. Check firewall settings
4. Try http://localhost:3000/status in browser

### AI Chat Not Working
**Problem:** AI Chat shows connection error
**Solution:**
1. Ensure backend has Gemini API key configured
2. Check backend logs for API errors
3. Verify internet connection (Gemini needs it)
4. Try reloading the page

### Styles Not Loading
**Problem:** Page looks broken/unstyled
**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart dev server (Ctrl+C then `npm run dev`)
3. Check console for CSS errors
4. Verify all .css files exist in src/

### Port Already in Use
**Problem:** "Port 5173 already in use"
**Solution:**
```bash
# Kill process on port 5173
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

---

## 📊 Sample Data Locations

### Products Data
File: `src/sampleData.js`
```javascript
export const SAMPLE_PRODUCTS = [
  { _id: '1', title: '...', price: 149.99, image: '...' },
  ...
]
```

### Where It's Used
- `Home.jsx` - Homepage products
- `ProductsDashboard.jsx` - Admin panel fallback
- Automatic fallback when backend unavailable

---

## 🔄 API Flow Diagrams

### Authentication Flow
```
User → Signup Form
       ↓
    POST /register
       ↓
Backend → Creates User + Returns ID
       ↓
   Redirect → Login
       ↓
    POST /login
       ↓
Backend → Returns JWT Token
       ↓
   Store in localStorage
       ↓
   Access Protected Routes ✓
```

### Products Flow
```
Home Page → GET /products
           ↓
        Response OK?
           ├─ YES → Display Products
           └─ NO → Show Sample Products
```

### Admin Flow
```
Logged In As Seller
       ↓
Navigate → /products
       ↓
Can Add/Edit/Delete (if backend available)
       ↓
API Calls with Bearer Token
       ↓
Success → Update UI
Fail → Show Error Message
```

---

## 🎯 Quick Commands

```bash
# Start everything
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run lint

# Check backend connection
curl http://localhost:3000/status

# View logs
npm run dev -- --clearScreen
```

---

## 📝 Response Examples

### Successful Product Fetch
```json
[
  {
    "_id": "1",
    "title": "Premium Wireless Headphones",
    "price": 149.99,
    "image": "https://...",
    "description": "High-quality wireless headphones",
    "stock": 15
  }
]
```

### Successful Login
```json
{
  "token": "eyJhbGc...",
  "email": "test@example.com",
  "msg": "Login successful"
}
```

### Error Response
```json
{
  "msg": "Invalid credentials",
  "error": "Email not found"
}
```

---

## 🎓 API Integration Best Practices

✅ **Implemented in Frontend:**
- Error boundaries for failed API calls
- Fallback to sample data
- Loading states during API calls
- Proper error messages to users
- Authorization headers for protected routes
- Try-catch blocks for network errors
- Timeout handling
- Automatic retries (consider adding)

✅ **Headers Used:**
```javascript
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {token}' // For protected routes
}
```

---

## 🔒 Security Notes

⚠️ **Token Storage:**
- JWT stored in localStorage
- Automatically sent with protected API calls
- Cleared on logout

⚠️ **Password Security:**
- Minimum 6 characters required
- Password confirmation on signup
- Never logged or displayed

⚠️ **CORS (if needed):**
Add to backend:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
```

---

## ✨ Next Steps

1. **Start Backend:** `node server.js`
2. **Start Frontend:** `npm run dev`
3. **Test Signup:** Create new account
4. **Test Products:** View and manage products
5. **Test Chat:** Try AI assistant
6. **Deploy:** Build and deploy to production

---

## 📞 Support

If API calls are failing:

1. **Check Backend Logs:**
   ```bash
   # Look for connection errors
   node server.js
   ```

2. **Check Network Tab:**
   - Open DevTools (F12)
   - Go to Network tab
   - Look at failed requests
   - Check response headers

3. **Test Endpoint Directly:**
   ```bash
   curl http://localhost:3000/products
   ```

4. **Check Environment:**
   ```bash
   echo $VITE_BACKEND_API  # Should show API URL
   ```

---

**All API endpoints are now ready to use! 🚀**

Start the backend and frontend to see everything in action!
