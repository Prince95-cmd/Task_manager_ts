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





---

## ⚙️ Environment Variables

Create a `.env` file in your root directory and add:

PORT=4000  
MONGODB_CONNECTION_URL=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret_key



---

## 🧩 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Prince95-cmd/Task_manager_ts.git


---

## ⚙️ Environment Variables

Create a `.env` file in your root directory and add:

PORT=4000  
MONGODB_CONNECTION_URL=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret_key


yaml
Copy code

---

## 🧩 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Prince95-cmd/Task_manager_ts.git
Navigate to the project folder

```bash
cd task_manager_api_ts
```
Install dependencies

```bash
npm install
```
Add your .env file (as shown above)

🚀 Running the Server
Development
Runs TypeScript code directly using ts-node or tsc-watch.

```bash
npm run dev
```
Build (compile to JavaScript)
```bash
npm run build
```
Production
```bash
npm start
```
Server starts at:
👉 `http://localhost:4000`

🔗 API Endpoints  
🔒 Authentication
| Method | Endpoint | Description            |	Access  
|--------|----------|------------------------|---------|
| POST	|`/signup` | Register a new user    | Public |
| POST	|`/login`  | Login user & get token | Public |

📋 Tasks  
Method	Endpoint	Description	Access  
| Method | Endpoint      | Description               | Access  |
|---------|----------------|---------------------------|----------|
| GET     | /tasks         | Get all tasks for user    | Private |
| GET     | /tasks/:id     | Get single task by ID     | Private |
| POST    | /tasks         | Create a new task         | Private |
| PUT     | /tasks/:id     | Update an existing task   | Private |
| DELETE  | /tasks/:id     | Delete a task             | Private |  

🔐 Authentication Flow  
User signs up with email, and password.

Password is hashed using bcrypt and stored securely in MongoDB.

On login, a JWT token is issued.

All protected routes require `Authorization: Bearer <token>` in headers.

Middleware `(authMiddleware.ts)` verifies the token and attaches user info to `req.user`.

🧪 Example Request
Create Task `(POST /tasks)`
Request Body

```json

{
  "title": "Complete API documentation",
  "description": "Write README.md for Task Manager API",
  "duration": "1 day"
}
```
Response

```json

{
  "message": "Task created successfully",
  "task": {
    "_id": "671e3a9dbe76f2f823ddf004",
    "title": "Complete API documentation",
    "description": "Write README.md for Task Manager API",
    "duration": "1 day",
    "user": "671e3a5fbe76f2f823ddf001"
  }
}
```
🧾 License
This project is licensed under the MIT License.
You are free to use, modify, and distribute it with attribution.

👤 Author
Prince Obiekezie
📧 obiekezieprincec@gmail.com  
🌐 https://github.com/Prince95-cmd

🛠️ To connect your frontend, include the JWT token in the request header under `Authorization: Bearer <token>` when making API calls.






