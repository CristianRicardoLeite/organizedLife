#!/bin/bash
set -e

echo "🚀 Inicializando banco de dados..."

# Diretório do banco de dados
DB_DIR="/app/data"
DB_FILE="$DB_DIR/organizedlife.db"

# Criar diretório se não existir
if [ ! -d "$DB_DIR" ]; then
    echo "📁 Criando diretório $DB_DIR..."
    mkdir -p "$DB_DIR"
fi

# Verificar se o banco já existe
if [ ! -f "$DB_FILE" ]; then
    echo "🆕 Banco de dados não encontrado. Aplicando migrations..."
    dotnet ef database update --no-build
    echo "✅ Migrations aplicadas com sucesso!"
else
    echo "📦 Banco de dados já existe. Verificando migrations pendentes..."
    # Aplicar migrations pendentes
    dotnet ef database update --no-build
    echo "✅ Banco de dados atualizado!"
fi

# Ajustar permissões
chmod 666 "$DB_FILE" 2>/dev/null || true

echo "🎉 Banco de dados pronto!"
