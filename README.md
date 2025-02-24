# Nextjs and Prisma

## Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Installation](#installation)
- [Docker](#docker)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This is a Nextjs Project with Prisma.

## Technologies

- Nextjs
- Prisma
- Docker
- PostgreSQL
- TypeScript

## Installation

First, cd into the project directory:

```bash
cd nextjs-prisma
```

Install the dependencies:

```bash
npm install
# or
yarn
```

## Docker

You can use Docker to run the application.
First, install Docker and Docker Compose.
Then, run the following command where docker-compose.yml is located:

```bash
docker-compose up
```

## Getting Started

1. First, initialize Prisma in your project:

```bash
npx prisma init
```

2. Open the `.env` file and update the `DATABASE_URL` with your database connection string.
   See `.env.example` for an example.

3. Edit the `prisma/schema.prisma` file to define your data models:
   Example:

```bash
    model User {
        id        Int      @id @default(autoincrement())
        email     String   @unique
        name      String?
        posts     Post[]
    }

    model Post {
        id        Int      @id @default(autoincrement())
        title     String
        content   String?
        published Boolean  @default(false)
        author    User     @relation(fields: [authorId], references: [id])
        authorId  Int
    }
```

4. Migrate Your Database:

```bash
npx prisma migrate dev --name init
```

This will:

    1. Generate a migration file.

    2. Apply the migration to your database.

    3. Create the tables based on your schema.

5. Generate the Prisma Client

```bash
npx prisma generate
```

6. Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application. You can start editing the page by modifying `src/app/*/**.tsx`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

See the [LICENSE](LICENSE) file for details.
