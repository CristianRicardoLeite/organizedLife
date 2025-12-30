# 🎯 CONTEXTO DO PROJETO - OrganizedLife

> **Leia este arquivo ANTES de fazer qualquer modificação no código!**

---

## 📌 Visão Geral

**Nome:** OrganizedLife  
**Tipo:** Sistema de Organização Financeira Pessoal  
**Status:** 🚧 Em Desenvolvimento  
**Repositório:** https://github.com/CristianRicardoLeite/organizedLife

---

## 🏗️ Arquitetura

### Backend (.NET 10)
- **Framework:** ASP.NET Core Web API
- **ORM:** Entity Framework Core 10.0.0
- **Banco de Dados:** SQLite (desenvolvimento)
- **Autenticação:** JWT Bearer Token
- **Documentação API:** Swagger/OpenAPI
- **Padrão:** Clean Architecture (Controllers → Services → Repositories)

**Portas:**
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`
- Swagger: `http://localhost:5000/swagger`

**Caminho:** `/backend/OrganizedLife.API/`

### Frontend (React 18)
- **Framework:** React 18.2.0
- **Linguagem:** TypeScript 5.2.2
- **Build Tool:** Vite 5.0.8
- **Roteamento:** React Router 6.21.0
- **Estado:** Context API + TanStack React Query 5.14.2
- **HTTP Client:** Axios 1.6.2
- **Formulários:** React Hook Form + Zod
- **Estilização:** CSS puro (por enquanto)

**Porta:** `http://localhost:5173`

**Caminho:** `/frontend/`

---

## 📂 Estrutura de Pastas

```
organizedLife/
├── backend/
│   └── OrganizedLife.API/
│       ├── Controllers/        # Endpoints da API
│       ├── Models/
│       │   ├── Entities/      # User, Transaction, Category
│       │   └── DTOs/          # Data Transfer Objects
│       ├── Data/              # DbContext e Migrations
│       ├── Services/          # (a implementar)
│       ├── Repositories/      # (a implementar)
│       └── Extensions/        # ServiceExtensions
├── frontend/
│   └── src/
│       ├── components/
│       │   └── common/        # ProtectedRoute
│       ├── pages/             # Home, Login, Register, Dashboard, Transactions
│       ├── context/           # AuthContextDefinition, AuthContext
│       ├── hooks/             # useAuth
│       ├── services/          # api, authService, transactionService
│       ├── types/             # TypeScript interfaces
│       └── styles/            # CSS global
└── docs/                      # Documentação (se necessário)
```

---

## 🗄️ Banco de Dados (SQLite)

**Arquivo:** `backend/OrganizedLife.API/organizedlife.db`

### Entidades:

#### **Users**
- Id (Guid)
- Name (string)
- Email (string, unique)
- PasswordHash (string)
- CreatedAt (DateTime)

#### **Transactions**
- Id (Guid)
- UserId (Guid, FK)
- Amount (decimal)
- Description (string)
- Type (enum: Income/Expense)
- Date (DateTime)
- CategoryId (Guid, FK)
- CreatedAt (DateTime)

#### **Categories**
- Id (Guid)
- Name (string)
- Icon (string)
- Color (string)
- Type (enum: Income/Expense/Both)
- UserId (Guid?, FK - nullable para categorias padrão)
- CreatedAt (DateTime)

**Categorias Padrão (8):**
- Salário (Income)
- Alimentação (Expense)
- Transporte (Expense)
- Moradia (Expense)
- Lazer (Expense)
- Saúde (Expense)
- Educação (Expense)
- Outros (Both)

---

## 🎨 Padrões de Código

### Frontend (React/TypeScript)

**Regras ESLint/Prettier:**
- ✅ Indentação: **2 espaços**
- ✅ Ponto-e-vírgula: **NUNCA** (semi: false)
- ✅ Aspas: **Simples** para código, **Duplas** para JSX
- ✅ Arrow parens: **Sem parênteses** para único parâmetro
- ✅ Arrow body: **Return implícito** quando possível
- ✅ Trailing commas: **Sempre** em multi-linha
- ✅ Max line length: **160 caracteres**
- ✅ JSX: Aspas duplas

**Exemplo:**
```typescript
// ✅ CORRETO
const Component = () => (
  <div className="container">
    <Button onClick={e => handleClick(e.id)} />
  </div>
)

// ❌ ERRADO
const Component = () => {
  return (
    <div className='container'>
      <Button onClick={(e) => handleClick(e.id)}></Button>
    </div>
  );
};
```

### Backend (C#)

**Regras EditorConfig:**
- ✅ Indentação: **4 espaços**
- ✅ Estilo de chaves: **Allman** (chaves em nova linha)
- ✅ Namespaces: **File-scoped**
- ✅ Interfaces: Prefixo **I**
- ✅ Campos privados: Prefixo **_underscore**
- ✅ Max line length: **160 caracteres**

