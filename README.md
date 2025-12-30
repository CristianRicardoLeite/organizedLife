# OrganizedLife - Financial Organization System# OrganizedLife - Financial Organization System# OrganizedLife - Financial Organization System



## 📋 Description



Complete financial organization system developed with modern architecture, separating backend and frontend for scalability and maintainability. **Fully containerized with Docker!** 🐳## 📋 Description## 📋 Description



## 🚀 Technologies



### BackendComplete financial organization system developed with modern architecture, separating backend and frontend for scalability and maintainability. **Fully containerized with Docker!** 🐳Complete financial organization system developed with modern architecture, separating backend and frontend for scalability and maintainability. **Fully containerized with Docker!** 🐳

- **.NET 10**

- **ASP.NET Core Web API**

- **Entity Framework Core 10.0.0** (ORM)

- **SQLite** (Database)## 🚀 Technologies## 🚀 Technologies

- **JWT** (Authentication)

- **Swagger/OpenAPI** (API Documentation)

- **BCrypt** (Password Hashing)

- **AutoMapper** (Object Mapping)### Backend### Backend



### Frontend- **.NET 10**- **.NET 10**

- **React 18.2.0**

- **TypeScript 5.2.2**- **ASP.NET Core Web API**- **ASP.NET Core Web API**

- **Vite 5.0.8** (Build tool)

- **React Router 6.21.0** (Navigation)- **Entity Framework Core 10.0.0** (ORM)- **Entity Framework Core 10.0.0** (ORM)

- **Axios 1.6.2** (HTTP Client)

- **TanStack React Query 5.14.2** (State and cache)- **SQLite** (Database)- **SQLite** (Database)

- **React Hook Form + Zod** (Forms and validation)

- **Nginx** (Web server in production)- **JWT** (Authentication)- **JWT** (Authentication)



### DevOps- **Swagger/OpenAPI** (API Documentation)- **Swagger/OpenAPI** (API Documentation)

- **Docker** (Containerization)

- **Docker Compose** (Orchestration)- **BCrypt** (Password Hashing)- **BCrypt** (Password Hashing)

- **Multi-stage builds** (Image optimization)

- **Makefile** (Simplified commands)- **AutoMapper** (Object Mapping)- **AutoMapper** (Object Mapping)



## 📁 Project Structure



```### Frontend### Frontend

organizedLife/

├── backend/          # .NET Web API Project- **React 18.2.0**- **React 18.2.0**

│   ├── Controllers/  # API Controllers

│   ├── Models/       # Data Models- **TypeScript 5.2.2**- **TypeScript 5.2.2**

│   ├── Services/     # Business Logic

│   ├── Data/         # Database Context- **Vite 5.0.8** (Build tool)- **Vite 5.0.8** (Build tool)

│   └── ...

├── frontend/         # React Project- **React Router 6.21.0** (Navigation)- **React Router 6.21.0** (Navigation)

│   ├── src/

│   │   ├── components/  # React Components- **Axios 1.6.2** (HTTP Client)- **Axios 1.6.2** (HTTP Client)

│   │   ├── pages/       # Application Pages

│   │   ├── services/    # API Services- **TanStack React Query 5.14.2** (State and cache)- **TanStack React Query 5.14.2** (State and cache)

│   │   └── ...

│   └── ...- **React Hook Form + Zod** (Forms and validation)- **React Hook Form + Zod** (Forms and validation)

├── README.md

├── GUIDELINES.md     # Project Guidelines- **Nginx** (Web server in production)- **Nginx** (Web server in production)

└── .gitignore

```



## 🐳 Quick Start with Docker (Recommended)### DevOps### DevOps



### Prerequisites- **Docker** (Containerization)- **Docker** (Containerization)

- Docker >= 20.10

- Docker Compose >= 2.0- **Docker Compose** (Orchestration)- **Docker Compose** (Orchestration)

- Make (optional, but recommended)

