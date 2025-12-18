# 📘 Digital Life Lessons

🔗 **Live Website:** https://lessonlab-706ca.web.app/

Digital Life Lessons is a full-stack web platform where users can create, preserve, and share meaningful life lessons, personal growth insights, and wisdom. The platform supports free and premium content, community engagement, and a secure dashboard system for both users and admins.

---

## 🌟 Project Overview

People often learn powerful life lessons but forget them over time.  
**Digital Life Lessons** helps users store personal wisdom, reflect mindfully, and grow by exploring lessons shared by others in the community.

This project is built as part of **B12-A11 Category-03 Assignment**, following all required guidelines and best practices.

---

## 🚀 Key Features

- 🔐 **Authentication System**
  - Email & Password login
  - Google authentication
  - Protected & reload-safe routes

- 💎 **Free & Premium Plans**
  - Free users can access public free lessons
  - Premium users unlock premium lessons
  - Stripe one-time payment

- 📝 **Life Lesson Management**
  - Create, update, delete lessons
  - Public / Private visibility
  - Free / Premium access control
  - Optional image upload

- 🌍 **Public Lessons Browsing**
  - Filter by category & emotional tone
  - Search by title/keyword
  - Sort by newest & most saved
  - Pagination support
  - Premium lessons blurred for free users

- ❤️ **Community Engagement**
  - Like & unlike lessons (real-time UI)
  - Save lessons to Favorites
  - Comment system
  - Report inappropriate lessons

- 📊 **Dashboard System**
  - User dashboard (stats, lessons, favorites)
  - Admin dashboard (users, lessons, reports, analytics)

- 🛡️ **Admin Moderation**
  - Manage users & roles
  - Feature lessons
  - Review & delete reported content

---

## 🧑‍💻 Technologies Used

### Frontend
- **React 19**
- **React Router v7**
- **Tailwind CSS v4**
- **DaisyUI**
- **Framer Motion**
- **Axios**
- **Firebase Authentication**
- **Stripe Checkout**
- **Lottie React**
- **Recharts**
- **React Toastify**
- **React Share**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Firebase Admin SDK**
- **Stripe API**
- **JWT Authentication**
- **CORS secured API**

---

## 🧭 Application Routes

### Public Routes
- `/` — Home
- `/login` — Login
- `/register` — Register
- `/public-lessons` — Browse public lessons
- `*` — 404 Not Found

### Protected Routes
- `/lesson/:id` — Lesson details
- `/pricing` — Upgrade to Premium
- `/payment/success`
- `/payment/cancel`

### User Dashboard
- `/dashboard` — Dashboard Home
- `/dashboard/add-lesson`
- `/dashboard/my-lessons`
- `/dashboard/my-favorites`
- `/dashboard/profile`

### Admin Dashboard
- `/dashboard/admin`
- `/dashboard/admin/manage-users`
- `/dashboard/admin/manage-lessons`
- `/dashboard/admin/reported-lessons`
- `/dashboard/admin/profile`

---

## 💳 Stripe Payment Flow

1. User clicks **Upgrade to Premium**
2. Backend creates Stripe checkout session
3. User completes payment (test mode)
4. Stripe webhook updates MongoDB (`isPremium: true`)
5. App syncs user plan from database (single source of truth)

---

## 🔒 Security & Best Practices

- Firebase & MongoDB credentials secured via `.env`
- Firebase Admin SDK token verification
- Role-based authorization (User / Admin)
- Owner & admin-only lesson editing
- No lorem ipsum or default alerts used
- Fully reload-safe routes
- No CORS / 404 / private route issues in production

---

## 📦 Project Dependencies

| Dependency | Version | Purpose |
|----------|--------|--------|
| react | ^19.2.0 | Core library for building UI |
| react-dom | ^19.2.0 | React DOM rendering |
| react-router | ^7.10.1 | Client-side routing |
| axios | ^1.13.2 | HTTP requests to backend API |
| firebase | ^12.6.0 | Authentication & Firebase services |
| @stripe/stripe-js | ^8.5.3 | Stripe client-side payment handling |
| @stripe/react-stripe-js | ^5.4.1 | React components for Stripe |
| tailwindcss | ^4.1.17 | Utility-first CSS framework |
| @tailwindcss/vite | ^4.1.17 | Tailwind integration with Vite |
| daisyui | ^5.5.8 | Tailwind UI component library |
| framer-motion | ^12.23.25 | Animations & transitions |
| lottie-react | ^2.4.1 | Lottie animations integration |
| lucide-react | ^0.561.0 | Modern SVG icon library |
| react-icons | ^5.5.0 | Popular icon packs |
| react-toastify | ^11.0.5 | Toast notifications |
| react-loader-spinner | ^8.0.0 | Loading spinners |
| react-responsive-carousel | ^3.2.23 | Carousel / slider component |
| react-share | ^5.2.2 | Social media sharing |
| recharts | ^3.5.1 | Charts & analytics visualization |
