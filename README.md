# 🔗 Advanced URL Shortener

A powerful and modern **URL Shortener** built with the **MERN Stack** that goes far beyond basic link shortening. It includes robust analytics, QR code generation, geolocation tracking, heatmaps, and a sleek, responsive UI.

Whether you're a guest or a registered user, shortening links is easy — and power users enjoy enhanced features and detailed analytics.

---

## 🚀 Features

- ✂️ **Shorten URLs Instantly** — Works with or without login
- 📊 **Advanced Analytics** — Click count, geolocation, browser/device stats, and heatmaps
- 🌍 **Geo Location Tracking** — Visualize where your clicks come from
- 📈 **Beautiful Charts** — Line, bar, and area charts powered by **Chart.js** and **Highcharts**
- 📱 **QR Code Generator** — Instantly generate QR codes for shortened links
- 🎨 **Modern UI** — Clean, responsive design with **Tailwind CSS**
- 🔐 **JWT Auth** — Secure login, register, and protected routes
- 🌐 **Public API Support** *(Coming Soon)*
- 🔗 **One-Link Bio Page (Linktree-style)** *(Coming Soon)*

---

## 🛠️ Tech Stack

| Layer        | Tech                       |
|--------------|----------------------------|
| **Frontend** | React.js, Tailwind CSS     |
| **Backend**  | Node.js, Express.js        |
| **Database** | MongoDB + Mongoose         |
| **Charts**   | Chart.js, Highcharts       |
| **Auth**     | JWT (JSON Web Tokens)      |
| **Cloud**    | Cloudinary (Images, QR)    |
| **Email**    | SMTP (Email Notifications) |

---

## 🧪 Environment Variables

Create a `.env` file in the `backend/` directory with the following keys:

```env
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

SMTP_HOST=smtp_host
SMTP_PORT=smtp_port
SMTP_USERNAME=smtp_username
SMTP_PASSWORD=smtp_password
```

## 🧪 Installation & Setup

## clone the repo
```
git clone https://github.com/kumaranup1234/url-shortner.git
cd url-shortner
```

## Backend
```backend
cd backend
npm install
npm index.js
```

## Frontend
```forntend
cd ../frontend
npm install
npm start

```

## 🌐 Deployment

Deploy this full‑stack app using:
---
- Frontend: Vercel

- Backend: Render

- Database: MongoDB Atlas

🔐 Set the same environment variables in your deployment settings.

---

## ✨ Upcoming Features
--- 
- 🧩 Public API with token‑based access

- 🌐 One‑Link Profile Page (Linktree‑style)

- 🔁 Link Expiration

- 🌈 Custom Themes for Profile Pages
---