- **Multi-stage builds** (Image optimization)- **Multi-stage builds** (Image optimization)

### 1. Clone the repository

```bash- **Makefile** (Simplified commands)- **Makefile** (Simplified commands)

git clone https://github.com/CristianRicardoLeite/organizedLife.git

cd organizedLife

```

## 📁 Project Structure## 📁 Project Structure

### 2. Configure environment variables

```bash

cp .env.example .env

# Edit .env and configure your variables (especially JWT_SECRET)``````

```

organizedLife/organizedLife/

### 3. Run with Docker

├── backend/          # .NET Web API Project├── backend/          # Projeto .NET Web API

**Development (with hot reload):**

```bash│   ├── Controllers/  # API Controllers│   ├── Controllers/  # Controllers da API

make dev

# or│   ├── Models/       # Data Models│   ├── Models/       # Modelos de dados

docker compose -f docker-compose.yml -f docker-compose.dev.yml up

```│   ├── Services/     # Business Logic│   ├── Services/     # Lógica de negócio



**Production:**│   ├── Data/         # Database Context│   ├── Data/         # Contexto do banco de dados

```bash

make prod│   └── ...│   └── ...

# or

docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d├── frontend/         # React Project├── frontend/         # Projeto React

```

│   ├── src/│   ├── src/

### 4. Access the application

- **Frontend:** http://localhost:3002│   │   ├── components/  # React Components│   │   ├── components/  # Componentes React

- **Backend API:** http://localhost:5050

- **Swagger:** http://localhost:5050/swagger│   │   ├── pages/       # Application Pages│   │   ├── pages/       # Páginas da aplicação



### 📋 Useful Docker Commands│   │   ├── services/    # API Services│   │   ├── services/    # Serviços de API



```bash│   │   └── ...│   │   └── ...

# Development

make dev              # Start development environment│   └── ...│   └── ...

make dev-build        # Build and start dev

make dev-down         # Stop dev environment├── README.md├── README.md



# Production├── GUIDELINES.md     # Project Guidelines├── GUIDELINES.md     # Diretrizes do projeto

make prod             # Start production environment

make prod-build       # Build and start prod└── .gitignore└── .gitignore

make prod-down        # Stop prod environment

``````

# Utilities

make logs             # View logs from all containers

make logs-backend     # View backend logs

make logs-frontend    # View frontend logs## 🐳 Quick Start with Docker (Recommended)## � Quick Start com Docker (Recomendado)

make shell-backend    # Access backend shell

make shell-frontend   # Access frontend shell

make clean            # Clean containers and volumes

make help             # View all available commands### Prerequisites### Pré-requisitos

```

- Docker >= 20.10- Docker >= 20.10

For complete Docker documentation, see [DOCKER.md](DOCKER.md).

- Docker Compose >= 2.0- Docker Compose >= 2.0

---

- Make (optional, but recommended)- Make (opcional, mas recomendado)

## 🛠️ How to Run WITHOUT Docker (Traditional Method)



### Backend (.NET)

### 1. Clone the repository### 1. Clone o repositório

1. Navigate to the backend folder:

   ```bash```bash```bash

   cd backend/OrganizedLife.API

   ```git clone https://github.com/CristianRicardoLeite/organizedLife.gitgit clone https://github.com/CristianRicardoLeite/organizedLife.git



2. Restore dependencies:cd organizedLifecd organizedLife

   ```bash

   dotnet restore``````

   ```



3. Apply migrations:

   ```bash### 2. Configure environment variables### 2. Configure as variáveis de ambiente

   dotnet ef database update

   ``````bash```bash



4. Run the project:cp .env.example .envcp .env.example .env

   ```bash

   dotnet run# Edit .env and configure your variables (especially JWT_SECRET)# Edite o .env e configure suas variáveis (principalmente JWT_SECRET)

   ```

``````

5. The API will be available at: `http://localhost:5000`



6. Access Swagger documentation at: `http://localhost:5000/swagger`

