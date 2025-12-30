# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Stage 2: Production com Nginx
FROM nginx:1.25-alpine AS production
WORKDIR /usr/share/nginx/html

# Remover arquivos padrão do nginx
RUN rm -rf ./*

# Copiar build do stage anterior
COPY --from=build /app/dist .

# Copiar configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
