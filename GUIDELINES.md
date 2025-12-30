# 📚 Development Guidelines - OrganizedLife# 📚 Diretrizes do Projeto OrganizedLife



Complete guide with coding standards, best practices, and conventions for the project.Este documento define os padrões, convenções e boas práticas para o desenvolvimento do sistema OrganizedLife.



## 📑 Table of Contents## 🎯 Visão Geral



- [Code Style](#code-style)O OrganizedLife é um sistema de organização financeira pessoal que permite aos usuários gerenciar suas finanças de forma eficiente e intuitiva.

- [File Structure](#file-structure)

- [Naming Conventions](#naming-conventions)### Objetivos do Projeto

- [Best Practices](#best-practices)

- [Git Workflow](#git-workflow)1. **Simplicidade**: Interface intuitiva e fácil de usar

- [Testing](#testing)2. **Escalabilidade**: Arquitetura preparada para crescimento

- [Documentation](#documentation)3. **Segurança**: Proteção de dados financeiros sensíveis

- [Security](#security)4. **Performance**: Respostas rápidas e experiência fluida

- [Performance](#performance)5. **Manutenibilidade**: Código limpo e bem documentado



------



## Code Style## 🏗️ Arquitetura



### Backend (C#)### Padrão Arquitetural



#### General Configuration- **Backend**: Clean Architecture / N-Layer Architecture

  - **Controllers**: Recebem requisições HTTP

```csharp  - **Services**: Lógica de negócio

// File-scoped namespace (C# 10+)  - **Repositories**: Acesso a dados

namespace OrganizedLife.API.Controllers;  - **Models/Entities**: Representação de dados



// Interfaces with prefix I- **Frontend**: Component-Based Architecture

public interface IUserService { }  - **Pages**: Páginas da aplicação

  - **Components**: Componentes reutilizáveis

// Private fields with underscore  - **Services**: Comunicação com API

private readonly IUserService _userService;  - **Hooks**: Lógica compartilhada

  - **Context/State**: Gerenciamento de estado

// Async methods with suffix Async

public async Task<User> GetUserAsync(int id)### Comunicação

{

    // Allman brace style- **Protocolo**: RESTful API

    return await _userService.GetByIdAsync(id);- **Formato**: JSON

}- **Autenticação**: JWT (JSON Web Tokens)

```- **CORS**: Configurado para permitir requisições do frontend



#### Indentation and Formatting---



- **Indentation**: 4 spaces (no tabs)## 💻 Padrões de Código

- **Brace style**: Allman (braces on new line)

- **Max line**: 120 characters### Backend (.NET/C#)

- **Spaces**: Around operators and after commas

- **Empty lines**: Between methods and logical blocks#### Convenções de Nomenclatura



#### Naming Conventions- **Classes, Interfaces, Métodos**: `PascalCase`

  ```csharp

| Element | Convention | Example |  public class UserService { }

|---------|-----------|----------|  public interface IUserRepository { }

| Classes | PascalCase | `UserService` |  public void GetUserById(int id) { }

| Interfaces | PascalCase + I prefix | `IUserRepository` |  ```

| Methods | PascalCase | `GetUserById` |

| Properties | PascalCase | `UserName` |- **Variáveis locais, parâmetros**: `camelCase`

| Parameters | camelCase | `userId` |  ```csharp

| Local variables | camelCase | `userCount` |  int userId = 1;

| Private fields | camelCase + _ prefix | `_dbContext` |  string userName = "John";

| Constants | PascalCase | `MaxRetries` |  ```



#### Example- **Constantes**: `UPPER_SNAKE_CASE` ou `PascalCase`

  ```csharp

```csharp  public const int MAX_LOGIN_ATTEMPTS = 3;

namespace OrganizedLife.API.Services;  ```



public class UserService : IUserService- **Propriedades privadas**: `_camelCase` (com underscore)

{  ```csharp

    private readonly IUserRepository _userRepository;  private readonly IUserRepository _userRepository;

    private readonly ILogger<UserService> _logger;  ```

    private const int MaxAttempts = 3;

#### Boas Práticas

    public UserService(

        IUserRepository userRepository,1. **Dependency Injection**: Sempre usar injeção de dependência

        ILogger<UserService> logger)2. **Async/Await**: Usar operações assíncronas para I/O

    {3. **DTOs**: Usar Data Transfer Objects para comunicação API

        _userRepository = userRepository;4. **Validação**: Validar dados de entrada com Data Annotations ou FluentValidation

        _logger = logger;5. **Tratamento de Erros**: Usar middleware global para tratamento de exceções

    }6. **Logging**: Implementar logs estruturados com Serilog ou ILogger



    public async Task<UserDto> GetUserByIdAsync(int userId)#### Estrutura de Pastas Backend

    {

        try```

        {backend/

            var user = await _userRepository.GetByIdAsync(userId);├── Controllers/        # API Controllers

            ├── Services/          # Business Logic

            if (user == null)├── Repositories/      # Data Access Layer

            {├── Models/

                _logger.LogWarning("User {UserId} not found", userId);│   ├── Entities/      # Database Entities

                return null;│   ├── DTOs/          # Data Transfer Objects

            }│   └── ViewModels/    # View Models

├── Data/              # DbContext e Migrations

            return MapToDto(user);├── Middleware/        # Custom Middleware

        }├── Extensions/        # Extension Methods

        catch (Exception ex)├── Configurations/    # Configurações

        {└── Program.cs         # Entry Point

            _logger.LogError(ex, "Error getting user {UserId}", userId);```

            throw;

        }#### Exemplo de Controller

    }

```csharp

    private UserDto MapToDto(User user)[ApiController]

    {[Route("api/[controller]")]

        return new UserDtopublic class TransactionsController : ControllerBase

        {{

            Id = user.Id,    private readonly ITransactionService _transactionService;

            Name = user.Name,    

            Email = user.Email    public TransactionsController(ITransactionService transactionService)

        };    {

    }        _transactionService = transactionService;

}    }

```    

    [HttpGet]

---    [Authorize]

    public async Task<ActionResult<IEnumerable<TransactionDto>>> GetAll()

### Frontend (TypeScript/React)    {

        var transactions = await _transactionService.GetAllAsync();

#### General Configuration        return Ok(transactions);

    }

```typescript}

// No semicolons```

const greeting = 'Hello World'

---

// Single quotes for code, double for JSX

const name = 'John'### Frontend (React/TypeScript)

const element = <div className="container">Content</div>

#### Convenções de Nomenclatura

// Arrow functions with optional parentheses

const add = (a: number, b: number) => a + b- **Componentes**: `PascalCase`

const greet = name => `Hello ${name}`  ```typescript

  const UserProfile = () => { }

// 2-space indentation  ```

const user = {

  id: 1,- **Variáveis, Funções**: `camelCase`

  name: 'John',  ```typescript

  active: true,  const userName = "John";

}  const handleClick = () => { }

```  ```



#### Naming Conventions- **Constantes**: `UPPER_SNAKE_CASE`

  ```typescript

| Element | Convention | Example |  const API_BASE_URL = "https://api.example.com";

|---------|-----------|----------|  ```

| Components | PascalCase | `UserProfile` |

| Functions | camelCase | `getUserData` |- **Interfaces/Types**: `PascalCase` com prefixo `I` opcional

| Variables | camelCase | `userName` |  ```typescript

| Constants | UPPER_SNAKE_CASE | `API_BASE_URL` |  interface User { }

| Types/Interfaces | PascalCase | `UserData`, `ApiResponse` |  type UserProfile = { }

| Files | kebab-case | `user-profile.tsx` |  ```

| Folders | kebab-case | `user-components/` |

- **Arquivos**: 

#### Component Structure  - Componentes: `PascalCase.tsx`

  - Utils/Hooks: `camelCase.ts`

```typescript

// Imports#### Boas Práticas

import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'1. **TypeScript**: Sempre tipar variáveis e funções

import { getUserById } from '@/services/user-service'2. **Componentes Funcionais**: Preferir function components com hooks

import type { User } from '@/types/user'3. **Props**: Definir interfaces para props

4. **State Management**: Usar Context API ou Redux/Zustand para estado global

// Types/Interfaces5. **Custom Hooks**: Extrair lógica reutilizável para hooks customizados

interface UserProfileProps {6. **Error Boundaries**: Implementar tratamento de erros em componentes

  userId: number7. **Loading States**: Sempre mostrar feedback visual durante carregamento

  onUpdate?: (user: User) => void8. **Lazy Loading**: Usar React.lazy para code splitting

}

#### Estrutura de Pastas Frontend

// Component

export function UserProfile({ userId, onUpdate }: UserProfileProps) {```

  // Hooksfrontend/src/

  const navigate = useNavigate()├── components/        # Componentes reutilizáveis

  const [user, setUser] = useState<User | null>(null)│   ├── common/       # Componentes comuns (Button, Input, etc)

  const [loading, setLoading] = useState(true)│   └── layout/       # Layout components (Header, Footer, etc)

├── pages/            # Páginas da aplicação

  // Effects├── services/         # Serviços de API

  useEffect(() => {├── hooks/            # Custom Hooks

    loadUser()├── context/          # Context API

  }, [userId])├── types/            # TypeScript types/interfaces

├── utils/            # Funções utilitárias

  // Functions├── constants/        # Constantes

  const loadUser = async () => {├── styles/           # Estilos globais

    try {├── assets/           # Imagens, ícones, etc

      setLoading(true)├── App.tsx           # Componente principal

      const data = await getUserById(userId)└── main.tsx          # Entry point

      setUser(data)```

    } catch (error) {

      console.error('Error loading user:', error)#### Exemplo de Componente

    } finally {

      setLoading(false)```typescript

    }interface TransactionCardProps {

  }  transaction: Transaction;

  onDelete: (id: string) => void;

  const handleUpdate = (updatedUser: User) => {}

    setUser(updatedUser)

    onUpdate?.(updatedUser)export const TransactionCard: React.FC<TransactionCardProps> = ({ 

  }  transaction, 

  onDelete 

  // Render}) => {

  if (loading) return <div>Loading...</div>  const handleDelete = () => {

  if (!user) return <div>User not found</div>    onDelete(transaction.id);

  };

  return (  

    <div className="user-profile">  return (

      <h1>{user.name}</h1>    <div className="transaction-card">

      <p>{user.email}</p>      <h3>{transaction.description}</h3>

    </div>      <p>{transaction.amount}</p>

  )      <button onClick={handleDelete}>Delete</button>

}    </div>

```  );

};

#### Hooks```



```typescript---

// Custom hooks with "use" prefix

export function useUser(userId: number) {## 🔒 Segurança

  const [user, setUser] = useState<User | null>(null)

  const [loading, setLoading] = useState(false)### Backend

  const [error, setError] = useState<Error | null>(null)

1. **Autenticação**: Implementar JWT com refresh tokens

  useEffect(() => {2. **Autorização**: Usar [Authorize] attributes e policies

    const fetchUser = async () => {3. **Validação**: Validar todas as entradas do usuário

      try {4. **SQL Injection**: Usar Entity Framework (parameterized queries)

        setLoading(true)5. **CORS**: Configurar CORS adequadamente

        const data = await getUserById(userId)6. **HTTPS**: Sempre usar HTTPS em produção

        setUser(data)7. **Secrets**: Nunca commitar secrets, usar User Secrets ou Azure Key Vault

      } catch (err) {

        setError(err as Error)### Frontend

      } finally {

        setLoading(false)1. **XSS**: Sanitizar inputs do usuário

      }2. **Tokens**: Armazenar JWT em httpOnly cookies quando possível

    }3. **Sensitive Data**: Nunca expor dados sensíveis no código

4. **HTTPS**: Sempre usar HTTPS

    fetchUser()5. **Validation**: Validar dados no frontend também

  }, [userId])

---

  return { user, loading, error }

}## 🧪 Testes

```

### Backend

---

- **Unit Tests**: xUnit ou NUnit

## File Structure- **Integration Tests**: Para testar APIs

- **Cobertura**: Mínimo 70% de code coverage

### Backend- **Mocking**: Usar Moq para mocks



```### Frontend

Controllers/

├── AuthController.cs         # Authentication endpoints- **Unit Tests**: Vitest ou Jest

├── TransactionsController.cs # Transaction CRUD- **Component Tests**: React Testing Library

└── CategoriesController.cs   # Category CRUD- **E2E Tests**: Playwright ou Cypress

- **Cobertura**: Mínimo 60% de code coverage

Services/

├── IUserService.cs           # Interface---

├── UserService.cs            # Implementation

├── IAuthService.cs## 📝 Documentação

└── AuthService.cs

### Backend

Models/

├── User.cs                   # Entities1. **Swagger**: Documentar todos os endpoints

├── Transaction.cs2. **XML Comments**: Adicionar comentários XML em controllers

└── Category.cs3. **README**: Manter README atualizado com instruções



DTOs/### Frontend

├── Auth/

│   ├── LoginDto.cs1. **Storybook**: Documentar componentes (opcional)

│   └── RegisterDto.cs2. **JSDoc**: Comentar funções complexas

├── Transactions/3. **README**: Documentar estrutura e decisões de design

│   ├── TransactionDto.cs

│   └── CreateTransactionDto.cs---

└── Categories/

    └── CategoryDto.cs## 🔄 Git Workflow



Data/### Branches

├── AppDbContext.cs           # DbContext

└── Migrations/               # EF Migrations- `main`: Código em produção

```- `develop`: Código em desenvolvimento

- `feature/*`: Novas funcionalidades

### Frontend- `bugfix/*`: Correções de bugs

- `hotfix/*`: Correções urgentes em produção

```

src/### Commits

├── components/

│   ├── common/              # Reusable componentsSeguir o padrão Conventional Commits:

│   │   ├── button.tsx

│   │   ├── input.tsx```

│   │   └── modal.tsxfeat: adiciona autenticação JWT

│   ├── layout/              # Layout componentsfix: corrige cálculo de saldo

│   │   ├── header.tsxdocs: atualiza README

│   │   ├── sidebar.tsxstyle: formata código

│   │   └── footer.tsxrefactor: refatora serviço de transações

│   └── features/            # Feature-specific componentstest: adiciona testes para UserService

│       ├── auth/chore: atualiza dependências

│       └── transactions/```

│

├── pages/                   # Application pages### Pull Requests

│   ├── home.tsx

│   ├── login.tsx1. Criar PR da feature branch para develop

│   ├── dashboard.tsx2. Adicionar descrição clara das mudanças

│   └── transactions.tsx3. Solicitar code review

│4. Garantir que testes passam

├── services/                # API services5. Merge após aprovação

│   ├── api.ts              # Base API configuration

│   ├── auth-service.ts---

│   └── transaction-service.ts

│## 🚀 Deploy

├── hooks/                   # Custom hooks

│   ├── use-auth.ts### Backend

│   └── use-transactions.ts

│- **Ambiente**: Azure App Service, AWS EC2, ou Docker

├── contexts/                # React Contexts- **CI/CD**: GitHub Actions ou Azure DevOps

│   └── auth-context.tsx- **Database**: SQL Server ou PostgreSQL

│

├── types/                   # TypeScript types### Frontend

│   ├── user.ts

│   ├── transaction.ts- **Ambiente**: Vercel, Netlify, ou Azure Static Web Apps

│   └── api.ts- **Build**: `npm run build`

│- **Variáveis de Ambiente**: Configurar via plataforma

├── utils/                   # Utilities

│   ├── format.ts---

│   └── validation.ts

│## 📊 Banco de Dados

└── styles/                  # Global styles

    └── index.css### Convenções

```

- **Tabelas**: `PascalCase` (singular): `User`, `Transaction`

---- **Colunas**: `PascalCase`: `UserId`, `CreatedAt`

- **Chaves Primárias**: `Id` (int ou Guid)

## Best Practices- **Chaves Estrangeiras**: `[TabelaReferenciada]Id`



### Backend### Migrations



#### Dependency Injection- Sempre criar migrations para mudanças no schema

- Testar migrations em ambiente de desenvolvimento

```csharp- Documentar mudanças significativas

// Program.cs

builder.Services.AddScoped<IUserService, UserService>();---

builder.Services.AddScoped<IUserRepository, UserRepository>();

## 🔍 Code Review

// Controller

public class UsersController : ControllerBase### Checklist

{

    private readonly IUserService _userService;- [ ] Código segue os padrões estabelecidos

- [ ] Testes foram adicionados/atualizados

    public UsersController(IUserService userService)- [ ] Documentação foi atualizada

    {- [ ] Não há código comentado desnecessário

        _userService = userService;- [ ] Não há logs de debug

    }- [ ] Performance foi considerada

}- [ ] Segurança foi considerada

```- [ ] Código é legível e auto-explicativo



#### Error Handling---



```csharp## 📚 Recursos e Referências

[HttpGet("{id}")]

public async Task<ActionResult<UserDto>> GetUser(int id)### Backend (.NET)

{

    try- [Microsoft .NET Documentation](https://docs.microsoft.com/dotnet/)

    {- [ASP.NET Core Best Practices](https://docs.microsoft.com/aspnet/core/fundamentals/best-practices)

        var user = await _userService.GetUserByIdAsync(id);- [Entity Framework Core](https://docs.microsoft.com/ef/core/)

        

        if (user == null)### Frontend (React)

        {

            return NotFound(new { message = "User not found" });- [React Documentation](https://react.dev/)

        }- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

- [React Best Practices](https://react.dev/learn)

        return Ok(user);

    }---

    catch (ValidationException ex)

    {## 🤝 Contribuindo

        return BadRequest(new { message = ex.Message });

    }Ao contribuir para este projeto, certifique-se de:

    catch (Exception ex)

    {1. Ler e seguir estas diretrizes

        _logger.LogError(ex, "Error getting user {UserId}", id);2. Escrever código limpo e bem documentado

        return StatusCode(500, new { message = "Internal server error" });3. Adicionar testes para novas funcionalidades

    }4. Atualizar documentação quando necessário

}5. Solicitar code review antes de fazer merge

```

---

#### Async/Await

**Última atualização**: 30 de dezembro de 2025

```csharp
// Always use async/await for I/O operations
public async Task<User> GetUserAsync(int id)
{
    return await _dbContext.Users
        .Include(u => u.Transactions)
        .FirstOrDefaultAsync(u => u.Id == id);
}

// Use ConfigureAwait(false) in libraries
public async Task<User> GetUserAsync(int id)
{
    return await _dbContext.Users
        .FirstOrDefaultAsync(u => u.Id == id)
        .ConfigureAwait(false);
}
```

### Frontend

#### Component Composition

```typescript
// ❌ Bad - God component
function Dashboard() {
  // 500 lines of code
}

// ✅ Good - Composed components
function Dashboard() {
  return (
    <div>
      <DashboardHeader />
      <DashboardStats />
      <TransactionList />
      <Charts />
    </div>
  )
}
```

#### State Management

```typescript
// Use local state when possible
const [count, setCount] = useState(0)

// Use context for global state
const { user, setUser } = useAuth()

// Use React Query for server state
const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => getUserById(userId),
})
```

#### Error Boundaries

```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
```

---

## Git Workflow

### Branch Naming

```bash
feature/user-authentication
fix/transaction-validation
docs/api-documentation
refactor/service-layer
chore/update-dependencies
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

**Examples**:

```bash
feat(auth): add user registration endpoint

Implement user registration with email validation,
password hashing, and JWT token generation.

Closes #123

fix(transactions): correct date filtering logic

The date filter was not considering timezone,
causing incorrect results for edge cases.

docs: update Docker setup instructions

refactor(services): extract common database operations

test(auth): add unit tests for login service

chore(deps): update React to 18.2.0
```

---

## Testing

### Backend Tests

```csharp
public class UserServiceTests
{
    [Fact]
    public async Task GetUserById_WhenUserExists_ReturnsUser()
    {
        // Arrange
        var mockRepo = new Mock<IUserRepository>();
        mockRepo.Setup(r => r.GetByIdAsync(1))
            .ReturnsAsync(new User { Id = 1, Name = "Test" });
        
        var service = new UserService(mockRepo.Object);

        // Act
        var result = await service.GetUserByIdAsync(1);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test", result.Name);
    }

    [Fact]
    public async Task GetUserById_WhenUserNotExists_ReturnsNull()
    {
        // Arrange
        var mockRepo = new Mock<IUserRepository>();
        mockRepo.Setup(r => r.GetByIdAsync(999))
            .ReturnsAsync((User)null);
        
        var service = new UserService(mockRepo.Object);

        // Act
        var result = await service.GetUserByIdAsync(999);

        // Assert
        Assert.Null(result);
    }
}
```

### Frontend Tests

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginPage } from './login-page'

describe('LoginPage', () => {
  it('should login successfully with valid credentials', async () => {
    render(<LoginPage />)
    
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(screen.getByText(/welcome/i)).toBeInTheDocument()
    })
  })

  it('should show error with invalid credentials', async () => {
    render(<LoginPage />)
    
    await userEvent.type(screen.getByLabelText(/email/i), 'invalid@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'wrong')
    await userEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })
})
```

---

## Documentation

### Code Comments

```csharp
/// <summary>
/// Retrieves a user by their unique identifier.
/// </summary>
/// <param name="id">The user's ID</param>
/// <returns>The user if found, null otherwise</returns>
/// <exception cref="ArgumentException">If id is invalid</exception>
public async Task<User> GetUserByIdAsync(int id)
{
    if (id <= 0)
    {
        throw new ArgumentException("Invalid user ID", nameof(id));
    }

    return await _repository.GetByIdAsync(id);
}
```

```typescript
/**
 * Fetches user data by ID from the API
 * @param userId - The unique identifier of the user
 * @returns Promise resolving to user data
 * @throws {ApiError} If the request fails
 */
export async function getUserById(userId: number): Promise<User> {
  const response = await api.get(`/users/${userId}`)
  return response.data
}
```

---

## Security

### Backend

```csharp
// Use parameterized queries (EF Core does this by default)
var user = await _context.Users
    .Where(u => u.Email == email)
    .FirstOrDefaultAsync();

// Hash passwords
var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);

// Validate input
if (string.IsNullOrWhiteSpace(email))
{
    throw new ValidationException("Email is required");
}

// Use HTTPS in production
app.UseHttpsRedirection();

// Implement CORS correctly
app.UseCors(policy => policy
    .WithOrigins("https://yourdomain.com")
    .AllowAnyMethod()
    .AllowAnyHeader());
```

### Frontend

```typescript
// Never store sensitive data in localStorage
// Use httpOnly cookies for tokens

// Sanitize user input
import DOMPurify from 'dompurify'
const clean = DOMPurify.sanitize(dirty)

// Validate before submitting
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

// Use HTTPS
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com'
```

---

## Performance

### Backend

```csharp
// Use projections
var users = await _context.Users
    .Select(u => new UserDto
    {
        Id = u.Id,
        Name = u.Name
    })
    .ToListAsync();

// Use AsNoTracking for read-only queries
var users = await _context.Users
    .AsNoTracking()
    .ToListAsync();

// Implement pagination
var users = await _context.Users
    .Skip((page - 1) * pageSize)
    .Take(pageSize)
    .ToListAsync();
```

### Frontend

```typescript
// Lazy load components
const Dashboard = lazy(() => import('./pages/dashboard'))

// Memoize expensive computations
const total = useMemo(() => 
  transactions.reduce((sum, t) => sum + t.amount, 0),
  [transactions]
)

// Debounce inputs
const debouncedSearch = useDebouncedCallback(
  (value) => {
    searchUsers(value)
  },
  300
)
```

---

**Last Updated**: December 30, 2025  
**Version**: 1.0.0
