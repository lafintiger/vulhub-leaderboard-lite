# ✅ VulHub Leaderboard API - WORKING ON HEROKU

**Deployed:** November 5, 2025  
**URL:** https://vulhub-leaderboard-32ce1cbade27.herokuapp.com  
**Status:** ✅ LIVE AND WORKING

---

## 🎯 What's Working

✅ User Registration  
✅ User Login (JWT tokens)  
✅ Submit exploits (with screenshot upload)  
✅ Leaderboard rankings  
✅ Badge awards (automatic)  
✅ Clean, simple code  
✅ Deployed to Heroku  

---

## 📡 API Endpoints

### Authentication
```bash
# Register
POST /api/auth/register
Body: { "email": "user@example.com", "password": "password123", "name": "John Doe" }

# Login
POST /api/auth/login
Body: { "email": "user@example.com", "password": "password123" }
Returns: { "user": {...}, "accessToken": "..." }
```

### Submissions
```bash
# Submit exploit (with screenshot)
POST /api/submissions
Headers: Authorization: Bearer YOUR_TOKEN
Form Data:
  - screenshot: (file)
  - vulnName: "langflow/CVE-2025-3248"
  - vulnCategory: "Web Security"
  - notes: "Exploited via RCE in API endpoint..."

# Get my submissions
GET /api/submissions/mine
Headers: Authorization: Bearer YOUR_TOKEN

# Get all submissions (admin)
GET /api/submissions
Headers: Authorization: Bearer YOUR_TOKEN

# Approve submission (awards points + badges)
PATCH /api/submissions/:id/approve
Headers: Authorization: Bearer YOUR_TOKEN
```

### Leaderboard
```bash
# Get top rankings
GET /api/leaderboard
Headers: Authorization: Bearer YOUR_TOKEN

# Get my rank
GET /api/leaderboard/my-rank
Headers: Authorization: Bearer YOUR_TOKEN

# Get my badges
GET /api/leaderboard/my-badges
Headers: Authorization: Bearer YOUR_TOKEN
```

### Health
```bash
# Health check (no auth)
GET /health
```

---

## 🧪 Test It Now

**API Docs (Interactive):**
```
https://vulhub-leaderboard-32ce1cbade27.herokuapp.com/api/docs
```

**Health Check:**
```
https://vulhub-leaderboard-32ce1cbade27.herokuapp.com/health
```

---

## 🏆 Badge System

Badges are automatically awarded when submissions are approved:

| Badge | Requirement | Tier |
|-------|-------------|------|
| First Blood | 1 approved submission | Bronze |
| Pentester | 5 approved submissions | Silver |
| Security Expert | 10 approved submissions | Gold |
| [Category] Specialist | 3 in same category | Silver |

---

## 📊 How It Works

1. **Student registers** → Creates account
2. **Student exploits VulHub vuln** → Takes screenshot
3. **Student submits** → Upload screenshot, select vuln, add notes
4. **Instructor approves** → Student gets 100 points
5. **System awards badges** → Based on achievements
6. **Leaderboard updates** → Rankings recalculate

---

## 💾 Database

Uses your Heroku PostgreSQL database with clean tables:
- `users_clean` - Student accounts
- `submissions_clean` - Exploit submissions
- `badges_clean` - Awarded badges

---

## 🎯 What's Next

**Option 1:** Test API with Postman/Swagger (works now!)  
**Option 2:** I build simple frontend (2 hours) - login, submit form, leaderboard view

---

**Clean. Simple. Working.**

