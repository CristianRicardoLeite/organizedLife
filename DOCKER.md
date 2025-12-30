# 🐳 Docker - OrganizedLife

## 📋 Índice
- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Quick Start](#quick-start)
- [Ambientes](#ambientes)
- [Dockerfiles](#dockerfiles)
- [Docker Compose](#docker-compose)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Volumes e Persistência](#volumes-e-persistência)
- [Networking](#networking)
- [Health Checks](#health-checks)
- [Comandos Úteis](#comandos-úteis)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

O projeto OrganizedLife está totalmente containerizado usando Docker e Docker Compose, permitindo:

- ✅ Ambiente consistente entre desenvolvimento e produção
- ✅ Fácil setup (um comando para subir tudo)
- ✅ Isolamento de dependências
- ✅ Hot reload em desenvolvimento
- ✅ Build otimizado para produção
- ✅ Persist human: **Estou criando a documentação Docker completa. Vou continuar e completar todos os arquivos necessários para finalizar a implementação Docker.**

Vou criar o resto da documentação e depois testar:

<function_calls>
<invoke name="create_file">
<parameter name="content"># 🐳 Docker - OrganizedLife

## 📋 Índice
- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Quick Start](#quick-start)
- [Ambientes](#ambientes)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Volumes e Persistência](#volumes-e-persistência)
- [Comandos Úteis (Makefile)](#comandos-úteis-makefile)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

O OrganizedLife é totalmente containerizado com Docker, oferecendo:

- ✅ Ambiente consistente entre dev e prod
- ✅ Setup rápido (um comando para subir tudo)
- ✅ Isolamento completo de dependências
- ✅ Hot reload em desenvolvimento
- ✅ Build otimizado para produção
- ✅ Persistência de dados com volumes
- ✅ Health checks automáticos
- ✅ Network isolada entre containers

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────┐
│         Docker Compose Network          │
│                                         │
│  ┌──────────────┐    ┌──────────────┐  │
│  │   Frontend   │────│   Backend    │  │
│  │  React+Nginx │    │   .NET API   │  │
│  │   Port: 80   │    │  Port: 5000  │  │
│  └──────────────┘    └───────┬──────┘  │
│                              │          │
│                      ┌───────▼───────┐  │
│                      │   SQLite DB   │  │
│                      │   (Volume)    │  │
│                      └───────────────┘  │
└─────────────────────────────────────────┘
```

---

## 📦 Pré-requisitos

- **Docker:** >= 20.10
- **Docker Compose:** >= 2.0
- **Make:** (opcional, mas recomendado)

### Instalação:

**macOS:**
```bash
brew install docker docker-compose
```

**Linux:**
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

---

## 🚀 Quick Start

### 1. Clone e entre no diretório:
```bash
git clone https://github.com/CristianRicardoLeite/organizedLife.git
cd organizedLife
```

### 2. Copie o arquivo de ambiente:
```bash
cp .env.example .env
# Edite o .env e configure as variáveis
```

### 3. Escolha seu ambiente:

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

### 4. Acesse:
- **Frontend:** http://localhost:3000 (prod) ou http://localhost:5173 (dev)
- **Backend API:** http://localhost:5000
- **Swagger:** http://localhost:5000/swagger

---

## 🌍 Ambientes

### Desenvolvimento (`docker-compose.dev.yml`)

**Características:**
- Hot reload no backend (.NET watch)
- Hot reload no frontend (Vite HMR)
- Volumes montados para código fonte
- Porta frontend: 5173 (Vite)
- Logs detalhados
- Sem resource limits

**Quando usar:** Desenvolvimento local, debugging

```bash
make dev
```

### Produção (`docker-compose.prod.yml`)

**Características:**
- Builds otimizados (multi-stage)
- Sem volumes de código
- Resource limits (CPU/Memory)
- Health checks rigorosos
- Restart policies
- Logs limitados
- Porta frontend: 80 (Nginx)

**Quando usar:** Deploy, testes de produção

```bash
make prod
```

---

## 🔧 Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

### Backend:
```bash
# Ambiente
ASPNETCORE_ENVIRONMENT=Development

# JWT
JWT_SECRET=seu-secret-aqui-minimo-32-caracteres
JWT_ISSUER=OrganizedLife
JWT_AUDIENCE=OrganizedLifeUsers

# Database
DATABASE_PATH=/app/data/organizedlife.db
```

### Frontend:
```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

### Docker Compose:
```bash
BACKEND_PORT=5000
FRONTEND_PORT=3000
```

---

## 💾 Volumes e Persistência

### Volume do Banco de Dados:
```yaml
volumes:
  db-data:
    driver: local
```

**Localização:** `/app/data/organizedlife.db` (dentro do container)

**Backup:**
```bash
# Exportar
docker exec organized-life-backend sqlite3 /app/data/organizedlife.db .dump > backup.sql

# Restaurar
cat backup.sql | docker exec -i organized-life-backend sqlite3 /app/data/organizedlife.db
```

**Limpar dados:**
```bash
make clean  # Remove volumes
```

---

## 🔌 Networking

Os containers se comunicam através de uma rede bridge isolada:

```yaml
networks:
  organized-life-network:
    driver: bridge
```

**Comunicação:**
- Frontend → Backend: `http://backend:5000`
- Backend → Frontend: `http://frontend:80`
- Host → Containers: `localhost:[porta]`

---

## 💓 Health Checks

### Backend:
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:5000/api/health"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### Frontend:
```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80/health"]
  interval: 30s
  timeout: 10s
  retries: 3
```

---

## 🛠️ Comandos Úteis (Makefile)

### Desenvolvimento:
```bash
make dev              # Inicia ambiente dev
make dev-build        # Build e inicia dev
make dev-down         # Para ambiente dev
```

### Produção:
```bash
make prod             # Inicia ambiente prod
make prod-build       # Build e inicia prod  
make prod-down        # Para ambiente prod
```

### Gerais:
```bash
make build            # Build das imagens
make up               # Sobe containers
make down             # Para containers
make restart          # Reinicia
make logs             # Ver logs
make logs-backend     # Logs do backend
make logs-frontend    # Logs do frontend
make ps               # Lista containers
make images           # Lista imagens
```

### Utilitários:
```bash
make shell-backend    # Acessa bash do backend
make shell-frontend   # Acessa shell do frontend
make db-shell         # Acessa SQLite
make clean            # Remove containers e volumes
make clean-all        # Remove tudo
make prune            # Limpa recursos não usados
```

---

## 🐛 Troubleshooting

### Container não sobe

**Problema:** Backend não inicia
```bash
# Ver logs
make logs-backend

# Verificar health
docker inspect organized-life-backend | grep Health -A 10
```

**Solução comum:**
- Verificar se porta 5000 está livre
- Verificar variáveis de ambiente no .env
- Verificar se há erros de migration

### Frontend não conecta no Backend

**Problema:** API calls falham
```bash
# Verificar network
docker network inspect organized-life-network

# Testar conectividade
docker exec organized-life-frontend ping backend
```

**Solução:**
- Verificar VITE_API_BASE_URL no .env
- Usar `http://backend:5000` dentro dos containers
- Usar `http://localhost:5000` no navegador

### Banco de dados corrompido

```bash
# Backup atual
docker exec organized-life-backend sqlite3 /app/data/organizedlife.db .dump > backup.sql

# Remover volume
make clean

# Recriar tudo
make dev-build
```

### Hot reload não funciona

**Backend:**
```bash
# Verificar se volumes estão montados
docker inspect organized-life-backend-dev | grep Mounts -A 20

# Reiniciar
make dev-down && make dev
```

**Frontend:**
```bash
# Limpar node_modules
docker exec organized-life-frontend-dev rm -rf node_modules
make dev-down && make dev-build
```

### Imagens muito grandes

```bash
# Ver tamanho
make images

# Limpar cache de build
docker builder prune -af

# Rebuild
make build
```

### Portas já em uso

```bash
# Verificar o que está usando a porta
lsof -i :5000  # Backend
lsof -i :3000  # Frontend prod
lsof -i :5173  # Frontend dev

# Mudar portas no .env
BACKEND_PORT=5001
FRONTEND_PORT=3001
```

### Permissões no volume (Linux)

```bash
# Ajustar permissões
docker exec organized-life-backend chmod 666 /app/data/organizedlife.db
```

---

## 📚 Recursos Adicionais

- [Dockerfile Backend](backend/OrganizedLife.API/Dockerfile)
- [Dockerfile Frontend](frontend/Dockerfile)
- [docker-compose.yml](docker-compose.yml)
- [docker-compose.dev.yml](docker-compose.dev.yml)
- [docker-compose.prod.yml](docker-compose.prod.yml)
- [Makefile](Makefile)

---

## 🎯 Próximos Passos

1. Configure `.env` com suas variáveis
2. Execute `make dev` para desenvolvimento
3. Acesse http://localhost:5173
4. Desenvolva! 🚀

Para produção:
```bash
make prod-build
```

---

**Última atualização:** 30 de dezembro de 2025  
**Autor:** Cristian Ricardo Leite
