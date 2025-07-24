# 📰 Node.js Backend Assignment - Articles App

This is a full-featured backend application built using **Node.js**, **MongoDB**, and **Redis**. It manages articles, user interactions (likes/views), real-time popularity tracking via Redis caching, and a simple notification system.

---

## 📌 Features

- ✅ Create and manage articles
- 👍 Like and view articles
- 📊 Track and display most popular and most liked articles
- 🧠 Uses Redis for caching likes and views (improves performance)
- 🔔 Notification system when an article is liked
- 📦 Clean API structure with separate routes and controllers

---

## 🧱 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose)
- **Redis** (for caching)
- **Dotenv** for environment variables

---

## 🧑‍💻 API Endpoints

### 🔹 Articles

| Method | Endpoint                    | Description                    |
|--------|-----------------------------|--------------------------------|
| POST   | `/api/articles/create`      | Create a new article           |
| POST   | `/api/articles/like`        | Like an article                |
| POST   | `/api/articles/view`        | View an article                |
| GET    | `/api/articles/popular`     | Get most popular articles      |
| GET    | `/api/articles/most-liked`  | Get most liked articles        |
| GET    | `/api/articles/test`        | Test route                     |

---

### 🔹 Users

| Method | Endpoint            | Description         |
|--------|---------------------|---------------------|
| POST   | `/api/users/create` | Create a new user   |

---

## ⚙️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/itspratyush22/NODE-PROJECT.git
cd NODE-PROJECT
