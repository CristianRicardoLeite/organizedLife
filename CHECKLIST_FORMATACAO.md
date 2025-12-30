# ✅ Checklist - Formatação Automática ao Salvar

## 🎯 O que você precisa fazer:

### 1. Instalar as Extensões do VS Code

Abra o VS Code e instale estas extensões (Cmd+Shift+X):

- ✅ **Prettier - Code formatter** (`esbenp.prettier-vscode`)
- ✅ **ESLint** (`dbaeumer.vscode-eslint`)
- ✅ **C# Dev Kit** (`ms-dotnettools.csdevkit`)
- ✅ **EditorConfig for VS Code** (`editorconfig.editorconfig`)

**Atalho rápido:** O VS Code vai sugerir as extensões automaticamente! Procure por uma notificação no canto inferior direito.

### 2. Recarregar o VS Code

Depois de instalar as extensões, pressione:
- **Cmd+Shift+P** → digite "Reload Window" → Enter

Ou simplesmente feche e abra o VS Code novamente.

### 3. Testar a Formatação

#### No Frontend (React/TypeScript):

1. Abra qualquer arquivo `.tsx` ou `.ts` no frontend
2. Desformate o código propositalmente (remova espaços, adicione ponto-e-vírgula, etc)
3. Salve o arquivo (**Cmd+S**)
4. ✨ **Magia!** O código deve ser formatado automaticamente com:
   - Indentação de 2 espaços
   - Sem ponto-e-vírgula
   - Aspas simples para código
   - Aspas duplas para JSX
   - Linha máxima de 160 caracteres

#### No Backend (C#):

1. Abra qualquer arquivo `.cs`
2. Desformate o código
3. Salve o arquivo (**Cmd+S**)
4. ✨ O código deve ser formatado com:
   - Indentação de 4 espaços
   - Chaves no estilo Allman (chaves em nova linha)
   - Namespaces file-scoped

### 4. Verificar se está funcionando

#### Sintomas de que ESTÁ funcionando:
- ✅ Ao salvar, o código se reorganiza sozinho
- ✅ Espaçamento é corrigido automaticamente
- ✅ Imports são organizados
- ✅ Ponto-e-vírgula são removidos (no frontend)

#### Sintomas de que NÃO está funcionando:
- ❌ Código não muda ao salvar
- ❌ Aparece erro no canto inferior direito
- ❌ Extensão Prettier não está habilitada

### 5. Comandos Manuais (caso precise)

Se por algum motivo não funcionar automaticamente:

#### Frontend:
```bash
cd frontend

# Formatar todos os arquivos
npm run format

# Verificar problemas de lint
npm run lint

# Corrigir problemas de lint automaticamente
npm run lint:fix
```

#### Backend:
```bash
cd backend/OrganizedLife.API

# Formatar código C#
dotnet format
```

## 🔍 Configurações Ativas

### ✅ Já configurado para você:

1. **`.vscode/settings.json`** ✅
   - Format on save habilitado
   - Prettier como formatador padrão
   - ESLint fix on save
   - Organize imports on save

2. **`frontend/.eslintrc.cjs`** ✅
   - Todas as suas regras de estilo
   - Indent: 2 espaços
   - Sem ponto-e-vírgula
   - Aspas simples

3. **`frontend/.prettierrc`** ✅
   - Sincronizado com ESLint
   - Configurado exatamente como você pediu

4. **`backend/.editorconfig`** ✅
   - Regras para C#
   - Indent: 4 espaços
   - Estilo Allman para chaves

## 🚨 Troubleshooting

### Problema: "Prettier não está formatando"
**Solução:** 
1. Verifique se a extensão Prettier está instalada
2. Abra a Command Palette (Cmd+Shift+P)
3. Digite "Format Document With..."
4. Selecione "Prettier - Code formatter"
5. Marque "Set as default formatter"

### Problema: "ESLint não está corrigindo"
**Solução:**
1. Verifique se a extensão ESLint está instalada
2. Abra o terminal no frontend: `cd frontend && npm install`
3. Recarregue o VS Code

### Problema: "C# não está formatando"
**Solução:**
1. Verifique se o C# Dev Kit está instalado
2. Abra qualquer arquivo .cs
3. Aguarde o OmniSharp carregar (veja a barra de status)
4. Salve novamente

## 📝 Resumo

**Sua configuração está 100% pronta!** ✅

Você só precisa:
1. ✅ Instalar as 4 extensões
2. ✅ Recarregar o VS Code
3. ✅ Testar salvando um arquivo

A formatação vai acontecer **automaticamente** ao salvar qualquer arquivo! 🎉
