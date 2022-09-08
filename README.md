# modern-walk-nestjs-api

REST API for modern walk app.

## Technologies used
TypeScript, NodeJS, NestJS, TypeORM, PostgreSQL

## Architecture

### Entities
- Users
- Products
- Categories
- Tenants

### API Specification

#### Base URL
- `http://{ host }:{ port }/`

#### Users

| Method | Path                 | Description               |
| -------| ---------------------| --------------------------|
| GET    | /users| Get all users       |
| GET    | /users/{id} | Find one user by id           |
| POST   | /users            | Add a new user              |
| PUT   | /users/{id}              | Update one user by id          |
| DELETE   | /users/{id}              | Delete one user by id             |

#### Products

| Method | Path                 | Description               |
| -------| ---------------------| --------------------------|
| GET    | /products                    | Get all products            |
| GET   | /products/{id}              | Find one product by id        |
| POST   | /products             | Add one new product             |
| PUT   | /products/{id}              | Update one product by id          |
| DELETE   | /products/{id}              | Delete one product by id             |

#### Tenants

| Method | Path                 | Description               |
| -------| ---------------------| --------------------------|
| GET    | /tenants                    | Get all tenants            |
| GET   | /tenants/{id}              | Find one tenant by id        |
| POST   | /tenants             | Add one new tenant             |
| PUT   | /tenants/{id}              | Update one tenant by id          |
| DELETE   | /tenant/{id}              | Delete one tenant by id             |

#### Categories

| Method | Path                 | Description               |
| -------| ---------------------| --------------------------|
| GET    | /categories                    | Get all categories            |
| GET   | /categories/{id}              | Find one category by id        |
| POST   | /categories             | Add one new category             |
| PUT   | /categories/{id}              | Update one category by id          |
| DELETE   | /category/{id}              | Delete one category by id             |
