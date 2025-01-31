# Conversor de PDF para TXT/DOCX

Um aplicativo simples para converter arquivos PDF em texto ou DOCX, funcionando totalmente offline no seu computador.

## Como usar no MacBook

1. **Pré-requisitos**

Primeiro, instale o Node.js usando o Homebrew (se ainda não tiver o Homebrew instalado, visite [brew.sh](https://brew.sh)):

```bash
# Instalar Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Node.js
brew install node
```

2. **Instalação**

```bash
# Clone o repositório
git clone <URL_DO_REPOSITÓRIO>

# Entre na pasta do projeto
cd text-scribe-extractor

# Instale as dependências
npm install
```

3. **Executando o aplicativo**

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

O aplicativo estará disponível em `http://localhost:8080`

## Criando um executável para Mac

1. **Instale o pacote electron-builder globalmente**

```bash
npm install -g electron-builder
```

2. **Crie o executável**

```bash
# Construa o aplicativo
npm run build

# Crie o executável
electron-builder --mac
```

O executável será criado na pasta `dist` do projeto.

## Funcionalidades

- Conversão de PDF para TXT ou DOCX
- Interface intuitiva
- Funcionamento 100% offline
- Download do texto extraído

## Notas importantes

- O aplicativo funciona completamente offline após a instalação
- Todos os arquivos são processados localmente no seu computador
- Nenhum dado é enviado para servidores externos

## Suporte

Se encontrar algum problema, por favor abra uma issue no repositório.