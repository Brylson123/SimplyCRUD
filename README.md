# Perfume Shop API

Welcome to the **Perfume Shop API**! This project is a serverless RESTful API built using **NestJS**, **AWS Lambda**, **Amazon Cognito** for authentication, **DynamoDB** for data storage, and **Swagger** for API documentation.

For test you can use this url: https://tjddd8a4p1.execute-api.eu-central-1.amazonaws.com/dev/products
---

## Technologies Used

- **NestJS** - Backend framework
- **AWS Lambda** - Serverless compute service
- **AWS API Gateway** - HTTP endpoints for Lambda
- **AWS DynamoDB** - NoSQL database
- **Amazon Cognito** - Authentication and authorization
- **Swagger UI** - API documentation
- **Serverless Framework** - Deployment and infrastructure management
- **Dynamoose** - DynamoDB ORM for Node.js

---

## Project Structure

```
src/
 |- products/
 |    |- dto/
 |    |   |- create-product.dto.ts
 |    |   |- update-product.dto.ts
 |    |- schemas/
 |    |   |- products.schema.ts
 |    |- products.controller.ts
 |    |- products.service.ts
 |    |- products.module.ts
 |
 |- common/
 |    |- interfaces/
 |    |   |- product.ts
 |    |   |- response.ts
 |
 |- app.module.ts
 |- lambda.ts (Lambda handler for Serverless)
 |- main.ts (Local server with Swagger UI)
```

---

## Features

- **CRUD operations** on perfume products (Create, Read, Update, Delete)
- **Authentication** on create, update, delete endpoints (using **Amazon Cognito**)
- **OpenAPI (Swagger)** documentation available publicly at `/docs`
- **DynamoDB integration** for scalable and serverless storage
- **Serverless deployment** using Serverless Framework
- **Validation** using `class-validator` and `class-transformer`

---

## Endpoints

| Method | Path              | Authorization | Description               |
|:------:|:------------------|:-------------:|:--------------------------|
| GET    | `/products`        | No            | Fetch all products        |
| GET    | `/products/{id}`   | No            | Fetch product by ID       |
| POST   | `/products`        | Yes           | Create a new product      |
| PUT    | `/products/{id}`   | Yes           | Update a product by ID    |
| DELETE | `/products/{id}`   | Yes           | Delete a product by ID    |

---

## Setup Locally

```bash
npm install

# Run locally with Swagger
npm start:dev

# Access Swagger UI at:
http://localhost:3000/docs
```

## Deploy to AWS

```bash
# Deploy using serverless framework
serverless deploy

# After deploy, use API Gateway URL
https://your-api-id.execute-api.eu-central-1.amazonaws.com/dev/
```

## Authentication
- Authentication is done via **Amazon Cognito**.
- You must **login** via Cognito and **use Bearer token** when accessing protected routes (POST, PUT, DELETE).

https://your-api-id.execute-api.eu-central-1.amazonaws.com/dev/docs


