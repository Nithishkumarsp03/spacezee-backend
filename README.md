"# SL-IL-platform-backend"

Demo:
login credentials: pradeepkb.nal@nergyindia.com
pwd: da8d4@Ch

# SL-IL Platform API Documentation

## Table of Contents

1. [Auth Module](#auth-module)
2. [User Module](#user-module)
3. [Programs Module](#programs-module)
4. [Learning Material Module](#learning-material-module)
5. [Task Material Module](#task-material-module)
6. [Task JWT Module](#task-jwt-module)

---

## Auth Module

### Endpoints

#### 1. Login

- **POST** `/api/auth/login`
- **Validation:**
  ```json
  {
    "body": {
      "email": "string (valid email, required)",
      "password": "string (required)"
    }
  }
  ```

#### 2. Change Password

- **POST** `/api/auth/change-password`
- **Auth:** Required (`admin`, `user`)
- **Validation:**
  ```json
  {
    "body": {
      "oldPassword": "string (required)",
      "newPassword": "string (required)"
    }
  }
  ```

#### 3. Refresh Token

- **POST** `/api/auth/refresh-token`
- **Validation:**
  ```json
  {
    "cookies": {
      "refreshToken": "string (required)"
    }
  }
  ```

#### 4. Forget Password

- **POST** `/api/auth/forget-password`
- **Validation:**
  ```json
  {
    "body": {
      "email": "string (valid email, required)"
    }
  }
  ```

#### 5. Create Password

- **POST** `/api/auth/create-password`
- **Validation:**
  ```json
  {
    "body": {
      "id": "string (required)",
      "email": "string (valid email, required)"
    }
  }
  ```

#### 6. Reset Password

- **POST** `/api/auth/reset-password`
- **Validation:**
  ```json
  {
    "body": {
      "email": "string (valid email, required)"
    }
  }
  ```

---

## User Module

### Endpoints

#### 1. Create User

- **POST** `/api/user/create-user`
- **Auth:** Required (`admin`, `superAdmin`)
- **Validation:**
  ```json
  {
    "body": {
      "name": "string (required)",
      "email": "string (valid email, required)",
      "role": "admin | user"
    }
  }
  ```

#### 2. Get Current User

- **GET** `/api/user/`
- **Auth:** Required (`admin`, `superAdmin`, `user`)

#### 3. Get User by Email

- **GET** `/api/user/:email`
- **Auth:** Required (`admin`, `superAdmin`)

#### 4. Change User Status

- **PATCH** `/api/user/change-status`
- **Auth:** Required (`admin`, `superAdmin`)
- **Validation:**
  ```json
  {
    "body": {
      "status": "in-progress | blocked"
    }
  }
  ```

#### 5. Delete User

- **DELETE** `/api/user/:email`
- **Auth:** Required (`admin`, `superAdmin`)
- **Validation:**
  ```json
  {
    "body": {
      "isDeleted": "boolean (required)"
    }
  }
  ```

#### 6. Update Completed Task

- **PATCH** `/api/user/task-update`
- **Auth:** Required (`user`)
- **Validation:**
  ```json
  {
    "body": {
      "completedTask": "string (required)"
    }
  }
  ```

---

## Programs Module

### Endpoints

#### 1. Create Program

- **POST** `/api/programs/create-program`
- **Auth:** Required (`admin`, `superAdmin`)
- **Validation:**
  ```json
  {
    "body": {
      "name": "string (required)",
      "practicals": "array (optional)",
      "learningMaterials": "array (optional)",
      "assignments": "array (optional)",
      "defaultSelected": "boolean (optional)",
      "isDeleted": "boolean (optional)"
    }
  }
  ```

#### 2. Get All Programs

- **POST** `/api/programs/`
- **Auth:** Required (`admin`, `superAdmin`, `user`)

---

## Learning Material Module

### Endpoints

#### 1. Create Learning Material

- **POST** `/api/learningMaterial/create-learning-material`
- **Auth:** Required (`admin`, `superAdmin`)
- **Validation:**
  ```json
  {
    "body": {
      "title": "string (required if any data present)",
      "fileName": "string (required if any data present)",
      "contentTypeStr": "string (required if any data present)",
      "sortOrder": "number (required if any data present)",
      "fileURL": "string (required if any data present)",
      "isDeleted": "boolean (optional, default: false)"
    }
  }
  ```

#### 2. Get Learning Material by ID

- **GET** `/api/learningMaterial/:id`
- **Auth:** Required (`admin`, `superAdmin`, `user`)

#### 3. Get All Learning Materials

- **GET** `/api/learningMaterial/`
- **Auth:** Not enforced (can be enabled)

---

## Task Material Module

### Endpoints

#### 1. Create Task Material

- **POST** `/api/taskMaterial/create-task-material`
- **Auth:** Required (`admin`, `superAdmin`)
- **Validation:**
  ```json
  {
    "body": {
      "name": "string (required)",
      "courseImage": "string (required)",
      "isDeleted": "boolean (optional, default: false)",
      "courseContents": [
        {
          "title": "string (required if any data present)",
          "description": "string (optional)",
          "endPoint": "string (required)",
          "contentDetails": [
            {
              "questions": "object or array (optional)",
              "answers": "object (optional)",
              "isDeleted": "boolean (optional, default: false)"
            }
          ],
          "isDeleted": "boolean (optional, default: false)"
        }
      ]
    }
  }
  ```

#### 2. Get Task Material by ID

- **GET** `/api/taskMaterial/:id`
- **Auth:** Required (`admin`, `superAdmin`, `user`)

#### 3. Get All Task Materials

- **GET** `/api/taskMaterial/`
- **Auth:** Required (`admin`, `superAdmin`, `user`)

#### 4. Get Course Content by ID

- **POST** `/api/taskMaterial/content/:id`
- **Auth:** Required (`admin`, `superAdmin`, `user`)

---

## Task JWT Module

### Endpoints

#### 1. Create Task JWT

- **POST** `/api/taskJWT/`
- **Auth:** Required (`admin`, `superAdmin`, `user`)

#### 2. Send Task JWT

- **POST** `/api/taskJWT/task`
- **Auth:** Required (`user`)

---

## Notes

- All validation is performed using **Zod** schemas.
- Authentication and authorization middleware is enforced as indicated.
- All endpoints expect JSON request bodies unless otherwise specified.
