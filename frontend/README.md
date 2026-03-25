# ☕ Bright Coffee House — Frontend

This is the **React + Vite** frontend for the Bright Coffee House web application.

## Tech Stack

- **React 19** with TypeScript
- **Vite** (build tool)
- **Tailwind CSS v4**
- **React Router DOM v7**
- **Lucide React** (icons)
- **Motion** (animations)
- **Google Gemini AI** (AI assistant)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable         | Description                        |
|------------------|------------------------------------|
| `GEMINI_API_KEY` | Your Google Gemini API key         |

### 3. Run the development server

```bash
npm run dev
```

The frontend will be available at **http://localhost:3000**

> ⚠️ Make sure the **backend** is also running on port `5000` before starting the frontend.

## Project Structure

```
frontend/
├── src/
│   ├── admin/          # Admin panel pages (Dashboard, Messages, Services, etc.)
│   ├── components/     # Reusable UI components (Navbar, Hero, Menu, Footer, etc.)
│   ├── pages/          # Main public pages (Home)
│   ├── lib/            # API utilities
│   ├── App.tsx         # Root app with routing
│   ├── main.tsx        # React entry point
│   └── index.css       # Global styles
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Available Scripts

| Command           | Description                  |
|-------------------|------------------------------|
| `npm run dev`     | Start development server     |
| `npm run build`   | Build for production         |
| `npm run preview` | Preview production build     |
| `npm run lint`    | Run TypeScript type checks   |

## Admin Panel

- URL: `http://localhost:3000/admin`
- Default credentials are set up via the backend seed script
