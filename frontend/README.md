# Frontend - OrganizedLife

## 📋 Descrição

Interface web desenvolvida em React + TypeScript para o sistema de organização financeira OrganizedLife.

## 🚀 Tecnologias

- **React 18+**
- **TypeScript**
- **Vite** (Build tool)
- **React Router** (Navegação)
- **Axios** (Cliente HTTP)
- **TailwindCSS** ou **Material-UI** (Estilização)
- **React Hook Form** (Gerenciamento de formulários)
- **Zod** (Validação de schemas)
- **React Query** (Cache e gerenciamento de estado server)

## 📁 Estrutura do Projeto

```
frontend/
├── public/            # Arquivos estáticos
├── src/
│   ├── components/    # Componentes reutilizáveis
│   │   ├── common/   # Componentes comuns (Button, Input, etc)
│   │   └── layout/   # Layout (Header, Footer, Sidebar)
│   ├── pages/        # Páginas da aplicação
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Register/
│   │   ├── Dashboard/
│   │   └── Transactions/
│   ├── services/     # Serviços de API
│   ├── hooks/        # Custom Hooks
│   ├── context/      # Context API
│   ├── types/        # TypeScript types/interfaces
│   ├── utils/        # Funções utilitárias
│   ├── constants/    # Constantes
│   ├── styles/       # Estilos globais
│   ├── assets/       # Imagens, ícones, etc
│   ├── App.tsx       # Componente principal
│   └── main.tsx      # Entry point
├── .env.example      # Exemplo de variáveis de ambiente
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Como Executar

### Pré-requisitos

- Node.js 18+ e npm (ou yarn/pnpm)
- Backend rodando (veja [backend/README.md](../backend/README.md))

### Passos

1. **Navegue até a pasta do frontend**:
   ```bash
   cd frontend
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` baseado no `.env.example`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Execute o projeto**:
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**:
   - URL: `http://localhost:5173`

## 📦 Dependências Principais

```bash
# Criar projeto Vite + React + TypeScript
npm create vite@latest . -- --template react-ts

# Navegação
npm install react-router-dom

# HTTP Client
npm install axios

# Formulários e Validação
npm install react-hook-form zod @hookform/resolvers

# Estado e Cache
npm install @tanstack/react-query

# Estilização (escolha uma)
npm install tailwindcss postcss autoprefixer  # TailwindCSS
# ou
npm install @mui/material @emotion/react @emotion/styled  # Material-UI

# Ícones
npm install lucide-react  # ou react-icons

# Data/Formatação
npm install date-fns

# Gráficos (para dashboard)
npm install recharts
```

## 🎨 Páginas Principais (Planejadas)

### Públicas
- **Home** (`/`) - Página inicial
- **Login** (`/login`) - Autenticação
- **Register** (`/register`) - Cadastro de novo usuário

### Privadas (requer autenticação)
- **Dashboard** (`/dashboard`) - Visão geral das finanças
- **Transactions** (`/transactions`) - Lista de transações
- **Add Transaction** (`/transactions/new`) - Adicionar transação
- **Categories** (`/categories`) - Gerenciar categorias
- **Reports** (`/reports`) - Relatórios e gráficos
- **Profile** (`/profile`) - Perfil do usuário
- **Settings** (`/settings`) - Configurações

## 🔒 Autenticação

O sistema usa JWT para autenticação:

1. Token armazenado em `localStorage` ou `sessionStorage`
2. Interceptor Axios adiciona token em todas as requisições
3. Protected Routes verificam autenticação
4. Refresh token automático quando necessário

## 🎯 Funcionalidades Principais

### Dashboard
- Resumo do saldo atual
- Gráfico de receitas vs despesas
- Últimas transações
- Metas financeiras

### Transações
- Listar todas as transações
- Filtrar por categoria, data, tipo
- Adicionar nova transação
- Editar/deletar transação
- Pesquisa

### Categorias
- Criar categorias personalizadas
- Ícones e cores customizáveis
- Vincular transações

### Relatórios
- Gráficos de pizza (por categoria)
- Gráficos de linha (evolução temporal)
- Exportar relatórios em PDF/Excel

## 🧪 Testes

Execute os testes com:
```bash
npm run test
```

## 📝 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint

# Formatar código
npm run format

# Type check
npm run type-check
```

## 🌐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do frontend:

```env
# API
VITE_API_BASE_URL=http://localhost:5000/api

# Outras configurações
VITE_APP_NAME=OrganizedLife
VITE_ENABLE_ANALYTICS=false
```

> **Nota**: Variáveis no Vite devem começar com `VITE_`

## 🎨 Temas e Estilos

### TailwindCSS (se escolhido)
Configure cores personalizadas no `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        danger: '#EF4444',
        // ...
      }
    }
  }
}
```

### Material-UI (se escolhido)
Configure tema customizado em `src/theme.ts`

## 📱 Responsividade

A aplicação é totalmente responsiva:
- **Mobile First**: Design otimizado para mobile
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Elementos adequados para touch

## 🚀 Deploy

### Build
```bash
npm run build
```

### Plataformas Recomendadas
- **Vercel**: Deploy automático com GitHub
- **Netlify**: Deploy contínuo
- **Azure Static Web Apps**: Integração com Azure

### Configuração de Deploy

Exemplo para Vercel (`vercel.json`):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

## 📚 Recursos

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query/)

## 🎓 Boas Práticas

1. **Componentização**: Criar componentes reutilizáveis
2. **Custom Hooks**: Extrair lógica para hooks customizados
3. **TypeScript**: Tipar tudo corretamente
4. **Error Handling**: Tratamento adequado de erros
5. **Loading States**: Feedback visual para o usuário
6. **Acessibilidade**: Seguir padrões WCAG
7. **Performance**: Lazy loading, memoization

---

Para mais informações sobre padrões e convenções, consulte [GUIDELINES.md](../GUIDELINES.md)
