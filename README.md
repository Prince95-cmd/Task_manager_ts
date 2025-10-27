# 🧾 Task Manager API (TypeScript)

A **Task Management REST API** built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.  
It provides secure **user authentication and authorization** with **JWT**, along with full **CRUD functionality** for managing tasks.

---

## 📚 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Example Request](#example-request)
- [License](#license)
- [Author](#author)

---

## ✨ Features
- 🔐 **JWT-based Authentication & Authorization**
- 🧑‍💻 **User Signup & Login**
- 🗂️ **Full CRUD operations** for tasks (Create, Read, Update, Delete)
- 🧱 **Mongoose Models** for Users and Tasks
- ⚙️ **Type-safe codebase** with TypeScript
- 🧩 **Middleware for token verification**
- 💾 **MongoDB Atlas integration**
- 🧹 **Error handling & input validation**
- 🚀 **Nodemon + tsc-watch** for development auto-reload

---

## 🧰 Tech Stack
- **TypeScript** – Type safety and maintainability  
- **Node.js** – Runtime environment  
- **Express.js** – Web framework  
- **MongoDB** – NoSQL database  
- **Mongoose** – ODM for MongoDB  
- **bcrypt** – Password hashing  
- **jsonwebtoken (JWT)** – Secure authentication  
- **dotenv** – Environment configuration  

---

## 📁 Project Structure



---

## ⚙️ Environment Variables

Create a `.env` file in your root directory and add:

PORT=5000
MONGODB_CONNECTION_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
TOKEN_EXPIRES_IN=1d


---

## 🧩 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/task-manager-api-ts.git

