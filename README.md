# Arnifi Blog - MERN Stack Application

A multi-user blogging platform built with MongoDB, Express, React, and Node.js.

## Features

- User authentication with JWT
- Create, read, update, and delete blogs
- Filter blogs by category and author
- Only blog owners can edit or delete their own blogs
- All logged-in users can view all blogs

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT for authentication
- bcryptjs for password encryption

**Frontend:**
- React (Vite)
- React Router
- Tailwind CSS
- Axios
- React Hot Toast

## Installation

### Backend Setup

```bash
cd server
npm install
```

Create `.env` file in server folder:
```
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Run server:
```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
```

Create `.env` file in client folder:
```
VITE_API_URL=http://localhost:8000
```

Run client:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user

### Blogs (Protected)
- `GET /blogs` - Get all blogs (with optional filters: category, author)
- `GET /blogs/:id` - Get single blog
- `POST /blogs` - Create new blog
- `PUT /blogs/:id` - Update blog (owner only)
- `DELETE /blogs/:id` - Delete blog (owner only)

## Folder Structure

```
server/
├── config/         # Database configuration
├── models/         # MongoDB schemas
├── controllers/    # Request handlers
├── routes/         # API routes
├── middleware/     # Authentication middleware
└── server.js       # Entry point

client/
├── src/
│   ├── components/ # Reusable components
│   ├── pages/      # Page components
│   ├── context/    # Auth context
│   ├── services/   # API calls
│   └── App.jsx     # Main app
```

## Deployment

Backend deployed on Render
Frontend deployed on Vercel

Note: First request may take 50-60 seconds due to Render free tier spinup.

## Author

Shaik Mohammad Asif
