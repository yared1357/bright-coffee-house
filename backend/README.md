# ☕ Bright Coffee House — Backend

This is the **Express + Prisma** backend API for the Bright Coffee House web application.

## Tech Stack

- **Node.js** with TypeScript
- **Express.js** (HTTP server)
- **Prisma ORM** (database)
- **SQLite** (dev database, via `dev.db`)
- **bcryptjs** (password hashing)
- **jsonwebtoken** (admin authentication)
- **multer** (image uploads)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Edit the `.env` file (already present) with your settings:

| Variable       | Description                             | Default                 |
|----------------|-----------------------------------------|-------------------------|
| `PORT`         | Port to run the server on               | `5000`                  |
| `DATABASE_URL` | Your database connection string         | SQLite dev.db           |
| `JWT_SECRET`   | Secret key for signing JWT tokens       | (change this!)          |
| `NODE_ENV`     | Environment (`development`/`production`)| `development`           |

### 3. Set up the database

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4. Seed the database (creates default admin user)

```bash
npm run prisma:seed
```

### 5. Run the development server

```bash
npm run dev
```

The API will be available at **http://localhost:5000**

## Project Structure

```
backend/
├── src/
│   └── index.ts        # Main server file with all API routes
├── prisma/
│   ├── schema.prisma   # Database schema
│   ├── migrations/     # Database migrations
│   ├── seed.js         # Database seed script
│   └── dev.db          # SQLite development database
├── uploads/            # Uploaded service images
├── .env                # Environment variables
├── package.json
└── tsconfig.json
```

## API Endpoints

### Auth
| Method | Endpoint                    | Auth | Description           |
|--------|-----------------------------|------|-----------------------|
| POST   | `/api/auth/login`           | No   | Admin login           |
| PUT    | `/api/auth/change-password` | Yes  | Change admin password |

### Contacts / Messages
| Method | Endpoint                    | Auth | Description           |
|--------|-----------------------------|------|-----------------------|
| POST   | `/api/contacts`             | No   | Submit contact form   |
| GET    | `/api/contacts`             | Yes  | Get all messages      |
| PUT    | `/api/contacts/:id/read`    | Yes  | Mark message as read  |
| DELETE | `/api/contacts/:id`         | Yes  | Delete a message      |

### Services (Menu Items)
| Method | Endpoint                    | Auth | Description           |
|--------|-----------------------------|------|-----------------------|
| GET    | `/api/services`             | No   | Get all services      |
| POST   | `/api/services`             | Yes  | Create a service      |
| PUT    | `/api/services/:id`         | Yes  | Update a service      |
| DELETE | `/api/services/:id`         | Yes  | Delete a service      |

### Subscriptions
| Method | Endpoint                    | Auth | Description           |
|--------|-----------------------------|------|-----------------------|
| POST   | `/api/subscribe`            | No   | Subscribe to newsletter|
| GET    | `/api/subscriptions`        | Yes  | Get all subscribers   |
| DELETE | `/api/subscriptions/:id`    | Yes  | Remove a subscriber   |

### Dashboard
| Method | Endpoint   | Auth | Description       |
|--------|------------|------|-------------------|
| GET    | `/api/stats`| Yes | Dashboard stats   |

## Available Scripts

| Command                    | Description                       |
|----------------------------|-----------------------------------|
| `npm run dev`              | Start development server (ts-node)|
| `npm run build`            | Compile TypeScript                |
| `npm run start`            | Start compiled production server  |
| `npm run prisma:generate`  | Generate Prisma client            |
| `npm run prisma:migrate`   | Run database migrations           |
