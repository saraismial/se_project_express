# WTWR (What to Wear?) – Backend API

This backend powers the WTWR full-stack application, providing user authentication, clothing item management, and secure access to user-specific data. It is built with Node.js, Express, MongoDB, and JWT-based authentication.

- **Project Pitch**
View the project pitch video here: **https://drive.google.com/file/d/1v8bF4s4c3lOI1XExNDEvW4lfPWsw1j0h/view?usp=sharing**

## Deployment

### **Backend**
Live API base URL: **https://api.wtwr.spacegamers.net**  

### **Frontend**
Live React application: **https://wtwr.spacegamers.net**

## Features

### User Authentication

- Register new users (`POST /signup`)
- Log in existing users (`POST /signin`)
- Protected routes using JWT (`Authorization: Bearer <token>`)

### User Management

- Get current user info (`GET /users/me`)
- Update user profile (`PATCH /users/me`)

### Clothing Items

- Public: fetch all clothing items (`GET /items`)
- Auth required:
  - Add a clothing item (`POST /items`)
  - Like or unlike an item (`PUT /items/:id/likes`, `DELETE /items/:id/likes`)
  - Delete an item owned by the current user (`DELETE /items/:id`)

### Security

- Helmet for enhanced HTTP security
- JWT for user authentication
- Request validation using Celebrate/Joi
- Centralized error handling middleware

## Technology Stack

- Node.js
- Express
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Celebrate / Joi validation
- Helmet and CORS

## Getting Started

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Authentication (Public)

| Method | Endpoint | Description                    |
| ------ | -------- | ------------------------------ |
| POST   | /signup  | Register a new user            |
| POST   | /signin  | Log in a user and return a JWT |

### Users

| Method | Endpoint  | Description                |
| ------ | --------- | -------------------------- |
| GET    | /users/me | Get the current user       |
| PATCH  | /users/me | Update user name or avatar |

### Clothing Items

| Method | Endpoint         | Auth Required | Description              |
| ------ | ---------------- | ------------- | ------------------------ |
| GET    | /items           | No            | Fetch all items          |
| POST   | /items           | Yes           | Add a new item           |
| DELETE | /items/:id       | Yes           | Delete an owned item     |
| PUT    | /items/:id/likes | Yes           | Like an item             |
| DELETE | /items/:id/likes | Yes           | Remove like from an item |

## Frontend Repository

- **Frontend:** https://github.com/saraismial/se_project_react

## Summary

This backend provides a complete API for user management and clothing item operations in the WTWR application. With JWT authentication, request validation, and MongoDB integration, it supports secure and scalable interaction with the frontend.
