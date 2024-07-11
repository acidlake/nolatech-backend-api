# Backend API with Auth and User Services

## Project Description

This project is a backend API that provides authentication and user management services. It is built with Node.js and KoaJS, using SQLite as the database. The API includes endpoints for user registration, login, and CRUD operations on user data. The project also includes error handling, validations, and logging.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login
- CRUD operations for user management
- Validations and error handling
- Logging
- Paginated user list
- Encrypted passwords

## Tech Stack

**Backend:**
- Language: JavaScript/TypeScript
- Server Runtime: NodeJS
- Engine: Chrome V8
- Framework: KoaJS
- Database: SQLite

**Infrastructure Backend:**
- CDN: CloudFlare
- CI/CD: Dokploy
- DNS: CloudFlare
- Cloud Provider: Hetzner
- Operating System: Linux Ubuntu
- Secured by SSH Key & Firewall
- SSL: LetsEncrypt

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/acidlake/nolatech-backend-api.git
    cd backend-api
    ```

2. Install dependencies:
    ```bash
    pnpm install
    ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL=sqlite://path/to/your/database.sqlite
JWT_SECRET=your_jwt_secret
PORT=3000
```

## Endpoints

	•	User Registration: POST /api/v1/register
	•	User Login: POST /api/v1/login
	•	List Users: GET /api/v1/users?page=1&count=10
	•	Get User by ID: GET /api/v1/users/{ID}
	•	Update User: PUT /api/v1/users/{ID}
	•	Delete User: DELETE /api/v1/users/{ID}

### Running the Project

Start the server:
```pnpm start ```
The server will be running at http://localhost:3000.

### Testing

To run tests, use the following command:
```pnpm test ```
