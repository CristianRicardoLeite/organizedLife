# Backend - OrganizedLife API

## 📋 Descrição

API RESTful desenvolvida em .NET para o sistema de organização financeira OrganizedLife.

## 🚀 Tecnologias

- **.NET 8** (ou superior)
- **ASP.NET Core Web API**
- **Entity Framework Core**
- **SQL Server**
- **JWT Authentication**
- **Swagger/OpenAPI**

## 📁 Estrutura do Projeto

```
backend/
├── Controllers/        # API Controllers
├── Services/          # Lógica de negócio
├── Repositories/      # Camada de acesso a dados
├── Models/
│   ├── Entities/      # Entidades do banco de dados
│   ├── DTOs/          # Data Transfer Objects
│   └── ViewModels/    # View Models
├── Data/              # DbContext e Migrations
├── Middleware/        # Middleware customizado
├── Extensions/        # Extension Methods
├── Configurations/    # Configurações
├── appsettings.json   # Configurações da aplicação
└── Program.cs         # Entry Point
```

## 🛠️ Como Executar

### Pré-requisitos

- .NET 8 SDK ou superior
- SQL Server (ou SQL Server Express)
- Visual Studio 2022, VS Code, ou Rider

### Passos

1. **Navegue até a pasta do backend**:
   ```bash
   cd backend
   ```

2. **Restaure as dependências**:
   ```bash
   dotnet restore
   ```

3. **Configure a connection string** no `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=OrganizedLifeDB;Trusted_Connection=True;TrustServerCertificate=True;"
     }
   }
   ```

4. **Execute as migrations** (quando criadas):
   ```bash
   dotnet ef database update
   ```

5. **Execute o projeto**:
   ```bash
   dotnet run
   ```

6. **Acesse a API**:
   - API: `https://localhost:5001` ou `http://localhost:5000`
   - Swagger UI: `https://localhost:5001/swagger`

## 📦 Pacotes NuGet Principais

```bash
# Entity Framework Core
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools

# Authentication
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer

# Swagger
dotnet add package Swashbuckle.AspNetCore

# Outros úteis
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
dotnet add package FluentValidation.AspNetCore
```

## 🎯 Endpoints Principais (Planejados)

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token

### Usuários
- `GET /api/users/profile` - Obter perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil

### Transações
- `GET /api/transactions` - Listar transações
- `GET /api/transactions/{id}` - Obter transação específica
- `POST /api/transactions` - Criar transação
- `PUT /api/transactions/{id}` - Atualizar transação
- `DELETE /api/transactions/{id}` - Deletar transação

### Categorias
- `GET /api/categories` - Listar categorias
- `POST /api/categories` - Criar categoria
- `PUT /api/categories/{id}` - Atualizar categoria
- `DELETE /api/categories/{id}` - Deletar categoria

### Relatórios
- `GET /api/reports/summary` - Resumo financeiro
- `GET /api/reports/by-category` - Relatório por categoria
- `GET /api/reports/monthly` - Relatório mensal

## 🔒 Segurança

- **JWT Authentication**: Tokens com expiração
- **Password Hashing**: BCrypt ou ASP.NET Core Identity
- **CORS**: Configurado para permitir requisições do frontend
- **HTTPS**: Obrigatório em produção
- **Validation**: FluentValidation para validação de dados

## 🧪 Testes

Execute os testes com:
```bash
dotnet test
```

## 📝 Comandos Úteis

```bash
# Criar nova migration
dotnet ef migrations add NomeDaMigration

# Atualizar banco de dados
dotnet ef database update

# Reverter migration
dotnet ef database update PreviousMigrationName

# Limpar e recompilar
dotnet clean && dotnet build

# Executar em modo watch (auto-reload)
dotnet watch run
```

## 🌐 Variáveis de Ambiente

Crie um arquivo `appsettings.Development.json` (não commitado) para desenvolvimento:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "sua-connection-string"
  },
  "JwtSettings": {
    "Secret": "sua-chave-secreta-muito-longa-e-segura",
    "ExpirationInMinutes": 60,
    "RefreshExpirationInDays": 7
  }
}
```

## 📚 Recursos

- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core/)
- [Entity Framework Core](https://docs.microsoft.com/ef/core/)
- [JWT Authentication](https://jwt.io/)

---

Para mais informações sobre padrões e convenções, consulte [GUIDELINES.md](../GUIDELINES.md)