**Exemplo:**
```csharp
// ✅ CORRETO
namespace OrganizedLife.API.Controllers;

public class TransactionController : ControllerBase
{
    private readonly ITransactionService _transactionService;
    
    public TransactionController(ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }
}

// ❌ ERRADO
namespace OrganizedLife.API.Controllers {
  public class TransactionController : ControllerBase {
    private ITransactionService transactionService;
  }
}
```

---

## 🚀 Como Rodar o Projeto

### Backend:
```bash
cd backend/OrganizedLife.API
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend:
```bash
cd frontend
npm install
npm run dev
```

---

## 📋 Estado Atual do Projeto

### ✅ Implementado:
- Estrutura básica do projeto
- Configuração do banco de dados SQLite
- Migrations iniciais
- Entidades (User, Transaction, Category)
- DTOs básicos
- Health check endpoint
- Estrutura de rotas no frontend
- Context de autenticação (sem backend conectado)
- Páginas básicas (Home, Login, Register, Dashboard, Transactions)
- Configuração completa de ESLint e Prettier
- EditorConfig para C#

### 🚧 Pendente:
- [ ] Implementar AuthController (Login/Register)
- [ ] Implementar TransactionsController (CRUD)
- [ ] Implementar CategoriesController (CRUD)
- [ ] Criar camada de Services
- [ ] Criar camada de Repositories
- [ ] Implementar validações (FluentValidation)
- [ ] Conectar frontend ao backend
- [ ] Implementar dashboard com gráficos
- [ ] Testes unitários
- [ ] Deploy

---

## 🔧 Dependências Principais

### Backend NuGet:
```xml
<PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="10.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="10.0.0" />
<PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="10.0.0" />
<PackageReference Include="Swashbuckle.AspNetCore" Version="10.0.0" />
<PackageReference Include="AutoMapper.Extensions.Microsoft.DependencyInjection" Version="12.0.1" />
<PackageReference Include="BCrypt.Net-Next" Version="4.0.3" />
```

### Frontend NPM:
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.21.0",
  "@tanstack/react-query": "^5.14.2",
  "axios": "^1.6.2",
  "react-hook-form": "^7.49.2",
  "zod": "^3.22.4",
  "date-fns": "^3.0.6",
  "recharts": "^2.10.3",
  "lucide-react": "^0.303.0"
}
```

---

## 🔐 Autenticação

**Tipo:** JWT Bearer Token

**Fluxo:**
1. User faz POST `/api/auth/login` ou `/api/auth/register`
2. Backend valida credenciais
3. Backend retorna JWT token + user data
4. Frontend salva token no localStorage
5. Axios interceptor adiciona token em todas as requisições
6. Backend valida token em endpoints protegidos

**Interceptor já configurado em:** `frontend/src/services/api.ts`

---

## 📝 Convenções de Commit

Use mensagens claras e descritivas:

```bash
# Formato
git commit -m "tipo: descrição curta"

# Exemplos
git commit -m "feat: adiciona controller de autenticação"
git commit -m "fix: corrige validação de email no login"
git commit -m "refactor: melhora estrutura de pastas"
git commit -m "docs: atualiza README com instruções"
git commit -m "style: ajusta formatação do código"
git commit -m "test: adiciona testes para TransactionService"
```

---

## 🐛 Debug e Logs

### Backend:
- Logs aparecem no terminal onde `dotnet run` está executando
- Swagger disponível em `/swagger`
- Banco de dados SQLite pode ser inspecionado com SQLite Browser

### Frontend:
- Console do navegador (F12)
- React DevTools
- Network tab para ver requisições HTTP

---

## 🔄 Comandos Git Úteis

```bash
# Status
git status

# Adicionar alterações
git add .

# Commit
git commit -m "mensagem"

# Push
git push

# Pull (atualizar)
git pull

# Ver branches
git branch

# Criar branch
git checkout -b feature/nome-da-feature

# Trocar branch
git checkout main

# Histórico
git log --oneline --graph
```

---

## 📚 Documentação Adicional

Para informações mais detalhadas, consulte:
- `README.md` - Visão geral e setup rápido
- `GUIDELINES.md` - Diretrizes completas de desenvolvimento
- `backend/README.md` - Documentação específica do backend
- `frontend/README.md` - Documentação específica do frontend

---

## ⚠️ IMPORTANTE: Antes de Codificar

1. **Leia este arquivo** para entender o contexto
2. **Verifique o estado atual** (o que está implementado)
3. **Siga os padrões de código** (ESLint/EditorConfig)
4. **Teste localmente** antes de commitar
5. **Faça commits pequenos e frequentes**
6. **Não commite o banco de dados** (já está no .gitignore)
7. **Não commite node_modules** (já está no .gitignore)

---

## 🎯 Próximo Passo Sugerido

**Implementar o AuthController no backend:**
1. Criar `Controllers/AuthController.cs`
2. Implementar endpoints de Login e Register
3. Usar BCrypt para hash de senha
4. Gerar JWT token
5. Testar com Swagger
6. Conectar frontend

---

**Última atualização:** 30 de dezembro de 2025  
**Versão:** 1.0.0  
**Autor:** Cristian Ricardo Leite
