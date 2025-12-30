.PHONY: help build up down logs clean dev prod restart ps shell-backend shell-frontend db-shell health

# Default target
.DEFAULT_GOAL := help

# Docker Compose files
COMPOSE_FILES := -f docker-compose.yml
COMPOSE_DEV := -f docker-compose.yml -f docker-compose.dev.yml
COMPOSE_PROD := -f docker-compose.yml -f docker-compose.prod.yml

# Colors for terminal output
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

##@ Help

help: ## Show this help message
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} { \
		if (/^[a-zA-Z_-]+:.*?##.*$$/) {printf "  ${YELLOW}%-20s${GREEN}%s${RESET}\n", $$1, $$2} \
		else if (/^##@/) {printf "\n${WHITE}%s${RESET}\n", substr($$0, 5)} \
		} ' $(MAKEFILE_LIST)

##@ Development

dev: ## Start development environment
	docker compose $(COMPOSE_DEV) up

dev-build: ## Build and start development environment
	docker compose $(COMPOSE_DEV) up --build

dev-down: ## Stop development environment
	docker compose $(COMPOSE_DEV) down

dev-logs: ## View development logs
	docker compose $(COMPOSE_DEV) logs -f

##@ Production

prod: ## Start production environment
	docker compose $(COMPOSE_PROD) up -d

prod-build: ## Build and start production environment
	docker compose $(COMPOSE_PROD) up --build -d

prod-down: ## Stop production environment
	docker compose $(COMPOSE_PROD) down

prod-logs: ## View production logs
	docker compose $(COMPOSE_PROD) logs -f

##@ Build

build: ## Build all images
	docker compose $(COMPOSE_FILES) build

build-backend: ## Build only backend image
	docker compose $(COMPOSE_FILES) build backend

build-frontend: ## Build only frontend image
	docker compose $(COMPOSE_FILES) build frontend

build-no-cache: ## Build without cache
	docker compose $(COMPOSE_FILES) build --no-cache

##@ Logs

logs: ## View logs from all services
	docker compose $(COMPOSE_FILES) logs

logs-backend: ## View backend logs
	docker compose $(COMPOSE_FILES) logs backend

logs-frontend: ## View frontend logs
	docker compose $(COMPOSE_FILES) logs frontend

logs-follow: ## Follow logs in real-time
	docker compose $(COMPOSE_FILES) logs -f

##@ Container Access

shell-backend: ## Access backend container shell
	docker compose $(COMPOSE_FILES) exec backend bash

shell-frontend: ## Access frontend container shell
	docker compose $(COMPOSE_FILES) exec frontend sh

db-shell: ## Access SQLite database
	docker compose $(COMPOSE_FILES) exec backend sqlite3 /app/data/organizedlife.db

##@ Health Checks

health: ## Check health of all services
	@echo "${GREEN}Checking backend...${RESET}"
	@curl -s http://localhost:5050/api/health || echo "${YELLOW}Backend not responding${RESET}"
	@echo "\n${GREEN}Checking frontend...${RESET}"
	@curl -s http://localhost:3002/health || echo "${YELLOW}Frontend not responding${RESET}"

health-backend: ## Check backend health
	@curl -s http://localhost:5050/api/health | jq . || curl -s http://localhost:5050/api/health

health-frontend: ## Check frontend health
	@curl -s http://localhost:3002/health

##@ Container Management

up: ## Start all services
	docker compose $(COMPOSE_FILES) up -d

down: ## Stop all services
	docker compose $(COMPOSE_FILES) down

restart: ## Restart all services
	docker compose $(COMPOSE_FILES) restart

restart-backend: ## Restart only backend
	docker compose $(COMPOSE_FILES) restart backend

restart-frontend: ## Restart only frontend
	docker compose $(COMPOSE_FILES) restart frontend

stop: ## Stop all containers
	docker compose $(COMPOSE_FILES) stop

start: ## Start stopped containers
	docker compose $(COMPOSE_FILES) start

ps: ## List running containers
	docker compose $(COMPOSE_FILES) ps

##@ Cleanup

clean: ## Remove containers and volumes
	docker compose $(COMPOSE_FILES) down -v

clean-images: ## Remove images
	docker compose $(COMPOSE_FILES) down --rmi all

clean-all: ## Remove everything (containers, volumes, images)
	docker compose $(COMPOSE_FILES) down -v --rmi all

prune: ## Docker system prune
	docker system prune -f

prune-all: ## Docker system prune (aggressive)
	docker system prune -af --volumes

##@ Database

db-backup: ## Backup SQLite database
	@mkdir -p ./backups
	docker cp organized-life-backend:/app/data/organizedlife.db ./backups/backup-$$(date +%Y%m%d-%H%M%S).db
	@echo "${GREEN}Backup created in ./backups/${RESET}"

db-restore: ## Restore database from backup (usage: make db-restore FILE=backup.db)
	@if [ -z "$(FILE)" ]; then \
		echo "${YELLOW}Usage: make db-restore FILE=backup.db${RESET}"; \
		exit 1; \
	fi
	docker cp $(FILE) organized-life-backend:/app/data/organizedlife.db
	@echo "${GREEN}Database restored from $(FILE)${RESET}"

##@ Testing

test-backend: ## Run backend tests
	docker compose $(COMPOSE_FILES) run --rm backend dotnet test

test-frontend: ## Run frontend tests
	docker compose $(COMPOSE_FILES) run --rm frontend npm test

##@ Information

info: ## Show system information
	@echo "${GREEN}Docker version:${RESET}"
	@docker --version
	@echo "${GREEN}Docker Compose version:${RESET}"
	@docker compose version
	@echo "${GREEN}Running containers:${RESET}"
	@docker ps --filter name=organized-life
