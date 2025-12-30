# 📚 Diretrizes do Projeto OrganizedLife

Este documento define os padrões, convenções e boas práticas para o desenvolvimento do sistema OrganizedLife.

## 🎯 Visão Geral

O OrganizedLife é um sistema de organização financeira pessoal que permite aos usuários gerenciar suas finanças de forma eficiente e intuitiva.

### Objetivos do Projeto

1. **Simplicidade**: Interface intuitiva e fácil de usar
2. **Escalabilidade**: Arquitetura preparada para crescimento
3. **Segurança**: Proteção de dados financeiros sensíveis
4. **Performance**: Respostas rápidas e experiência fluida
5. **Manutenibilidade**: Código limpo e bem documentado

---

## 🏗️ Arquitetura

### Padrão Arquitetural

- **Backend**: Clean Architecture / N-Layer Architecture
  - **Controllers**: Recebem requisições HTTP
  - **Services**: Lógica de negócio
  - **Repositories**: Acesso a dados
  - **Models/Entities**: Representação de dados

- **Frontend**: Component-Based Architecture
  - **Pages**: Páginas da aplicação
  - **Components**: Componentes reutilizáveis
  - **Services**: Comunicação com API
  - **Hooks**: Lógica compartilhada
  - **Context/State**: Gerenciamento de estado

### Comunicação

- **Protocolo**: RESTful API
- **Formato**: JSON
- **Autenticação**: JWT (JSON Web Tokens)
- **CORS**: Configurado para permitir requisições do frontend

---

## 💻 Padrões de Código

### Backend (.NET/C#)

#### Convenções de Nomenclatura

- **Classes, Interfaces, Métodos**: `PascalCase`
  ```csharp
  public class UserService { }
  public interface IUserRepository { }
  public void GetUserById(int id) { }
  ```

- **Variáveis locais, parâmetros**: `camelCase`
  ```csharp
  int userId = 1;
  string userName = "John";
  ```

- **Constantes**: `UPPER_SNAKE_CASE` ou `PascalCase`
  ```csharp
  public const int MAX_LOGIN_ATTEMPTS = 3;
  ```

- **Propriedades privadas**: `_camelCase` (com underscore)
  ```csharp
  private readonly IUserRepository _userRepository;
  ```

#### Boas Práticas

1. **Dependency Injection**: Sempre usar injeção de dependência
2. **Async/Await**: Usar operações assíncronas para I/O
3. **DTOs**: Usar Data Transfer Objects para comunicação API
4. **Validação**: Validar dados de entrada com Data Annotations ou FluentValidation
5. **Tratamento de Erros**: Usar middleware global para tratamento de exceções
6. **Logging**: Implementar logs estruturados com Serilog ou ILogger

#### Estrutura de Pastas Backend

```
backend/
├── Controllers/        # API Controllers
├── Services/          # Business Logic
├── Repositories/      # Data Access Layer
├── Models/
│   ├── Entities/      # Database Entities
│   ├── DTOs/          # Data Transfer Objects
│   └── ViewModels/    # View Models
├── Data/              # DbContext e Migrations
├── Middleware/        # Custom Middleware
├── Extensions/        # Extension Methods
├── Configurations/    # Configurações
└── Program.cs         # Entry Point
```

#### Exemplo de Controller

```csharp
[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly ITransactionService _transactionService;
    
    public TransactionsController(ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }
    
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<TransactionDto>>> GetAll()
    {
        var transactions = await _transactionService.GetAllAsync();
        return Ok(transactions);
    }
}
```

---

### Frontend (React/TypeScript)

#### Convenções de Nomenclatura

- **Componentes**: `PascalCase`
  ```typescript
  const UserProfile = () => { }
  ```

- **Variáveis, Funções**: `camelCase`
  ```typescript
  const userName = "John";
  const handleClick = () => { }
  ```

- **Constantes**: `UPPER_SNAKE_CASE`
  ```typescript
  const API_BASE_URL = "https://api.example.com";
  ```

- **Interfaces/Types**: `PascalCase` com prefixo `I` opcional
  ```typescript
  interface User { }
  type UserProfile = { }
  ```

- **Arquivos**: 
  - Componentes: `PascalCase.tsx`
  - Utils/Hooks: `camelCase.ts`

#### Boas Práticas

1. **TypeScript**: Sempre tipar variáveis e funções
2. **Componentes Funcionais**: Preferir function components com hooks
3. **Props**: Definir interfaces para props
4. **State Management**: Usar Context API ou Redux/Zustand para estado global
5. **Custom Hooks**: Extrair lógica reutilizável para hooks customizados
6. **Error Boundaries**: Implementar tratamento de erros em componentes
7. **Loading States**: Sempre mostrar feedback visual durante carregamento
8. **Lazy Loading**: Usar React.lazy para code splitting

#### Estrutura de Pastas Frontend

