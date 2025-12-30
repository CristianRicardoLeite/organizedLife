# 🎨 Guia de Formatação e Lint

Este projeto usa formatação automática e consistente tanto para o **frontend (React/TypeScript)** quanto para o **backend (.NET/C#)**.

## 📋 Ferramentas Configuradas

### Frontend (React + TypeScript)
- **ESLint** - Análise estática de código
- **Prettier** - Formatação automática
- **EditorConfig** - Configurações de editor

### Backend (.NET/C#)
- **EditorConfig** - Configurações de formatação C#
- **Roslyn Analyzers** - Análise de código .NET

---

## 🚀 Como Usar

### Frontend

#### Comandos Disponíveis

```bash
cd frontend

# Verificar problemas de lint
npm run lint

# Corrigir automaticamente problemas de lint
npm run lint:fix

# Formatar código com Prettier
npm run format

# Verificar se o código está formatado corretamente
npm run format:check
```

#### Formatação Automática

Se você tiver as extensões recomendadas instaladas no VS Code:
1. O código será formatado automaticamente ao salvar
2. ESLint corrigirá problemas automaticamente ao salvar

---

### Backend (.NET)

#### Formatação Automática

O código C# será formatado automaticamente ao salvar se você tiver:
1. Extensão C# Dev Kit instalada
2. EditorConfig habilitado (já configurado)

#### Comandos Manuais

```bash
cd backend/OrganizedLife.API

# Formatar todo o código
dotnet format

# Verificar formatação sem alterar arquivos
dotnet format --verify-no-changes

# Formatar apenas um arquivo específico
dotnet format --include path/to/file.cs
```

---

## 🎯 Regras de Formatação

### Frontend (JavaScript/TypeScript)

- **Indentação**: 2 espaços
- **Ponto e vírgula**: Não (semi: false)
- **Aspas**: Simples para JS/TS, duplas para JSX
- **Comprimento máximo de linha**: 160 caracteres
- **Vírgula final**: Sempre em multi-linha
- **Parênteses em arrow functions**: Apenas quando necessário
- **Espaçamento em objetos**: `{ foo: bar }` (com espaços)
- **Final de linha**: LF (Unix-style)

### Backend (C#)

- **Indentação**: 4 espaços
- **Estilo de chaves**: Allman (nova linha)
- **Namespaces**: File-scoped quando possível
- **Campos privados**: Começam com `_` (underscore)
- **Interfaces**: Começam com `I`
- **Comprimento máximo de linha**: 160 caracteres
- **Final de linha**: LF (Unix-style)

---

## 📦 Extensões do VS Code Recomendadas

Ao abrir o projeto, o VS Code sugerirá instalar as seguintes extensões:

### Essenciais
- **Prettier - Code formatter** (`esbenp.prettier-vscode`)
- **ESLint** (`dbaeumer.vscode-eslint`)
- **C# Dev Kit** (`ms-dotnettools.csdevkit`)
- **EditorConfig for VS Code** (`editorconfig.editorconfig`)

### Opcionais
- **Auto Rename Tag** (`formulahendry.auto-rename-tag`)
- **Auto Close Tag** (`formulahendry.auto-close-tag`)

---

## ⚙️ Configuração do VS Code

O arquivo `.vscode/settings.json` já está configurado para:

✅ Formatar automaticamente ao salvar  
✅ Corrigir ESLint ao salvar  
✅ Usar Prettier para JS/TS/React  
✅ Usar C# Dev Kit para arquivos .cs  
✅ Respeitar as configurações do EditorConfig  

---

## 🔧 Arquivos de Configuração

### Frontend

```
frontend/
├── .eslintrc.cjs          # Configuração do ESLint
├── .prettierrc            # Configuração do Prettier
├── .prettierignore        # Arquivos ignorados pelo Prettier
└── .editorconfig          # Configurações do editor
```

### Backend

```
backend/
└── .editorconfig          # Configurações de formatação C#
```

### Raiz

```
.vscode/
├── settings.json          # Configurações do VS Code
└── extensions.json        # Extensões recomendadas
```

---

## 💡 Dicas

### 1. Formatar ao Salvar

A formatação automática ao salvar já está habilitada. Basta salvar o arquivo (`Cmd+S` ou `Ctrl+S`).

### 2. Formatar Manualmente

- **Frontend**: `Shift+Alt+F` (ou `Shift+Option+F` no Mac)
- **Backend**: `Shift+Alt+F` (ou `Shift+Option+F` no Mac)

### 3. Ver Problemas de Lint

No VS Code, pressione `Cmd+Shift+M` (ou `Ctrl+Shift+M`) para ver o painel de problemas.

### 4. Ignorar Regras Específicas

#### No Frontend (ESLint):
```typescript
// eslint-disable-next-line no-console
console.log('Debug message')
```

#### No Backend (C#):
```csharp
#pragma warning disable CS1998
// código aqui
#pragma warning restore CS1998
```

---

## 🎨 Estilo de Código

### Frontend - Exemplo

```typescript
// ✅ Correto
import { useState } from 'react'

const MyComponent = () => {
  const [count, setCount] = useState(0)
  
  const handleClick = () => {
    setCount(prev => prev + 1)
  }
  
  return (
    <div>
      <button onClick={handleClick}>Count: {count}</button>
    </div>
  )
}

export default MyComponent
```

### Backend - Exemplo

```csharp
// ✅ Correto
using Microsoft.AspNetCore.Mvc;

namespace OrganizedLife.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    
    public UsersController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetAll()
    {
        var users = await _userService.GetAllAsync();
        return Ok(users);
    }
}
```

---

## 🐛 Troubleshooting

### ESLint não está funcionando

```bash
cd frontend
npm install
# Reinicie o VS Code
```

### Prettier não está formatando

1. Verifique se a extensão Prettier está instalada
2. Verifique se há um arquivo `.prettierrc` na pasta frontend
3. Reinicie o VS Code

### C# não está formatando

1. Instale a extensão **C# Dev Kit**
2. Verifique se o arquivo `.editorconfig` existe na pasta backend
3. Em VS Code, vá em Settings e busque por "omnisharp" e habilite:
   - `Enable Editor Config Support`
   - `Enable Roslyn Analyzers`

---

## 📚 Documentação

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)
- [.NET Code Style](https://docs.microsoft.com/dotnet/fundamentals/code-analysis/code-style-rule-options)

---

**✨ Agora seu código sempre estará limpo e consistente!**
