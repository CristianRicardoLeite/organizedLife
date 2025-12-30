# 🎯 PROJECT CONTEXT - OrganizedLife

**IMPORTANT: Always read this file before starting any development task!**

This document contains the complete project context, design decisions, architecture, and guidelines. It serves as the Single Source of Truth for all development work.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [Authentication and Authorization](#authentication-and-authorization)
- [API Endpoints](#api-endpoints)
- [Docker and DevOps](#docker-and-devops)
- [Development Guidelines](#development-guidelines)
- [Deployment](#deployment)
- [Roadmap](#roadmap)

---

## Project Overview

**OrganizedLife** is a complete financial organization system designed to help users manage their personal finances efficiently and intuitively.

### Main Objectives

1. **Financial Control**: Allow users to record and categorize all their financial transactions
2. **Visualization**: Provide clear dashboards and reports on financial health
3. **Planning**: Enable creation of financial goals and budgets
4. **Security**: Ensure data protection with modern authentication and authorization
5. **Scalability**: Modern architecture ready to grow and add new features

### Target Users

- Individuals seeking better control of personal finances
- Families managing household budgets
- Freelancers and autonomous professionals
- Small business owners

---

## Architecture

### Architecture Pattern

**Layered Architecture** with clear separation of responsibilities:

```
┌─────────────────────────────────────┐
│         Frontend (React)            │
│    ┌─────────────────────────┐     │
│    │   Pages & Components    │     │
│    ├─────────────────────────┤     │
│    │   State Management      │     │
│    ├─────────────────────────┤     │
│    │   API Services          │     │
│    └─────────────────────────┘     │
└──────────────┬──────────────────────┘
               │ HTTP/REST
               │
┌──────────────┴──────────────────────┐
│        Backend (.NET API)           │
│    ┌─────────────────────────┐     │
│    │   Controllers           │     │
│    ├─────────────────────────┤     │
│    │   Services (Logic)      │     │
│    ├─────────────────────────┤     │
│    │   Repositories          │     │
│    ├─────────────────────────┤     │
│    │   Data Access (EF)      │     │
│    └─────────────────────────┘     │
└──────────────┬──────────────────────┘
               │
               │
┌──────────────┴──────────────────────┐
│      Database (SQLite)              │
└─────────────────────────────────────┘
```

### Design Principles

1. **Separation of Concerns**: Each layer has specific responsibility
2. **Dependency Injection**: Better testability and flexibility
3. **DTO Pattern**: Separation between domain entities and API models
4. **Repository Pattern**: Abstraction of data access
5. **RESTful API**: Standard and predictable endpoints

---

## Technologies

### Backend Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| .NET | 10.0 | Application framework |
| ASP.NET Core | 10.0 | Web API |
| Entity Framework Core | 10.0 | ORM |
| SQLite | 3.x | Database |
| JWT | - | Authentication |
| Swagger/OpenAPI | - | Documentation |
| BCrypt | - | Password hashing |
| AutoMapper | - | Object mapping |

### Frontend Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI framework |
| TypeScript | 5.2.2 | Type safety |
| Vite | 5.0.8 | Build tool |
| React Router | 6.21.0 | Navigation |
| Axios | 1.6.2 | HTTP client |
| React Query | 5.14.2 | Data management |
| React Hook Form | - | Forms |
| Zod | - | Validation |

### DevOps

| Technology | Purpose |
|-----------|---------|
| Docker | Containerization |
| Docker Compose | Orchestration |
| Nginx | Web server (production) |
| Make | Task automation |

---

## Project Structure

```
organizedLife/
├── backend/
│   └── OrganizedLife.API/
│       ├── Controllers/       # API Controllers
│       ├── Models/           # Domain Entities
│       ├── DTOs/             # Data Transfer Objects
│       ├── Services/         # Business Logic
│       ├── Repositories/     # Data Access
│       ├── Data/             # DbContext and Migrations
│       ├── Validators/       # Input Validation
│       ├── Middleware/       # Custom Middleware
│       ├── Helpers/          # Utilities
│       ├── Dockerfile        # Backend Container
│       └── appsettings.json  # Configuration
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable Components
│   │   ├── pages/           # Application Pages
│   │   ├── contexts/        # React Contexts
│   │   ├── hooks/           # Custom Hooks
│   │   ├── services/        # API Services
│   │   ├── types/           # TypeScript Types
│   │   ├── utils/           # Utilities
│   │   └── styles/          # Global Styles
│   ├── Dockerfile           # Frontend Container
│   └── nginx.conf           # Nginx Configuration
│
├── docker-compose.yml        # Main Compose
├── docker-compose.dev.yml    # Development
├── docker-compose.prod.yml   # Production
├── Makefile                  # Useful Commands
├── .env.example              # Environment Variables
├── README.md                 # Main Documentation
├── DOCKER.md                 # Docker Documentation
├── GUIDELINES.md             # Development Guidelines
└── CONTEXTO_PROJETO.md       # This File
```

---

## Data Model

### Main Entities

#### User
```csharp
public class User
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Name { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    // Relationships
    public ICollection<Transaction> Transactions { get; set; }
    public ICollection<Category> Categories { get; set; }
}
```

#### Transaction
```csharp
public class Transaction
{
    public int Id { get; set; }
    public string Description { get; set; }
    public decimal Amount { get; set; }
    public TransactionType Type { get; set; } // Income/Expense
    public DateTime Date { get; set; }
    public DateTime CreatedAt { get; set; }
    
    // Relationships
    public int UserId { get; set; }
    public User User { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; }
}
```

#### Category
```csharp
public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Color { get; set; }
    public string Icon { get; set; }
    public CategoryType Type { get; set; }
    
    // Relationships
    public int UserId { get; set; }
    public User User { get; set; }
    public ICollection<Transaction> Transactions { get; set; }
}
```

### Entity-Relationship Diagram

```
┌─────────────┐         ┌─────────────────┐         ┌──────────────┐
│    User     │         │   Transaction   │         │   Category   │
├─────────────┤         ├─────────────────┤         ├──────────────┤
│ Id (PK)     │────┐    │ Id (PK)         │    ┌────│ Id (PK)      │
│ Email       │    │    │ Description     │    │    │ Name         │
│ PasswordHash│    │    │ Amount          │    │    │ Color        │
│ Name        │    │    │ Type            │    │    │ Icon         │
│ CreatedAt   │    └───>│ UserId (FK)     │    │    │ Type         │
│ UpdatedAt   │         │ CategoryId (FK) │<───┘    │ UserId (FK)  │
└─────────────┘         │ Date            │         └──────────────┘
                        │ CreatedAt       │
                        └─────────────────┘
```

---

## Authentication and Authorization

### Authentication Flow

1. **Registration**
   - POST /api/auth/register
   - User data validation
   - Password hashing with BCrypt
   - Create user in database
   - Return JWT token

2. **Login**
   - POST /api/auth/login
   - Validate credentials
   - Verify hashed password
   - Generate JWT token
   - Return token with user data

3. **Protected Requests**
   - Send token in Authorization header
   - Validate token in middleware
   - Extract user identity
   - Allow/deny access

### JWT Structure

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "exp": 1735654321
  },
  "signature": "..."
}
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | User login | No |
| POST | /api/auth/refresh | Refresh token | Yes |
| GET | /api/auth/me | Current user | Yes |

### Transactions

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/transactions | List all transactions | Yes |
| GET | /api/transactions/{id} | Get transaction | Yes |
| POST | /api/transactions | Create transaction | Yes |
| PUT | /api/transactions/{id} | Update transaction | Yes |
| DELETE | /api/transactions/{id} | Delete transaction | Yes |
| GET | /api/transactions/summary | Financial summary | Yes |

### Categories

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/categories | List categories | Yes |
| GET | /api/categories/{id} | Get category | Yes |
| POST | /api/categories | Create category | Yes |
| PUT | /api/categories/{id} | Update category | Yes |
| DELETE | /api/categories/{id} | Delete category | Yes |

### Health Check

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/health | API health status | No |

---

## Docker and DevOps

### Container Architecture

- **Backend Container**: .NET 10 API with SQLite
- **Frontend Container**: React SPA served with Nginx
- **Persistent Volume**: SQLite database data
- **Network**: Private network between containers

### Environments

1. **Development** (`docker-compose.dev.yml`)
   - Hot reload enabled
   - Source code volume mounts
   - Development environment variables
   - Debug ports exposed

2. **Production** (`docker-compose.prod.yml`)
   - Optimized builds
   - No source code mounts
   - Production environment variables
   - Restart policies configured

### Ports

- **Backend**: 5050 (HTTP), 5051 (HTTPS)
- **Frontend**: 3002
- **Swagger**: 5050/swagger

---

## Development Guidelines

### Code Style

**Backend (C#)**:
- Indentation: 4 spaces
- Braces: Allman style
- Namespaces: File-scoped
- Interfaces: Prefix `I`
- Private fields: Prefix `_`
- Async methods: Suffix `Async`

**Frontend (TypeScript/React)**:
- Indentation: 2 spaces
- No semicolons
- Single quotes for code, double for JSX
- Arrow functions: optional parentheses
- Max line: 160 characters
- Component names: PascalCase
- File names: kebab-case

### Git Workflow

1. Create feature branch: `feature/feature-name`
2. Make commits following Conventional Commits
3. Update tests
4. Create Pull Request
5. Code review
6. Merge to main

### Commit Convention

```
feat: add new feature
fix: fix bug
docs: update documentation
style: code formatting
refactor: code restructuring
test: add/update tests
chore: maintenance tasks
```

---

## Deployment

### Development

```bash
make dev           # Start in development
make dev-logs      # View logs
make dev-down      # Stop
```

### Production

```bash
make prod-build    # Build and start
make health        # Check health
make prod-logs     # View logs
make prod-down     # Stop
```

---

## Roadmap

### ✅ Phase 1 - Foundation (Complete)
- [x] Project architecture
- [x] Database modeling
- [x] Authentication infrastructure
- [x] Complete Docker setup
- [x] Basic documentation

### 🚧 Phase 2 - Core (In Progress)
- [ ] Complete CRUD endpoints
- [ ] Input validations
- [ ] Complete frontend integration
- [ ] Basic dashboard
- [ ] Unit tests

### 📅 Phase 3 - Features
- [ ] Advanced filters and search
- [ ] Interactive charts
- [ ] PDF reports
- [ ] Data export/import
- [ ] Notifications

### 📅 Phase 4 - Enhancement
- [ ] Financial goals
- [ ] Budgets
- [ ] Recurring transactions
- [ ] Multiple users/families
- [ ] Mobile responsive

### 📅 Phase 5 - Scale
- [ ] PostgreSQL migration
- [ ] Microservices
- [ ] CI/CD pipeline
- [ ] Monitoring and metrics
- [ ] Mobile app

---

## Important Notes

### Security

- Never commit secrets or sensitive data
- Use environment variables for all configurations
- Change JWT_SECRET in production
- Use HTTPS in production
- Implement rate limiting
- Add input sanitization

### Performance

- Use indexes in frequently queried fields
- Implement pagination in lists
- Cache frequently accessed data
- Optimize SQL queries
- Minify frontend assets

### Maintenance

- Keep dependencies updated
- Document all changes
- Write comprehensive tests
- Review logs regularly
- Monitor container health

---

**Last Updated**: December 30, 2025  
**Version**: 1.0.0  
**Maintained by**: Cristian Ricardo Leite
