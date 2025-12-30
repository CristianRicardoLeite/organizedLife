# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copiar apenas o arquivo de projeto primeiro para aproveitar cache
COPY ["OrganizedLife.API.csproj", "./"]
RUN dotnet restore "OrganizedLife.API.csproj"

# Copiar o resto dos arquivos
COPY . .

# Build da aplicação
RUN dotnet build "OrganizedLife.API.csproj" -c Release -o /app/build

# Publish da aplicação
RUN dotnet publish "OrganizedLife.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

# Instalar ferramentas necessárias
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copiar binários publicados
COPY --from=build /app/publish .

# Criar diretório para o banco de dados
RUN mkdir -p /app/data && chmod 777 /app/data

# Variáveis de ambiente
ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

# Expor portas
EXPOSE 5000
EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/api/health || exit 1

# Executar aplicação
ENTRYPOINT ["dotnet", "OrganizedLife.API.dll"]
