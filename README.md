# OrganizedLife - Sistema de Organização Financeira

## 📋 Descrição

Sistema completo de organização financeira desenvolvido com arquitetura moderna, separando backend e frontend para escalabilidade e manutenibilidade.

## 🚀 Tecnologias

### Backend
- **.NET 8** (ou superior)
- **ASP.NET Core Web API**
- **Entity Framework Core** (ORM)
- **SQL Server** (Banco de dados)
- **JWT** (Autenticação)
- **Swagger** (Documentação da API)

### Frontend
- **React** (Latest version)
- **TypeScript**
- **Vite** (Build tool)
- **React Router** (Navegação)
- **Axios** (Cliente HTTP)
- **TailwindCSS** ou **Material-UI** (Estilização)

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

## 🛠️ Como Executar

### Backend (.NET)

1. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```

2. Restaure as dependências:
   ```bash
   dotnet restore
   ```

3. Execute o projeto:
   ```bash
   dotnet run
   ```

4. A API estará disponível em: `https://localhost:5001` (ou `http://localhost:5000`)

5. Acesse a documentação Swagger em: `https://localhost:5001/swagger`

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

4. A aplicação estará disponível em: `http://localhost:5173` (Vite default)

## 🎯 Funcionalidades Planejadas

- [ ] Cadastro e autenticação de usuários
- [ ] Gerenciamento de receitas e despesas
- [ ] Categorização de transações
- [ ] Relatórios e gráficos financeiros
- [ ] Metas financeiras
- [ ] Notificações e lembretes
- [ ] Dashboard com visão geral das finanças

## 📝 Documentação

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
