# 📌 ToDo-Blog-Meeting App Backend

This is the backend server for a full-stack productivity application that includes:
-  ToDo Management
-  Blog Posting
-  Meeting Scheduling

Built with **Node.js**, **Express.js**, and **MongoDB**, with secure **JWT-based authentication**, and modular code structure.

---

##  Folder Structure

```
ToDo_Backend/
├── config/             # Configuration files (DB, JWT, Email)
├── controllers/        # Route handler logic
├── middlewares/        # Custom middleware (auth, error handling)
├── models/             # Mongoose models
├── routes/             # Express route definitions
├── services/           # Business logic
├── utils/              # Utility helpers (hashing, token, etc.)
├── .env                # Environment variables
├── server.js           # Entry point
```

---

## 🚀 Features

-  JWT Authentication (Register, Login, Protected Routes)
-  Role-based Access Control (User/Admin)
-  CRUD operations:
  - ToDos
  - Blogs
  - Meetings
-  Email notification support via Nodemailer
-  Modular and Clean Codebase
-  CORS Enabled

---

## 🔧 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT, Bcrypt
- **Email**: Nodemailer (SMTP)
- **Environment**: Dotenv

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ToDo_Backend.git
cd ToDo_Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=5000

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/todo_blog_meeting

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Email (SMTP or Zoho/Gmail)
EMAIL_USER=your_email@domain.com
EMAIL_PASS=your_email_password
```

> ⚠️ Make sure your database and email credentials are correct.

### 4. Start the server

```bash
node server.js
```

Or for development:

```bash
npm run dev
```

---

## 📬 API Endpoints

### Auth
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and get token

### ToDos
- `GET /api/todos` – Get all todos for user
- `POST /api/todos` – Add a new todo
- `PUT /api/todos/:id` – Update a todo
- `DELETE /api/todos/:id` – Delete a todo

### Blogs
- `GET /api/blogs` – Get all blogs
- `POST /api/blogs` – Create a blog
- `PUT /api/blogs/:id` – Edit blog
- `DELETE /api/blogs/:id` – Delete blog

### Meetings
- `GET /api/meetings` – List meetings
- `POST /api/meetings` – Schedule a meeting
- `PUT /api/meetings/:id` – Update meeting
- `DELETE /api/meetings/:id` – Cancel meeting

---

## 🧪 Testing

Use **Postman** or **Thunder Client** to test APIs.  
Send `Authorization: Bearer <token>` header for protected routes.

---

## 🔐 Security Notes

- Passwords are hashed with **bcrypt**
- JWTs are signed and verified securely
- `.env` file must be **excluded** from GitHub (via `.gitignore`)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
