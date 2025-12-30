# 🎉 OrganizedLife - Setup Completo!

## ✅ Status do Projeto

### Backend (.NET API)
- ✅ .NET 10 SDK instalado
- ✅ Pacotes NuGet restaurados
- ✅ Banco de dados SQLite criado (`organizedlife.db`)
- ✅ Migrations aplicadas
- ✅ **Backend RODANDO em:**
  - HTTP: http://localhost:5000
  - HTTPS: https://localhost:5001
  - Swagger: http://localhost:5000/swagger

### Frontend (React)
- ✅ Dependências npm instaladas
- ✅ Estrutura completa criada
- ⏳ **Pronto para iniciar**

---

## 🚀 Como Executar

### 1️⃣ Backend (Já está rodando!)

O backend já está executando. Para verificar se está funcionando, acesse:

**Swagger UI (Documentação da API):**
```
http://localhost:5000/swagger
```

**Health Check:**
```
http://localhost:5000/api/health
```

**Para parar o backend:**
- Pressione `Ctrl+C` no terminal onde está rodando

**Para iniciar novamente:**
```bash
cd backend/OrganizedLife.API
dotnet run --urls "http://localhost:5000;https://localhost:5001"
```

---

### 2️⃣ Frontend (React)

Abra um **novo terminal** e execute:

```bash
cd frontend
npm run dev
```

O frontend estará disponível em:
```
http://localhost:5173
```

---

## 📊 Estrutura do Banco de Dados

O banco de dados SQLite (`organizedlife.db`) foi criado com as seguintes tabelas:

### 📝 Tabelas:
- **Users** - Usuários do sistema
- **Transactions** - Transações financeiras (receitas e despesas)
- **Categories** - Categorias de transações

### 🎨 Categorias Pré-cadastradas:
1. 💰 Salário (Receita)
2. 🍔 Alimentação (Despesa)
3. 🚗 Transporte (Despesa)
4. 🏠 Moradia (Despesa)
5. 🎮 Lazer (Despesa)
6. ⚕️ Saúde (Despesa)
7. 📚 Educação (Despesa)
8. 📦 Outros (Despesa)

---

## 🔧 Comandos Úteis

### Backend

```bash
# Restaurar pacotes
cd backend/OrganizedLife.API
dotnet restore

# Compilar
dotnet build

# Executar
dotnet run

# Criar nova migration
dotnet ef migrations add NomeDaMigration

# Aplicar migrations
dotnet ef database update

# Reverter última migration
dotnet ef migrations remove
```

### Frontend

```bash
# Instalar dependências
cd frontend
npm install

# Executar em desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

---

## 📁 Arquivos Importantes

### Backend
- `OrganizedLife.API.csproj` - Configuração do projeto e dependências
- `Program.cs` - Entry point da aplicação
- `appsettings.json` - Configurações (connection string, JWT, etc.)
- `organizedlife.db` - Banco de dados SQLite (gerado automaticamente)

### Frontend
- `package.json` - Dependências npm
- `vite.config.ts` - Configuração do Vite
- `tsconfig.json` - Configuração do TypeScript
- `.env` - Variáveis de ambiente (criar baseado no `.env.example`)

---

## 🌐 URLs

| Serviço | URL | Status |
|---------|-----|--------|
| Backend API | http://localhost:5000 | ✅ Rodando |
| Backend HTTPS | https://localhost:5001 | ✅ Rodando |
| Swagger UI | http://localhost:5000/swagger | ✅ Disponível |
| Health Check | http://localhost:5000/api/health | ✅ Disponível |
| Frontend | http://localhost:5173 | ⏳ Execute `npm run dev` |

---

## 🎯 Próximos Passos

1. **Testar a API no Swagger:**
   - Acesse: http://localhost:5000/swagger
   - Teste o endpoint `/api/health`

2. **Iniciar o Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Criar um arquivo `.env` no frontend:**
   ```bash
   cd frontend
   cp .env.example .env
   ```
   
   O arquivo `.env` já está configurado com:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Implementar funcionalidades:**
   - Criar endpoints de autenticação (Login/Register)
   - Implementar CRUD de transações
   - Adicionar controllers faltantes

---

## 🔒 Observações de Segurança

⚠️ **IMPORTANTE:** Este projeto está configurado para desenvolvimento local.

- O backend está usando SQLite (arquivo local)
- O certificado HTTPS não está confiável (aviso normal em desenvolvimento)
- A secret key do JWT no `appsettings.json` deve ser alterada em produção
- Não commitar dados sensíveis no Git

---

## 🐛 Troubleshooting

### Backend não inicia
```bash
# Verificar se o .NET está instalado
dotnet --version

# Limpar e recompilar
cd backend/OrganizedLife.API
dotnet clean
dotnet build
```

### Erro de porta em uso
```bash
# Verificar o que está usando a porta 5000
lsof -i :5000

# Matar o processo
kill -9 <PID>
```

### Frontend não encontra a API
- Verifique se o backend está rodando
- Confirme que o `.env` tem a URL correta
- Verifique o CORS no backend (já configurado)

---

## 📚 Documentação

- [.NET Documentation](https://docs.microsoft.com/dotnet/)
- [React Documentation](https://react.dev/)
- [Entity Framework Core](https://docs.microsoft.com/ef/core/)
- [Vite Documentation](https://vitejs.dev/)

---

## ✅ Checklist de Conclusão

- [x] .NET SDK instalado
- [x] Backend compilado e rodando
- [x] Banco de dados criado e migrations aplicadas
- [x] Frontend com dependências instaladas
- [x] CORS configurado
- [x] Swagger configurado
- [ ] Frontend iniciado (execute `npm run dev`)
- [ ] Primeiro teste end-to-end

---

**Desenvolvido com ❤️ para melhorar sua organização financeira**

Data de Setup: 30 de dezembro de 2025
