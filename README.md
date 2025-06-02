# User Management System with JWT Authentication

This is a Spring Boot application that implements a user management system with JWT-based authentication and role-based authorization.

## Features

- User registration and authentication
- JWT-based security
- Role-based access control (Admin, Company, Team)
- User management (CRUD operations)
- Company-specific data access
- Menu access based on user roles

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- H2 Database (in-memory)

## Getting Started

1. Clone the repository
2. Build the project:
   ```bash
   mvn clean install
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The application will start on port 8080.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
{
    "username": "atfatmc",
    "password": "atfatmc",
    "company": "Developer",
    "commissionRate": 0,
    "status": true,
    "roles": [
        {
            "name": "ROLE_ADMIN",
            "permissions": [
                {
                    "name": "COMPANY_READ"
                },
                {
                    "name": "COMPANY_UPDATE"
                },
                {
                    "name": "MENU_COMPANY"
                }
            ]
        }
    ]
}


- `POST /api/auth/login` - Login and get JWT token
{
    "username": "atfatmc",
    "password": "atfatmc"
}

- `POST /api/auth/logout` - Logout (invalidate token)

### User Management

- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
{
    "username": "atfatmc",
    "company": "Developerr",
    "commissionRate": 1.0,
    "status": true
}

- `DELETE /api/users/{id}` - Delete user (Admin only)

## Security

- Passwords are encrypted using BCrypt
- JWT tokens are used for authentication
- Role-based access control is implemented
- HTTPS is recommended for production

## Database

POSTGRES_DB=postgres_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5432

## Roles and Permissions

### Admin Role
- Full access to all resources
- Can manage users and roles
- Access to all menus

### Company Role
- Access to company-specific resources
- Can manage company data
- Access to company menu

### Team Role
- Limited access to resources
- Access to team-specific menu
- Restricted permissions

## Security Considerations

1. Change the JWT secret key in application.properties
2. Use HTTPS in production
3. Implement rate limiting
4. Add password complexity requirements
5. Implement account lockout after failed attempts
6. Add request validation
7. Implement proper error handling
8. Add logging for security events 