.PHONY: help build up down restart logs logs-backend logs-frontend shell-backend shell-frontend clean dev prod ps images

# Configuração
COMPOSE_FILE = docker-compose.yml
COMPOSE_DEV = docker-compose.dev.yml
COMPOSE_PROD = docker-compose.prod.yml

# Cores para output
GREEN = \033[0;32m
YELLOW = \033[0;33m
RED = \033[0;31m
NC = \033[0m # No Color

## help: Mostra esta mensagem de ajuda
help:
	@echo "$(GREEN)OrganizedLife - Docker Commands$(NC)"
	@echo ""
	@echo "$(YELLOW)Desenvolvimento:$(NC)"
	@echo "  make dev              - Inicia containers em modo desenvolvimento (hot reload)"
	@echo "  make dev-build        - Build e inicia containers em modo desenvolvimento"
	@echo "  make dev-down         - Para containers de desenvolvimento"
	@echo ""
	@echo "$(YELLOW)Produção:$(NC)"
	@echo "  make prod             - Inicia containers em modo produção"
	@echo "  make prod-build       - Build e inicia containers em modo produção"
	@echo "  make prod-down        - Para containers de produção"
	@echo ""
	@echo "$(YELLOW)Comandos Gerais:$(NC)"
	@echo "  make build            - Build de todas as imagens"
	@echo "  make up               - Inicia containers"
	@echo "  make down             - Para e remove containers"
	@echo "  make restart          - Reinicia containers"
	@echo "  make logs             - Mostra logs de todos os containers"
	@echo "  make logs-backend     - Mostra logs do backend"
	@echo "  make logs-frontend    - Mostra logs do frontend"
	@echo "  make ps               - Lista containers rodando"
	@echo "  make images           - Lista imagens criadas"
	@echo ""
	@echo "$(YELLOW)Utilitários:$(NC)"
	@echo "  make shell-backend    - Acessa shell do container backend"
	@echo "  make shell-frontend   - Acessa shell do container frontend"
	@echo "  make db-shell         - Acessa SQLite do banco"
	@echo "  make clean            - Remove containers, volumes e imagens"
	@echo "  make clean-all        - Remove tudo (incluindo dados persistentes)"
	@echo "  make prune            - Remove containers e imagens não utilizados"

## build: Build de todas as imagens
build:
	@echo "$(GREEN)🔨 Building images...$(NC)"
	docker-compose -f $(COMPOSE_FILE) build

## up: Inicia containers
up:
	@echo "$(GREEN)🚀 Starting containers...$(NC)"
	docker-compose -f $(COMPOSE_FILE) up -d
	@echo "$(GREEN)✅ Containers iniciados!$(NC)"
	@echo "Backend: http://localhost:5000"
	@echo "Frontend: http://localhost:3000"
	@echo "Swagger: http://localhost:5000/swagger"

## down: Para e remove containers
down:
	@echo "$(YELLOW)⏹️  Stopping containers...$(NC)"
	docker-compose -f $(COMPOSE_FILE) down

## restart: Reinicia containers
restart: down up

## logs: Mostra logs de todos os containers
logs:
	docker-compose -f $(COMPOSE_FILE) logs -f

## logs-backend: Mostra logs do backend
logs-backend:
	docker-compose -f $(COMPOSE_FILE) logs -f backend

## logs-frontend: Mostra logs do frontend
logs-frontend:
	docker-compose -f $(COMPOSE_FILE) logs -f frontend

## dev: Inicia em modo desenvolvimento
dev:
	@echo "$(GREEN)🚀 Starting DEV environment...$(NC)"
	docker-compose -f $(COMPOSE_DEV) up
	@echo "Backend: http://localhost:5000"
	@echo "Frontend: http://localhost:5173"

## dev-build: Build e inicia em modo desenvolvimento
dev-build:
	@echo "$(GREEN)🔨 Building and starting DEV environment...$(NC)"
	docker-compose -f $(COMPOSE_DEV) up --build

## dev-down: Para desenvolvimento
dev-down:
	@echo "$(YELLOW)⏹️  Stopping DEV environment...$(NC)"
	docker-compose -f $(COMPOSE_DEV) down

## prod: Inicia em modo produção
prod:
	@echo "$(GREEN)🚀 Starting PROD environment...$(NC)"
	docker-compose -f $(COMPOSE_PROD) up -d
	@echo "$(GREEN)✅ Production containers started!$(NC)"
	@echo "Backend: http://localhost:5000"
	@echo "Frontend: http://localhost:80"

## prod-build: Build e inicia em modo produção
prod-build:
	@echo "$(GREEN)🔨 Building and starting PROD environment...$(NC)"
	docker-compose -f $(COMPOSE_PROD) up --build -d

## prod-down: Para produção
prod-down:
	@echo "$(YELLOW)⏹️  Stopping PROD environment...$(NC)"
	docker-compose -f $(COMPOSE_PROD) down

## shell-backend: Acessa shell do container backend
shell-backend:
	@echo "$(GREEN)🐚 Accessing backend shell...$(NC)"
	docker exec -it organized-life-backend /bin/bash || docker exec -it organized-life-backend-dev /bin/bash || docker exec -it organized-life-backend-prod /bin/bash

## shell-frontend: Acessa shell do container frontend
shell-frontend:
	@echo "$(GREEN)🐚 Accessing frontend shell...$(NC)"
	docker exec -it organized-life-frontend /bin/sh || docker exec -it organized-life-frontend-dev /bin/sh || docker exec -it organized-life-frontend-prod /bin/sh

## db-shell: Acessa SQLite do banco
db-shell:
	@echo "$(GREEN)🗄️  Accessing database...$(NC)"
	docker exec -it organized-life-backend sqlite3 /app/data/organizedlife.db

## ps: Lista containers rodando
ps:
	@echo "$(GREEN)📋 Running containers:$(NC)"
	docker-compose -f $(COMPOSE_FILE) ps

## images: Lista imagens criadas
images:
	@echo "$(GREEN)🖼️  Docker images:$(NC)"
	docker images | grep organized-life || echo "Nenhuma imagem encontrada"

## clean: Remove containers e volumes
clean:
	@echo "$(RED)🧹 Cleaning up...$(NC)"
	docker-compose -f $(COMPOSE_FILE) down -v
	docker-compose -f $(COMPOSE_DEV) down -v
	docker-compose -f $(COMPOSE_PROD) down -v

## clean-all: Remove tudo (containers, volumes, imagens)
clean-all:
	@echo "$(RED)🧹 Removing everything...$(NC)"
	docker-compose -f $(COMPOSE_FILE) down -v --rmi all
	docker-compose -f $(COMPOSE_DEV) down -v --rmi all
	docker-compose -f $(COMPOSE_PROD) down -v --rmi all
	@echo "$(RED)⚠️  All data has been removed!$(NC)"

## prune: Remove containers e imagens não utilizados
prune:
	@echo "$(YELLOW)🧹 Pruning unused resources...$(NC)"
	docker system prune -af --volumes
	@echo "$(GREEN)✅ Cleanup complete!$(NC)"
