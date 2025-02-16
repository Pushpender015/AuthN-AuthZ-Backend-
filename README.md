# User Authentication App 

This is a Node.js-based user authentication application that uses Express.js, MongoDB, and JWT for authentication and authorization. The application provides user signup, login, and protected routes for different user roles (Admin and Student).

## Features

- User Signup
- User Login
- JWT-based Authentication
- Role-based Authorization (Admin and Student)
- Protected Routes
- Environment Configuration
- MongoDB Integration

## Project Structure

```
.env
config/
    database.js
Controller/
    auth.js
index.js
middlewares/
    auth&auth.js
models/
    userAuth.js
package.json
routes/
    user.js
```

## Installation

1. Clone the repository:

```sh
git clone https://github.com/Pushpender015/AuthN-AuthZ-Backend-.git
cd auth-app
```

2. Install dependencies:

```sh
npm install
```

3. Create a .env file in the root directory and add the following environment variables:

```
PORT=4000
MONGO_DB_URL="mongodb://localhost:27017/userAuthentication"
JWT_SECRET=your_jwt_secret
```

4. Start the application:

```sh
npm run dev
```

## API Endpoints

### User Signup

- **URL:** `/api/v1/signup`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "Student"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User Created Successfully"
  }
  ```

### User Login

- **URL:** `/api/v1/login`
- **Method:** `POST`
- **Description:** Logs in an existing user.
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "token": "jwt_token",
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "role": "Student"
    },
    "message": "User logged in successfully"
  }
  ```

### Protected Routes

#### Test Route

- **URL:** `/api/v1/test`
- **Method:** `GET`
- **Description:** A protected route for testing authentication.
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "welcome to the protected route for test"
  }
  ```

#### Student Route

- **URL:** `/api/v1/student`
- **Method:** `GET`
- **Description:** A protected route for students.
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Welcome to the protected route for students"
  }
  ```

#### Admin Route

- **URL:** `/api/v1/admin`
- **Method:** `GET`
- **Description:** A protected route for admins.
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Welcome to the protected route for admins"
  }
  ```

## Middleware

### Authentication Middleware

- **File:** auth&auth.js
- **Function:** `auth`
- **Description:** Verifies the JWT token and stores the decoded payload in `req.user`.

### Authorization Middleware

- **File:** auth&auth.js
- **Functions:** `isStudent`, `isAdmin`
- **Description:** Checks the user role and allows access to protected routes based on the role.

## Database Configuration

- **File:** database.js
- **Description:** Connects to the MongoDB database using Mongoose.

## Models

### User Model

- **File:** userAuth.js
- **Description:** Defines the user schema and model using Mongoose.

---
