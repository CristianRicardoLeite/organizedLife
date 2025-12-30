# OrganizedLife - Sistema de Organização Financeira

## 📋 Descrição

Sistema completo de organização financeira desenvolvido com arquitetura moderna, separando backend e frontend para escalabilidade e manutenibilidade. **Totalmente containerizado com Docker!** 🐳

## 🚀 Tecnologias

### Backend
- **.NET 10**
- **ASP.NET Core Web API**
- **Entity Framework Core 10.0.0** (ORM)
- **SQLite** (Banco de dados)
- **JWT** (Autenticação)
- **Swagger/OpenAPI** (Documentação da API)
- **BCrypt** (Hashing de senhas)
- **AutoMapper** (Mapeamento de objetos)

### Frontend
- **React 18.2.0**
- **TypeScript 5.2.2**
- **Vite 5.0.8** (Build tool)
- **React Router 6.21.0** (Navegação)
- **Axios 1.6.2** (Cliente HTTP)
- **TanStack React Query 5.14.2** (Estado e cache)
- **React Hook Form + Zod** (Formulários e validação)
- **Nginx** (Servidor web em produção)

### DevOps
- **Docker** (Containerização)
- **Docker Compose** (Orquestração)
- **Multi-stage builds** (Otimização de imagens)
- **Makefile** (Comandos simplificados)

## 📁 Estrutura do Projeto

```
organizedLife/
├── backend/          # Projeto .NET Web API
│   ├── Controllers/  # Controllers da API
│   ├── Models/       # Modelos de dados
│   ├── Services/     # Lógica de negócio
│   ├── Data/         # Contexto do banco de dados
│   └── ...
├── frontend/         # Projeto React
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── pages/       # Páginas da aplicação
│   │   ├── services/    # Serviços de API
│   │   └── ...
│   └── ...
├── README.md
├── GUIDELINES.md     # Diretrizes do projeto
└── .gitignore
```

## � Quick Start com Docker (Recomendado)

### Pré-requisitos
- Docker >= 20.10
- Docker Compose >= 2.0
- Make (opcional, mas recomendado)

### 1. Clone o repositório
```bash
git clone https://github.com/CristianRicardoLeite/organizedLife.git
cd organizedLife
```

### 2. Configure as variáveis de ambiente
```bash
cp .env.example .env
# Edite o .env e configure suas variáveis (principalmente JWT_SECRET)
```

### 3. Execute com Docker

**Desenvolvimento (com hot reload):**
```bash
make dev
# ou
docker-compose -f docker-compose.dev.yml up
```

**Produção:**
```bash
make prod
# ou
docker-compose -f docker-compose.prod.yml up -d
```

### 4. Acesse a aplicação
- **Frontend:** http://localhost:3000 (prod) ou http://localhost:5173 (dev)
- **Backend API:** http://localhost:5000
- **Swagger:** http://localhost:5000/swagger

### 📋 Comandos Docker Úteis

```bash
# Desenvolvimento
make dev              # Inicia ambiente de desenvolvimento
make dev-build        # Build e inicia dev
make dev-down         # Para ambiente dev

# Produção
make prod             # Inicia ambiente de produção
make prod-build       # Build e inicia prod
make prod-down        # Para ambiente prod

# Utilitários
make logs             # Ver logs de todos os containers
make logs-backend     # Ver logs do backend
make logs-frontend    # Ver logs do frontend
make shell-backend    # Acessar shell do backend
make shell-frontend   # Acessar shell do frontend
make clean            # Limpar containers e volumes
make help             # Ver todos os comandos disponíveis
```

Para documentação completa do Docker, consulte [DOCKER.md](DOCKER.md).

---

## �🛠️ Como Executar SEM Docker (Método Tradicional)

### Backend (.NET)

1. Navegue até a pasta do backend:
   ```bash
   cd backend/OrganizedLife.API
   ```

2. Restaure as dependências:
   ```bash
   dotnet restore
   ```

3. Aplique as migrations:
   ```bash
   dotnet ef database update
   ```

4. Execute o projeto:
   ```bash
   dotnet run
   ```

5. A API estará disponível em: `http://localhost:5000`

6. Acesse a documentação Swagger em: `http://localhost:5000/swagger`

### Frontend (React)

1. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o projeto:
   ```bash
   npm run dev
   ```

4. A aplicação estará disponível em: `http://localhost:5173`

## 🎯 Funcionalidades

### ✅ Implementado
- Estrutura completa do projeto (Backend + Frontend)
- Configuração do banco de dados SQLite
- Migrations e seed de dados
- Entidades: User, Transaction, Category
- DTOs e serviços base
- Context de autenticação (frontend)
- Sistema de rotas com proteção
- **Docker e Docker Compose completos**
- **Ambientes de desenvolvimento e produção**
- **Health checks e monitoramento**

### 🚧 Em Desenvolvimento
- [ ] AuthController (Login/Register) no backend
- [ ] TransactionsController (CRUD)
- [ ] CategoriesController (CRUD)
- [ ] Validações com FluentValidation
- [ ] Integração completa frontend-backend
- [ ] Dashboard com gráficos

### 📅 Planejadas
- [ ] Metas financeiras
- [ ] Notificações e lembretes
- [ ] Relatórios avançados
- [ ] Export de dados
- [ ] Temas customizáveis

## 📝 Documentação

- **[CONTEXTO_PROJETO.md](CONTEXTO_PROJETO.md)** - 🎯 **LEIA PRIMEIRO!** Contexto completo do projeto
- **[DOCKER.md](DOCKER.md)** - 🐳 Documentação completa do Docker
- **[GUIDELINES.md](GUIDELINES.md)** - 📚 Diretrizes de desenvolvimento
- **[backend/README.md](backend/README.md)** - Documentação do backend
- **[frontend/README.md](frontend/README.md)** - Documentação do frontend

## 🔧 Desenvolvimento

### Padrões de Código

**Frontend (React/TypeScript):**
- Indentação: 2 espaços
- Sem ponto-e-vírgula
- Aspas simples para código, duplas para JSX
- Arrow functions com parênteses opcionais
- Linha máxima: 160 caracteres

**Backend (C#):**
- Indentação: 4 espaços
- Estilo de chaves: Allman
- Namespaces: File-scoped
- Interfaces: Prefixo `I`
- Campos privados: Prefixo `_`

### Formatação Automática

O projeto está configurado para formatação automática ao salvar:
- **Frontend:** ESLint + Prettier
- **Backend:** EditorConfig + dotnet format

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/MinhaFeature`
3. Commit suas mudanças: `git commit -m 'feat: adiciona MinhaFeature'`
4. Push para a branch: `git push origin feature/MinhaFeature`
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e de uso pessoal.

## 👤 Autor

**Cristian Ricardo Leite**
- GitHub: [@CristianRicardoLeite](https://github.com/CristianRicardoLeite)

---

**Status do Projeto:** 🚧 Em Desenvolvimento Ativo

- [Diretrizes do Projeto](./GUIDELINES.md)
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
