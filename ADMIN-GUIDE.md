# 🔧 Admin Guide - VulHub Leaderboard

---

## 🔑 YOUR ADMIN ACCOUNT

**Email:** `admin@vulhub.com`  
**Password:** `admin123`

**⚠️ CHANGE THIS PASSWORD after first login!**

---

## 🌐 ADMIN ACCESS

### Step 1: Login
Go to: https://vulhub-leaderboard-web-270f558cc7ba.herokuapp.com

1. Enter:
   - Email: `admin@vulhub.com`
   - Password: `admin123`
2. Click Login

### Step 2: Access Admin Panel
Once logged in, click the **"Admin Panel"** button in the top navigation.

---

## 🎯 ADMIN PANEL FEATURES

### View All Submissions
The admin panel shows all student submissions with:
- Student name & email
- Vulnerability exploited
- Category
- Screenshot filename
- Student's findings/notes
- Submission date

### Approve Submissions
Click **"✅ Approve"** to:
- Award student 100 points
- Automatically award badges based on achievements:
  - First Blood (1st exploit)
  - Pentester (5 exploits)
  - Security Expert (10 exploits)
  - Category Specialist (3 in same category)
- Update leaderboard

### Reject Submissions
Click **"❌ Reject"** to mark submission as rejected (no points awarded).

---

## 📊 MANAGE SYSTEM

### View All Students
API call:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://vulhub-leaderboard-32ce1cbade27.herokuapp.com/api/leaderboard
```

### View All Submissions
Admin Panel shows everything, or use API:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://vulhub-leaderboard-32ce1cbade27.herokuapp.com/api/submissions
```

### Manually Award Points (Advanced)
You can also use the Heroku PostgreSQL database directly if needed.

---

## 🔐 CREATE MORE ADMIN ACCOUNTS

If you want to create additional admin/instructor accounts:

```bash
cd /Users/vincentnestler/aidev/vulhub-leaderboard-clean/api

# Create new admin
node create-admin.js instructor@school.edu password123 "Instructor Name"
```

---

## 🎓 STUDENT WORKFLOW

Students do NOT see the admin panel. They only see:
1. Login/Register
2. Submit Exploit form
3. Leaderboard
4. Dashboard with their stats

---

## 💡 TIPS

**Approve regularly:** Students get instant feedback when you approve their submissions

**Check notes carefully:** Student notes show their understanding of the exploit

**Use categories:** The category field helps award specialist badges automatically

**Monitor leaderboard:** Keep students motivated by highlighting top performers

---

## 🚨 TROUBLESHOOTING

### Can't login as admin?
Make sure you're using: `admin@vulhub.com` / `admin123`

### Don't see submissions?
Students need to submit first! Have them login and use "Submit New Exploit"

### Screenshot not showing?
Screenshots are stored on the Heroku dyno filesystem. The filename is shown in the admin panel.

---

## 📱 QUICK ADMIN WORKFLOW

1. Login at: https://vulhub-leaderboard-web-270f558cc7ba.herokuapp.com
2. Click "Admin Panel"
3. Review pending submissions
4. Click "Approve" or "Reject"
5. Student gets points + badges automatically
6. Leaderboard updates

**Done!** Simple and fast.

---

## 🎯 YOUR ADMIN CREDENTIALS

```
URL: https://vulhub-leaderboard-web-270f558cc7ba.herokuapp.com
Email: admin@vulhub.com
Password: admin123
```

**Login now and test the admin panel!** 🚀

