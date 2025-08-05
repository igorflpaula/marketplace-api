# Marketplace API 🛍️

![Tecnologia](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Linguagem](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![ORM](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Validação](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge)
![Licença](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)

API Restful desenvolvida como projeto final do módulo de backend de uma pós-graduação, simulando as funcionalidades essenciais de um marketplace para gestão de produtos e vendedores.

<br>

## 📋 Tabela de Conteúdos

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades Implementadas](#-funcionalidades-implementadas)
- [🚀 Começando](#-começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
- [Endpoints da API](#-endpoints-da-api)
- [Autor](#-autor)
- [Licença](#-licença)

<br>

## 📝 Sobre o Projeto

O **Marketplace API** é um sistema de backend que oferece uma base sólida para uma aplicação de marketplace. Ele gerencia o ciclo de vida de vendedores e produtos, incluindo autenticação, upload de arquivos, listagem com filtros, e um painel de métricas para os vendedores.

O projeto foi construído seguindo as melhores práticas de desenvolvimento, com uma arquitetura modular, separação de responsabilidades (controllers, services, repositories) e um foco em código limpo e testável.

<br>

## ✨ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **[NestJS](https://nestjs.com/):** Um framework Node.js progressivo para construir aplicações de backend eficientes e escaláveis.
- **[Prisma](https://www.prisma.io/):** Um ORM de próxima geração para Node.js e TypeScript.
- **[Zod](https://zod.dev/):** Uma biblioteca de declaração e validação de schemas para TypeScript.
- **[JWT (JSON Web Tokens)](https://jwt.io/):** Para lidar com a autenticação de forma segura.
- **[Bcrypt](https://www.npmjs.com/package/bcrypt):** Para fazer o hash de senhas de forma segura.
- **[Cloudflare R2](https://www.cloudflare.com/pt-br/developer-platform/r2/):** Serviço de armazenamento de objetos S3-compatível para o upload de arquivos.
- **[MySQL](https://www.mysql.com/):** Banco de dados relacional utilizado no projeto.

<br>

## ✅ Funcionalidades Implementadas

- [x] **Deve ser possível cadastrar novos usuários**
- [x] **Deve ser possível atualizar os dados do usuário**
- [x] **Deve ser possível obter o token de autenticação**
- [x] **Deve ser possível realizar o upload de arquivos**
- [x] **Deve ser possível criar e editar um Produto**
- [x] **Deve ser possível obter dados de um Produto**
- [x] **Deve ser possível obter informações do perfil de um usuário**
- [x] **Deve ser possível listar todas as categorias**
- [x] **Deve ser possível listar todos os produtos por ordem de criação (mais recente)**
- [x] **Deve ser possível listar todos os produtos de um usuário**
- [x] **Deve ser possível alterar o Status do Produto**
- [x] **Deve ser possível registrar uma visualização em um produto**
- [x] **Métricas**
  - [x] Obter métrica de produtos vendidos nos últimos 30 dias
  - [x] Obter métrica de produtos disponíveis nos últimos 30 dias
  - [x] Obter métrica de visualizações nos últimos 30 dias
  - [x] Obter métrica de visualizações por dia dos últimos 30 dias
  - [x] Obter métrica de visualizações de um produto nos últimos 7 dias

<br>

## 🚀 Começando

Siga estas instruções para obter uma cópia do projeto e executá-la em sua máquina local para desenvolvimento e testes.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18.x ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Um servidor de banco de dados [MySQL](https://www.mysql.com/) rodando localmente ou em um container Docker.
- Uma conta na [Cloudflare](https://www.cloudflare.com/) com um bucket R2 configurado.

### Instalação

1.  **Clone o repositório:**

    ```sh
    git clone [https://github.com/igorflpaula/marketplace-api](https://github.com/igorflpaula/marketplace-api)
    ```

2.  **Navegue até a pasta do projeto:**

    ```sh
    cd marketplace-api
    ```

3.  **Instale as dependências:**

    ```sh
    npm install
    ```

4.  **Configure as Variáveis de Ambiente:**
    - Crie uma cópia do arquivo `.env.example` e renomeie para `.env`.
    - Preencha todas as variáveis com suas credenciais do banco de dados e do Cloudflare R2.

    ```sh
    cp .env.example .env
    ```

5.  **Aplique as Migrações do Banco de Dados:**
    Este comando irá criar todas as tabelas necessárias no seu banco.

    ```sh
    npx prisma migrate dev
    ```

6.  **Popule o Banco com Dados Iniciais (Seed):**
    Este comando irá popular a tabela de categorias.

    ```sh
    npx prisma db seed
    ```

7.  **Rode a Aplicação:**
    ```sh
    npm run start:dev
    ```
    A API estará disponível em `http://localhost:3333`.

<br>

## Endpoints da API

Abaixo estão as principais rotas implementadas na API.

| Método  | Rota                   | Protegida? | Descrição                                        |
| :------ | :--------------------- | :--------: | :----------------------------------------------- |
| `POST`  | `/sellers`             |    Não     | Cadastra um novo vendedor.                       |
| `POST`  | `/sessions`            |    Não     | Autentica um vendedor e retorna um cookie JWT.   |
| `GET`   | `/sellers/profile`     |    Sim     | Retorna os dados do vendedor autenticado.        |
| `PUT`   | `/sellers/profile`     |    Sim     | Atualiza os dados do vendedor autenticado.       |
| `POST`  | `/attachments`         |    Sim     | Realiza o upload de um arquivo.                  |
| `GET`   | `/categories`          |    Não     | Lista todas as categorias de produtos.           |
| `POST`  | `/products`            |    Sim     | Cria um novo produto.                            |
| `GET`   | `/products`            |    Não     | Lista todos os produtos com filtros e paginação. |
| `GET`   | `/products/:id`        |    Não     | Busca os detalhes de um produto específico.      |
| `PUT`   | `/products/:id`        |    Sim     | Edita um produto (apenas o dono).                |
| `PATCH` | `/products/:id/status` |    Sim     | Altera o status de um produto (apenas o dono).   |
| `POST`  | `/products/:id/view`   |    Sim     | Registra uma visualização em um produto.         |
| `GET`   | `/products/me`         |    Sim     | Lista os produtos do vendedor autenticado.       |
| `GET`   | `/metrics/...`         |    Sim     | Retorna diversas métricas para o vendedor.       |

<br>

## ✒️ Autor

**[Igor de Paula]**

- GitHub: [@igorflpaula](https://github.com/igorflpaula)
- LinkedIn: [Igor de Paula](https://www.linkedin.com/in/igor-fl-de-paula/)

<br>

## 📜 Observação

Utilizei IA para me auxiliar na montagem desse READ.ME
