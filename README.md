<h1 align="center">Ecommerce Back-End</h1>

<p align="center">
  <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/mayconndouglass/electronics-ecommerce-backend?style=flat-square" />
  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/mayconndouglass/electronics-ecommerce-backend?style=flat-square" />
  <img alt="" src="https://img.shields.io/github/repo-size/mayconndouglass/electronics-ecommerce-backend?style=flat-square" />
  <img alt="GitHub Issues" src="https://img.shields.io/github/issues/mayconndouglass/electronics-ecommerce-backend?style=flat-square" />
  <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/mayconndouglass/electronics-ecommerce-backend?style=flat-square" />
</p>

</br>

### 💻 Projeto
  Este projeto é o backend para um ecommerce, desenvolvido seguindo os princípios de Clean Code, SOLID (Inversão de Dependência, Responsabilidade Única, Liskov) e Clean Architecture. A estrutura do projeto é organizada em camadas (controllers, use cases, repositories, etc.), garantindo o desacoplamento e a independência de cada uma, facilitando a manutenção e a escalabilidade.

### 🕹Técnologias usadas
- [TypeScript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Docker](https://www.docker.com/)
- [Prisma](https://www.prisma.io/)
- [Firebase Storage](https://firebase.google.com/docs/storage?hl=pt)

Outras:
  - Main libs
    - [Bcrypt](https://www.npmjs.com/package/bcrypt)
    - [Multer](https://www.npmjs.com/package/multer)
    - [Zod](https://zod.dev/)
    - [JWT](https://jwt.io/)

  - Formatação
    - [ESLint](https://eslint.org/)
    - [EditorConfig](https://editorconfig.org/)

  ### Estrutura Principal
```
├── src
│   ├── controllers       // Controllers layer
│   ├── use-cases         // Use Cases layer
│   ├── repositories      // Repositories layer
│   ├── app.ts            // Application initialization
│   └── server.ts         // Server configuration and startup
```

 ## API
 ### End Points

#### /cart
* `POST` : /add-to-cart
* `GET` : /items
* `PATCH` : /item/change-quantity
* `DELETE` : /remove-item/:id
* `DELETE` : /remove-all-items
* `PATCH` : /update-cart-items

#### /categories
* `POST` : /categories
* `GET` : /categories

#### /wish-list
* `POST` : /add-item-to-favorites
* `DELETE` : /remove-item-from-favorites/:id
* `GET` : /favorite-items
* `PATCH` : /update-favorite-items

#### /register-order
* `POST` : /register-order

#### /products
* `POST` : /products
* `POST` : /products2
* `GET` : /products
* `GET` : /products-on-sale
* `GET` : /featured-products
* `GET` : /product/:id

#### /users
* `POST` : /users

#### /sessions
* `POST` : /sessions

#### /me
* `GET` : /me

  </br>

## ⚙ Como rodar este projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org)

Você também vai precisar de um editor de código. Eu recomendo o [VSCode](https://code.visualstudio.com/).

### 🐳 Usando Docker

Este projeto também utiliza Docker para simplificar a configuração do ambiente. Siga as instruções abaixo para configurar e rodar o projeto usando Docker.

### 🔧 Passo a passo

1. Clone este repositório:
    ```bash
    https://github.com/mayconndouglass/electronics-ecommerce-backend.git
    ```
   
2. Acesse a pasta do projeto:
    ```bash
    cd academic-gradebook
    ```

3. Instale as dependências do projeto:
    ```bash
    npm install
    ```

4. Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e adicione as variáveis necessárias conforme o exemplo em `.env.example`.

5. Para rodar o projeto localmente sem Docker:
    ```bash
    npm run dev
    ```

### 🐳 Rodando com Docker

1. Certifique-se de que o Docker está instalado e rodando em sua máquina. Você pode baixar o Docker [aqui](https://www.docker.com/get-started).

2. Construa a imagem Docker:
    ```bash
    docker build -t nome-da-imagem .
    ```

3. Rode o container Docker:
    ```bash
    docker run -p 3000:3000 nome-da-imagem
    ```

4. O projeto estará rodando em `http://localhost:3333`.

Pronto! Agora você deve conseguir rodar o projeto em sua máquina.

</br>

---

<p align="center">Desenvolvido por Maycon Douglas</p>

  
