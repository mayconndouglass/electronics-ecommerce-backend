<h1 align="center">Ecommerce Back-End</h1>

<p align="center">
  <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/mayconndouglass/electronics-ecommerce-backend?style=flat-square" />
  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/mayconndouglass/electronics-ecommerce-backend?style=flat-square" />
  <img alt="" src="https://img.shields.io/github/repo-size/mayconndouglass/electronics-ecommerce-backend?style=flat-square" />
  <img alt="GitHub Issues" src="https://img.shields.io/github/issues/mayconndouglass/electronics-ecommerce-backend?style=flat-square" />
  <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/mayconndouglass/electronics-ecommerce-backend?style=flat-square" />
</p>

</br>

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

### 💻 Projeto
  Este projeto é o backend para um ecommerce, desenvolvido seguindo os princípios de Clean Code, SOLID (Inversão de Dependência, Responsabilidade Única, Liskov) e Clean Architecture. A estrutura do projeto é organizada em camadas (controllers, use cases, repositories, etc.), garantindo o desacoplamento e a independência de cada uma, facilitando a manutenção e a escalabilidade.

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



  
  
