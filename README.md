#Solid-API

## Overview
This API provides a demonstration of simple authentication for users, utilizing Prisma for ORM, TypeScript for type safety, Fastify for efficient routing, and TSUP for TypeScript to JavaScript conversion. It follows the principles of SOLID design with dependency inversion and utilizes unit tests with Vitest.

## Features
- User registration
- User login
- Authentication middleware
- Test coverage for all routes

## Technologies Used
- Fastify
- TypeScript
- Prisma
- TSUP
- Vitest

## Installation
1. Clone this repository.
2. Install dependencies using `npm install`.

## Configuration
1. Configure your database connection in `.env` file.
2. Make necessary adjustments in `prisma/schema.prisma` for your database schema.

## Usage
1. Run `npm run build` to compile TypeScript to JavaScript.
2. Run `npm start` to start the server.

## Routes
- `POST /register`: Register a new user.
- `POST /login`: Log in with existing credentials.

## Testing
1. Run `pnpm test` to execute unit tests.
2. Test coverage report will be generated in `coverage` directory.


## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgements
- Thank you to the creators and maintainers of Fastify, TypeScript, Prisma, TSUP, and Vitest for their excellent tools and libraries.
