# MimoJs

Framework para criar Web Components com TypeScript e Vite.

Acesse a documentação publicada: https://rogerbaracy.github.io/mimojs/

<details open>
<summary><strong>Select language / Selecione o idioma</strong></summary>

- [Português](#readme-em-portugues)
- [English](#readme-in-english)

</details>

## README em Português

MimoJs é um framework para criar Web Components com TypeScript e Vite. O projeto reúne componentes reutilizáveis, documentação local no navegador e uma experiência simples para desenvolver, gerar e remover componentes.

### Visão geral

- Construído com TypeScript e Vite.
- Estruturado para criação de Web Components reutilizáveis.
- Inclui um visualizador de documentação dos componentes.
- Pronto para execução em ambiente Docker.
- Preparado para publicação em GitHub Pages.

### Requisitos

- Docker instalado e em execução.
- Docker Compose disponível no ambiente.

### Instalação

#### 1. Obter o projeto

Clone o repositório:

```bash
git clone https://github.com/rogerbaracy/mimojs.git
cd mimojs
```

Se preferir, você também pode baixar o projeto como ZIP pela página do repositório e extrair o conteúdo na sua máquina.

#### 2. Subir o ambiente

Inicie o container do projeto:

```bash
docker compose up -d mimojs
```

Se o ambiente ainda não tiver as dependências instaladas dentro do container, execute:

```bash
docker compose exec mimojs sh -lc "npm install"
```

### Como executar

#### Ambiente de desenvolvimento

```bash
docker compose exec mimojs sh -lc "npm run dev -- --host 0.0.0.0"
```

Depois disso, acesse:

```text
http://localhost:5173
```

#### Build de produção

```bash
docker compose exec mimojs sh -lc "npm run build"
```

O build gera a aplicação em dist/.

### Scripts disponíveis

#### Gerar um componente

```bash
docker compose exec mimojs sh -lc "npm run generate nome-do-componente"
```

Exemplo:

```bash
docker compose exec mimojs sh -lc "npm run generate mimo-input"
```

Também é possível informar um caminho interno:

```bash
docker compose exec mimojs sh -lc "npm run generate inputs/mimo-input"
```

#### Remover um componente

```bash
docker compose exec mimojs sh -lc "npm run remove nome-do-componente"
```

Exemplo:

```bash
docker compose exec mimojs sh -lc "npm run remove mimo-input"
```

### Componentes existentes

- MimoButton
- MimoCard
- MimoInputText
- MimoRadio

### Estrutura do projeto

```text
src/
  components/
    <componente>/
      <componente>.ts
      <componente>.html
      <componente>.css
      doc/
        <componente>.doc.html
  core/
templates/
scripts/
public/
```

### Publicação e documentação

- A aplicação usa base configurada para GitHub Pages.
- O arquivo index.html atua como visualizador da documentação dos componentes.
- Os documentos dos componentes ficam dentro de src/components/\*\*/doc/.

### Observações úteis

- O comando de geração cria a estrutura do componente e registra o item no visualizador principal.
- O comando de remoção apaga a pasta do componente e remove o import correspondente do arquivo principal.
- O projeto foi pensado para ser mantido com foco em componentes pequenos, reutilizáveis e fáceis de documentar.

## README in English

MimoJs is a framework for building Web Components with TypeScript and Vite. The project brings together reusable components, local browser-based documentation, and a simple workflow for developing, generating, and removing components.

Published documentation: https://rogerbaracy.github.io/mimojs/

### Overview

- Built with TypeScript and Vite.
- Organized for reusable Web Components development.
- Includes a built-in component documentation viewer.
- Ready to run in a Docker environment.
- Prepared for GitHub Pages publishing.

### Requirements

- Docker installed and running.
- Docker Compose available in your environment.

### Installation

#### 1. Get the project

Clone the repository:

```bash
git clone https://github.com/rogerbaracy/mimojs.git
cd mimojs
```

If you prefer, you can also download the project as a ZIP file from the repository page and extract it locally.

#### 2. Start the environment

Start the project container:

```bash
docker compose up -d mimojs
```

If dependencies are not installed inside the container yet, run:

```bash
docker compose exec mimojs sh -lc "npm install"
```

### Running the project

#### Development mode

```bash
docker compose exec mimojs sh -lc "npm run dev -- --host 0.0.0.0"
```

Then open:

```text
http://localhost:5173
```

#### Production build

```bash
docker compose exec mimojs sh -lc "npm run build"
```

The production build is generated in dist/.

### Available scripts

#### Generate a component

```bash
docker compose exec mimojs sh -lc "npm run generate component-name"
```

Example:

```bash
docker compose exec mimojs sh -lc "npm run generate mimo-input"
```

You can also provide a nested path:

```bash
docker compose exec mimojs sh -lc "npm run generate inputs/mimo-input"
```

#### Remove a component

```bash
docker compose exec mimojs sh -lc "npm run remove component-name"
```

Example:

```bash
docker compose exec mimojs sh -lc "npm run remove mimo-input"
```

### Existing components

- MimoButton
- MimoCard
- MimoInputText
- MimoRadio

### Project structure

```text
src/
  components/
    <component>/
      <component>.ts
      <component>.html
      <component>.css
      doc/
        <component>.doc.html
  core/
templates/
scripts/
public/
```

### Publishing and documentation

- The application uses a base path configured for GitHub Pages.
- The index.html file works as the main component documentation viewer.
- Component documents live under src/components/\*\*/doc/.

### Useful notes

- The generate command creates the component structure and adds it to the main viewer.
- The remove command deletes the component folder and removes the related import from the main entry file.
- The project is designed around small, reusable, and easy-to-document components.

## License

Project maintained for the evolution of the MimoJs ecosystem.