### 3. Run with Docker### 3. Execute com Docker

### Frontend (React)



1. Navigate to the frontend folder:

   ```bash**Development (with hot reload):****Desenvolvimento (com hot reload):**

   cd frontend

   ``````bash```bash



2. Install dependencies:make devmake dev

   ```bash

   npm install# or# ou

   ```

docker compose -f docker-compose.yml -f docker-compose.dev.yml updocker-compose -f docker-compose.dev.yml up

3. Run the project:

   ```bash``````

   npm run dev

   ```



4. The application will be available at: `http://localhost:5173`**Production:****Produção:**



## 🎯 Features```bash```bash



### ✅ Implementedmake prodmake prod

- Complete project structure (Backend + Frontend)

- SQLite database configuration# or# ou

- Migrations and data seeding

- Entities: User, Transaction, Categorydocker compose -f docker-compose.yml -f docker-compose.prod.yml up -ddocker-compose -f docker-compose.prod.yml up -d

- DTOs and base services

- Authentication context (frontend)``````

- Route system with protection

- **Complete Docker and Docker Compose**

- **Development and production environments**

- **Health checks and monitoring**### 4. Access the application### 4. Acesse a aplicação



### 🚧 In Development- **Frontend:** http://localhost:3002- **Frontend:** http://localhost:3000 (prod) ou http://localhost:5173 (dev)

- [ ] AuthController (Login/Register) in backend

- [ ] TransactionsController (CRUD)- **Backend API:** http://localhost:5050- **Backend API:** http://localhost:5000

- [ ] CategoriesController (CRUD)

- [ ] Validations with FluentValidation- **Swagger:** http://localhost:5050/swagger- **Swagger:** http://localhost:5000/swagger

- [ ] Complete frontend-backend integration

- [ ] Dashboard with charts



### 📅 Planned### 📋 Useful Docker Commands### 📋 Comandos Docker Úteis

- [ ] Financial goals

- [ ] Notifications and reminders

- [ ] Advanced reports

- [ ] Data export```bash```bash

- [ ] Customizable themes

# Development# Desenvolvimento

## 📝 Documentation

make dev              # Start development environmentmake dev              # Inicia ambiente de desenvolvimento

- **[PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)** - 🎯 **READ FIRST!** Complete project context

- **[DOCKER.md](DOCKER.md)** - 🐳 Complete Docker documentationmake dev-build        # Build and start devmake dev-build        # Build e inicia dev

- **[GUIDELINES.md](GUIDELINES.md)** - 📚 Development guidelines

- **[backend/README.md](backend/README.md)** - Backend documentationmake dev-down         # Stop dev environmentmake dev-down         # Para ambiente dev

- **[frontend/README.md](frontend/README.md)** - Frontend documentation



## 🔧 Development

# Production# Produção

### Code Standards

make prod             # Start production environmentmake prod             # Inicia ambiente de produção

**Frontend (React/TypeScript):**

- Indentation: 2 spacesmake prod-build       # Build and start prodmake prod-build       # Build e inicia prod

- No semicolons

- Single quotes for code, double for JSXmake prod-down        # Stop prod environmentmake prod-down        # Para ambiente prod

- Arrow functions with optional parentheses

- Max line length: 160 characters



