# Lead Management CRM

A production-grade Lead Management CRM built using the MERN stack (MongoDB, Express, React, Node.js) with Tailwind CSS, React Hook Form, and Zod.

## Project Structure

This is a monorepo containing:
- `client/`: React + Vite + Tailwind CSS frontend application.
- `server/`: Node.js + Express + Mongoose backend application.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

## Getting Started

### 1. Clone & Setup Repository

```bash
git clone <repository-url>
cd CRM
```

### 2. Backend Setup (`server/`)

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your connection details:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup (`client/`)

1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and configure the backend URL:
   ```bash
   cp .env.example .env
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Development Features

- **Lead Dashboard**: View details on all leads in a tabular layout or Kanban board toggle.
- **Add / Edit Leads**: Slide-in right panel with real-time Zod validation.
- **Statistics**: Server-computed aggregate stats for total, new, contacted, qualified, converted, and lost leads.
- **Search & Filters**: Debounced search by name, email, or company, plus filtering by status.
- **Sorting & Pagination**: Server-side pagination and column sorting.
- **Theme Support**: Seamless toggle between light mode and dark mode.