```
frontend/src/
├── components/        # Componentes reutilizáveis
│   ├── common/       # Componentes comuns (Button, Input, etc)
│   └── layout/       # Layout components (Header, Footer, etc)
├── pages/            # Páginas da aplicação
├── services/         # Serviços de API
├── hooks/            # Custom Hooks
├── context/          # Context API
├── types/            # TypeScript types/interfaces
├── utils/            # Funções utilitárias
├── constants/        # Constantes
├── styles/           # Estilos globais
├── assets/           # Imagens, ícones, etc
├── App.tsx           # Componente principal
└── main.tsx          # Entry point
```

#### Exemplo de Componente

```typescript
interface TransactionCardProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ 
  transaction, 
  onDelete 
}) => {
  const handleDelete = () => {
    onDelete(transaction.id);
  };
  
  return (
    <div className="transaction-card">
      <h3>{transaction.description}</h3>
      <p>{transaction.amount}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
```

---

## 🔒 Segurança

### Backend

1. **Autenticação**: Implementar JWT com refresh tokens
2. **Autorização**: Usar [Authorize] attributes e policies
3. **Validação**: Validar todas as entradas do usuário
4. **SQL Injection**: Usar Entity Framework (parameterized queries)
5. **CORS**: Configurar CORS adequadamente
6. **HTTPS**: Sempre usar HTTPS em produção
7. **Secrets**: Nunca commitar secrets, usar User Secrets ou Azure Key Vault

### Frontend

1. **XSS**: Sanitizar inputs do usuário
2. **Tokens**: Armazenar JWT em httpOnly cookies quando possível
3. **Sensitive Data**: Nunca expor dados sensíveis no código
4. **HTTPS**: Sempre usar HTTPS
5. **Validation**: Validar dados no frontend também

---

## 🧪 Testes

### Backend

- **Unit Tests**: xUnit ou NUnit
- **Integration Tests**: Para testar APIs
- **Cobertura**: Mínimo 70% de code coverage
- **Mocking**: Usar Moq para mocks

### Frontend

- **Unit Tests**: Vitest ou Jest
- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright ou Cypress
- **Cobertura**: Mínimo 60% de code coverage

---

## 📝 Documentação

### Backend

1. **Swagger**: Documentar todos os endpoints
2. **XML Comments**: Adicionar comentários XML em controllers
3. **README**: Manter README atualizado com instruções

### Frontend

1. **Storybook**: Documentar componentes (opcional)
2. **JSDoc**: Comentar funções complexas
3. **README**: Documentar estrutura e decisões de design

---

## 🔄 Git Workflow

### Branches

- `main`: Código em produção
- `develop`: Código em desenvolvimento
- `feature/*`: Novas funcionalidades
- `bugfix/*`: Correções de bugs
- `hotfix/*`: Correções urgentes em produção

### Commits

Seguir o padrão Conventional Commits:

```
feat: adiciona autenticação JWT
fix: corrige cálculo de saldo
docs: atualiza README
style: formata código
refactor: refatora serviço de transações
test: adiciona testes para UserService
chore: atualiza dependências
```

### Pull Requests

1. Criar PR da feature branch para develop
2. Adicionar descrição clara das mudanças
3. Solicitar code review
4. Garantir que testes passam
5. Merge após aprovação

---

## 🚀 Deploy

### Backend

- **Ambiente**: Azure App Service, AWS EC2, ou Docker
- **CI/CD**: GitHub Actions ou Azure DevOps
- **Database**: SQL Server ou PostgreSQL

### Frontend

- **Ambiente**: Vercel, Netlify, ou Azure Static Web Apps
- **Build**: `npm run build`
- **Variáveis de Ambiente**: Configurar via plataforma

---

## 📊 Banco de Dados

### Convenções

- **Tabelas**: `PascalCase` (singular): `User`, `Transaction`
- **Colunas**: `PascalCase`: `UserId`, `CreatedAt`
- **Chaves Primárias**: `Id` (int ou Guid)
- **Chaves Estrangeiras**: `[TabelaReferenciada]Id`

### Migrations

- Sempre criar migrations para mudanças no schema
- Testar migrations em ambiente de desenvolvimento
- Documentar mudanças significativas

---

## 🔍 Code Review

### Checklist

- [ ] Código segue os padrões estabelecidos
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Não há código comentado desnecessário
- [ ] Não há logs de debug
- [ ] Performance foi considerada
- [ ] Segurança foi considerada
- [ ] Código é legível e auto-explicativo

---

## 📚 Recursos e Referências

### Backend (.NET)

- [Microsoft .NET Documentation](https://docs.microsoft.com/dotnet/)
- [ASP.NET Core Best Practices](https://docs.microsoft.com/aspnet/core/fundamentals/best-practices)
- [Entity Framework Core](https://docs.microsoft.com/ef/core/)

### Frontend (React)

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev/learn)

---

## 🤝 Contribuindo

Ao contribuir para este projeto, certifique-se de:

1. Ler e seguir estas diretrizes
2. Escrever código limpo e bem documentado
3. Adicionar testes para novas funcionalidades
4. Atualizar documentação quando necessário
5. Solicitar code review antes de fazer merge

---

**Última atualização**: 30 de dezembro de 2025