**Backend (C#):**# Utilities# Utilitários

- Indentation: 4 spaces

- Brace style: Allmanmake logs             # View logs from all containersmake logs             # Ver logs de todos os containers

- Namespaces: File-scoped

- Interfaces: Prefix `I`make logs-backend     # View backend logsmake logs-backend     # Ver logs do backend

- Private fields: Prefix `_`

make logs-frontend    # View frontend logsmake logs-frontend    # Ver logs do frontend

### Automatic Formatting

make shell-backend    # Access backend shellmake shell-backend    # Acessar shell do backend

The project is configured for automatic formatting on save:

- **Frontend:** ESLint + Prettiermake shell-frontend   # Access frontend shellmake shell-frontend   # Acessar shell do frontend

- **Backend:** EditorConfig + dotnet format

make clean            # Clean containers and volumesmake clean            # Limpar containers e volumes

## 🤝 Contributing

make help             # View all available commandsmake help             # Ver todos os comandos disponíveis

1. Fork the project

2. Create a branch: `git checkout -b feature/MyFeature```````

3. Commit your changes: `git commit -m 'feat: add MyFeature'`

4. Push to the branch: `git push origin feature/MyFeature`

5. Open a Pull Request

For complete Docker documentation, see [DOCKER.md](DOCKER.md).Para documentação completa do Docker, consulte [DOCKER.md](DOCKER.md).

## 📄 License



This project is private and for personal use.

------

## 👤 Author



**Cristian Ricardo Leite**

- GitHub: [@CristianRicardoLeite](https://github.com/CristianRicardoLeite)## 🛠️ How to Run WITHOUT Docker (Traditional Method)## �🛠️ Como Executar SEM Docker (Método Tradicional)



---



**Project Status:** 🚧 Actively In Development### Backend (.NET)### Backend (.NET)



Developed with ❤️ to improve your financial organization


1. Navigate to the backend folder:1. Navegue até a pasta do backend:

   ```bash   ```bash

   cd backend/OrganizedLife.API   cd backend/OrganizedLife.API

   ```   ```



2. Restore dependencies:2. Restaure as dependências:

   ```bash   ```bash

   dotnet restore   dotnet restore

   ```   ```



3. Apply migrations:3. Aplique as migrations:

   ```bash   ```bash

   dotnet ef database update   dotnet ef database update

   ```   ```



4. Run the project:4. Execute o projeto:

   ```bash   ```bash

   dotnet run   dotnet run

   ```   ```



5. The API will be available at: `http://localhost:5000`5. A API estará disponível em: `http://localhost:5000`



6. Access Swagger documentation at: `http://localhost:5000/swagger`6. Acesse a documentação Swagger em: `http://localhost:5000/swagger`



### Frontend (React)### Frontend (React)



1. Navigate to the frontend folder:1. Navegue até a pasta do frontend:

   ```bash   ```bash

   cd frontend   cd frontend

   ```   ```



2. Install dependencies:2. Instale as dependências:

   ```bash   ```bash

   npm install   npm install

   ```   ```



3. Run the project:3. Execute o projeto:

   ```bash   ```bash

   npm run dev   npm run dev

   ```   ```



4. The application will be available at: `http://localhost:5173`4. A aplicação estará disponível em: `http://localhost:5173`



## 🎯 Features## 🎯 Funcionalidades



### ✅ Implemented### ✅ Implementado

- Complete project structure (Backend + Frontend)- Estrutura completa do projeto (Backend + Frontend)

- SQLite database configuration- Configuração do banco de dados SQLite

- Migrations and data seeding- Migrations e seed de dados

- Entities: User, Transaction, Category- Entidades: User, Transaction, Category

- DTOs and base services- DTOs e serviços base

- Authentication context (frontend)- Context de autenticação (frontend)

- Route system with protection- Sistema de rotas com proteção

- **Complete Docker and Docker Compose**- **Docker e Docker Compose completos**

- **Development and production environments**- **Ambientes de desenvolvimento e produção**

- **Health checks and monitoring**- **Health checks e monitoramento**



### 🚧 In Development### 🚧 Em Desenvolvimento

- [ ] AuthController (Login/Register) in backend- [ ] AuthController (Login/Register) no backend

- [ ] TransactionsController (CRUD)- [ ] TransactionsController (CRUD)

- [ ] CategoriesController (CRUD)- [ ] CategoriesController (CRUD)

- [ ] Validations with FluentValidation- [ ] Validações com FluentValidation

- [ ] Complete frontend-backend integration- [ ] Integração completa frontend-backend

- [ ] Dashboard with charts- [ ] Dashboard com gráficos



### 📅 Planned### 📅 Planejadas

- [ ] Financial goals- [ ] Metas financeiras

- [ ] Notifications and reminders- [ ] Notificações e lembretes

- [ ] Advanced reports- [ ] Relatórios avançados

- [ ] Data export- [ ] Export de dados

- [ ] Customizable themes- [ ] Temas customizáveis



## 📝 Documentation## 📝 Documentação



- **[CONTEXTO_PROJETO.md](CONTEXTO_PROJETO.md)** - 🎯 **READ FIRST!** Complete project context- **[CONTEXTO_PROJETO.md](CONTEXTO_PROJETO.md)** - 🎯 **LEIA PRIMEIRO!** Contexto completo do projeto

- **[DOCKER.md](DOCKER.md)** - 🐳 Complete Docker documentation- **[DOCKER.md](DOCKER.md)** - 🐳 Documentação completa do Docker

- **[GUIDELINES.md](GUIDELINES.md)** - 📚 Development guidelines- **[GUIDELINES.md](GUIDELINES.md)** - 📚 Diretrizes de desenvolvimento

- **[backend/README.md](backend/README.md)** - Backend documentation- **[backend/README.md](backend/README.md)** - Documentação do backend

- **[frontend/README.md](frontend/README.md)** - Frontend documentation- **[frontend/README.md](frontend/README.md)** - Documentação do frontend



## 🔧 Development## 🔧 Desenvolvimento



### Code Standards### Padrões de Código



**Frontend (React/TypeScript):****Frontend (React/TypeScript):**

- Indentation: 2 spaces- Indentação: 2 espaços

- No semicolons- Sem ponto-e-vírgula

- Single quotes for code, double for JSX- Aspas simples para código, duplas para JSX

- Arrow functions with optional parentheses- Arrow functions com parênteses opcionais

- Max line length: 160 characters- Linha máxima: 160 caracteres



**Backend (C#):****Backend (C#):**

- Indentation: 4 spaces- Indentação: 4 espaços

- Brace style: Allman- Estilo de chaves: Allman

- Namespaces: File-scoped- Namespaces: File-scoped

- Interfaces: Prefix `I`- Interfaces: Prefixo `I`

- Private fields: Prefix `_`- Campos privados: Prefixo `_`



### Automatic Formatting### Formatação Automática



The project is configured for automatic formatting on save:O projeto está configurado para formatação automática ao salvar:

- **Frontend:** ESLint + Prettier- **Frontend:** ESLint + Prettier

- **Backend:** EditorConfig + dotnet format- **Backend:** EditorConfig + dotnet format



## 🤝 Contributing## 🤝 Contribuindo



1. Fork the project1. Fork o projeto

2. Create a branch: `git checkout -b feature/MyFeature`2. Crie uma branch: `git checkout -b feature/MinhaFeature`

3. Commit your changes: `git commit -m 'feat: add MyFeature'`3. Commit suas mudanças: `git commit -m 'feat: adiciona MinhaFeature'`

4. Push to the branch: `git push origin feature/MyFeature`4. Push para a branch: `git push origin feature/MinhaFeature`

5. Open a Pull Request5. Abra um Pull Request



## 📄 License## 📄 Licença



This project is private and for personal use.Este projeto é privado e de uso pessoal.



## 👤 Author## 👤 Autor



**Cristian Ricardo Leite****Cristian Ricardo Leite**

- GitHub: [@CristianRicardoLeite](https://github.com/CristianRicardoLeite)- GitHub: [@CristianRicardoLeite](https://github.com/CristianRicardoLeite)



------



**Project Status:** 🚧 Actively In Development**Status do Projeto:** 🚧 Em Desenvolvimento Ativo



Developed with ❤️ to improve your financial organization- [Diretrizes do Projeto](./GUIDELINES.md)

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

## 👥 Contribuição

1. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
2. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
3. Push para a branch (`git push origin feature/nova-funcionalidade`)
4. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com ❤️ para melhorar sua organização financeira
