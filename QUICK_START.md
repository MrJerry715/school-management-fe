# School Management System - Quick Start Guide

## 📋 Prerequisites
- Node.js v18+ and npm
- MongoDB (local or cloud - MongoDB Atlas)
- Angular CLI: `npm install -g @angular/cli`
- Git

## 🚀 Quick Setup (5 minutes)

### Frontend Setup

```bash
# 1. Navigate to project
cd d:\school-project\school-management-fe

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Open browser
# http://localhost:4200

# 5. Login page should appear
```

### Backend Setup

```bash
# 1. Create backend folder
mkdir ../school-management-backend
cd ../school-management-backend

# 2. Initialize Node project
npm init -y

# 3. Install dependencies
npm install express mongoose dotenv cors bcryptjs jsonwebtoken

# 4. Create .env
echo "PORT=3001
DB_URI=mongodb://localhost:27017/school-management
JWT_ACCESS_SECRET=your_secret_key_dev
JWT_REFRESH_SECRET=your_refresh_key_dev
JWT_ACCESS_EXPIRY=1h
JWT_REFRESH_EXPIRY=7d
NODE_ENV=development" > .env

# 5. Copy models, routes, middleware from BACKEND_SETUP_GUIDE.md

# 6. Create server.js and paste code from guide

# 7. Start server
npm run dev
```

## 🗄️ Database Setup

### Option 1: Local MongoDB
```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB
mongod

# Verify connection
mongo mongodb://localhost:27017/school-management
```

### Option 2: MongoDB Atlas (Cloud)
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Add to .env:
   DB_URI=mongodb+srv://username:password@cluster.mongodb.net/school-management?retryWrites=true&w=majority
```

## 📝 Test Credentials

After running backend setup script to create test data:

```
Admin:
- username: admin
- password: admin123

Teacher:
- username: teacher1
- password: teacher123

Parent:
- username: parent1
- password: parent123

Student:
- username: student1
- password: student123
```

## ✅ Verification Checklist

### Frontend
- [ ] `npm start` runs without errors
- [ ] Page loads at http://localhost:4200
- [ ] Login page visible
- [ ] Can see Material Design components
- [ ] Can see Tailwind styling

### Backend
- [ ] `npm run dev` starts server
- [ ] Server runs on http://localhost:3001
- [ ] MongoDB connected (check console)
- [ ] Health check: `curl http://localhost:3001/health`

### Integration
- [ ] From frontend, try to login
- [ ] Check browser Network tab for API calls
- [ ] Backend should receive request to `/api/auth/login`

## 🔧 Common Commands

### Frontend
```bash
npm start          # Start dev server (4200)
npm run build      # Production build
npm test           # Run tests
npm run test:watch # Watch mode testing
ng generate component pages/new-component  # Generate component
ng generate service services/new-service   # Generate service
```

### Backend
```bash
npm run dev        # Start with nodemon
npm start          # Start server
npm test           # Run tests
node scripts/seed.js  # Seed test data (create this)
```

## 🐛 Troubleshooting

### Problem: `ERR! code ENOENT` when npm install
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem: Port 4200 already in use
**Solution**:
```bash
ng serve --port 4300
```

### Problem: MongoDB connection refused
**Solution**:
```bash
# Check if MongoDB is running
# Windows: Services → MongoDB → Start
# macOS: brew services start mongodb-community
# Linux: sudo service mongod start
```

### Problem: CORS errors
**Solution**: Ensure backend has CORS middleware and correct origin:
```javascript
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
```

### Problem: Token expired errors
**Solution**: 
- Check JWT_ACCESS_EXPIRY is set to reasonable value (e.g., 1h)
- Token auto-refreshes 1 minute before expiry
- Backend token and frontend token expiry should match

### Problem: Cannot login
**Solution**:
1. Check backend is running on 3001
2. Check MongoDB is connected
3. Check credentials are correct
4. Look at browser Network tab for actual error
5. Check backend console for errors

## 📚 Project Structure Deep Dive

```
Frontend (Angular):
├── Login → Credentials sent to /api/auth/login
├── Receives JWT tokens + user data
├── Tokens stored in localStorage
├── User redirected to dashboard based on role
├── All API calls include Authorization header
└── Auto-refresh token 1 min before expiry

Backend (Node/Express):
├── POST /auth/login → Hash password + verify
├── Create JWT tokens (access + refresh)
├── Return user data + tokens
├── middleware/auth.js verifies tokens on protected routes
└── Routes check user role for authorization
```

