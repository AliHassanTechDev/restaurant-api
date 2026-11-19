# Restaurant API

A simple REST API for a restaurant, built with Node.js, Express and MongoDB.

## Features
- Register and login with hashed passwords (bcrypt)
- JWT token based login
- Create, list and delete orders

## Run locally
1. Install dependencies: `npm install`
2. Create a `.env` file with `MONGODB_URI` and `JWT_SECRET`
3. Start the server: `node server.js`

## Endpoints
- POST /register
- POST /login
- GET /profile (token required)
- GET /orders
- POST /orders
- DELETE /orders/:id
