# Contact Manager API

## Description
The **Contact Manager API** allows users to authenticate and manage their contacts through a secure and scalable API  built with **TypeScript** and **Express**, following **Clean Architecture** for scalability, maintainability, and separation of concerns. It uses **Prisma** for database interactions, **JWT** for user authentication and **JEST** for unit testing.

## Requirements
- **Node.js** version 18 or higher.
- **MySQL** for the database (or any compatible database with Prisma).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/johnkmedeiros/contact-manager-api.git
   cd contact-manager-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables. Create a `.env` file from the `.env.example` file:
   ```bash
   cp .env.example .env
   ```

   Fill in the database connection and JWT secret details.

   Example:
   ```
   DATABASE_URL="mysql://root:@localhost:3306/contact_manager"
   JWT_SECRET="your_jwt_secret"
   JWT_EXPIRATION_TIME="3600"
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Generate Prisma files:
   ```bash
   npx prisma generate
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. The API will be available at `http://localhost:3000`.

## Testing

1. Run the script:
   ```bash
   npm run test
   ```

## API Routes Documentation

### **ENDPOINTS**

#### Authentication

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Log in a user

#### Contacts

- **GET** `/api/contacts` - **TODO**
- **GET** `/api/contacts/{id}` - **TODO**
- **POST** `/api/contacts` - **TODO**
- **PUT** `/api/contacts/{id}` - **TODO**
- **DELETE** `/api/contacts/{id}` - **TODO**

### **POST /api/auth/register**

- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Responses**:
  - **201**: If the user is successfully registered.
    ```json
    {
      "token": "jwt_token_here",
      "expiresIn": 3600
    }
    ```
  - **422**: If the email is already in use.
    ```json
    {
      "message": "Email is already in use",
      "error_code": "EMAIL_ALREADY_IN_USE"
    }
    ```

### **POST /api/auth/login**

- **Description**: Logs in an existing user.
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Responses**:
  - **200**: If the login is successful.
    ```json
    {
      "token": "jwt_token_here",
      "expiresIn": 3600
    }
    ```
  - **401**: If the email or password is incorrect.
    ```json
    {
      "message": "Invalid email or password",
      "error_code": "INVALID_CREDENTIALS"
    }
    ```