## 🎯 Next Steps

### Phase 1: Basic Flow (1 hour)
1. ✅ Get frontend running
2. ✅ Get backend running
3. ✅ Test login endpoint
4. Start home page with role-based redirects

### Phase 2: Core Features (2-3 hours)
1. Create home component that redirects based on role
2. Create one feature component (e.g., student list)
3. Verify can fetch data from backend
4. Add loading/error handling

### Phase 3: Scale Features (Next hours/days)
1. Create remaining components
2. Implement all CRUD operations
3. Add validation
4. Add testing

### Phase 4: Polish (Final stages)
1. Error handling
2. Loading states
3. Responsive design
4. Performance optimization
5. Security hardening

## 💡 Development Tips

### 1. Use DevTools
```
Chrome: F12
Network tab: See all API calls
Storage: Check localStorage for tokens
Console: Check for errors
```

### 2. Test API directly with curl or Postman
```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Get token from response, then use it
TOKEN="eyJhbGc..."
curl -X GET http://localhost:3001/api/students \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Enable Debug Logging
```typescript
// In auth.service.ts
private debugLog(message: string, data?: any) {
  if (!environment.production) {
    console.log(`[AUTH] ${message}`, data);
  }
}
```

### 4. Check Role-Based Guards are Working
```html
<!-- In any template -->
<div *ngIf="(auth.user$ | async) as user">
  You are logged in as: {{ user.role }}
  <button *ngIf="user.role === 'admin'">Admin Only</button>
</div>
```

### 5. Monitor Token Refresh
```
Check browser localStorage:
1. Open DevTools → Application → Local Storage
2. Look for: user, accessToken, refreshToken, permissions
3. Token should auto-refresh before expiry
4. Check browser console for refresh messages
```

## 📖 Important Files to Understand

### Frontend
1. **app.routes.ts** - All routes and guards
2. **auth/auth.service.ts** - Authentication logic
3. **services/** - Data access services
4. **auth/models/user.model.ts** - Data structures

### Backend
1. **models/User.js** - User schema and password hashing
2. **routes/auth.js** - Login/register endpoints
3. **middleware/auth.js** - JWT verification
4. **server.js** - Express app setup

## 🔐 Security Notes

- ⚠️ Never commit .env with secrets
- ⚠️ Use HTTPS in production
- ⚠️ Enable CORS only for your domain
- ⚠️ Hash all passwords with bcrypt
- ⚠️ Use strong JWT secrets (min 32 chars)
- ⚠️ Add rate limiting to auth endpoints
- ⚠️ Validate all input on backend
- ⚠️ Use environment variables for secrets
- ⚠️ Add CSRF protection if using cookies
- ⚠️ Log security events

## 📞 Support Resources

- **Angular Docs**: https://angular.io/docs
- **MongoDB Docs**: https://docs.mongodb.com/
- **Express Docs**: https://expressjs.com/
- **JWT.io**: https://jwt.io/
- **Material Design**: https://material.angular.io/

## 🎓 Learning Path

```
Day 1:
- Understand JWT authentication
- Learn Angular routing
- Learn MongoDB basics
- Get system running

Day 2-3:
- Understand services pattern
- Learn RxJS basics
- Implement one complete feature
- Test with real data

Day 4-5:
- Implement remaining features
- Add error handling
- Performance optimization
- Testing

Day 6-7:
- Polish UI/UX
- Security audit
- Deployment prep
- Documentation
```

## ✨ Success Criteria

You'll know it's working when:
1. ✅ Frontend loads without errors
2. ✅ Can click login button
3. ✅ Login page accepts credentials
4. ✅ Backend receives request
5. ✅ Backend returns tokens
6. ✅ Frontend stores tokens
7. ✅ Redirected to appropriate dashboard
8. ✅ Can see role-specific navigation
9. ✅ Can make authenticated API calls
10. ✅ Can logout and go back to login

---

**Version**: 1.0  
**Last Updated**: May 2026  
**Status**: Ready to Use ✅

Enjoy building! 🚀
