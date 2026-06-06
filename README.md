# LeadFlow CRM — Enterprise Lead Management System

A high-performance, responsive, and spiritually crafted Full-Stack Lead Management CRM. Designed with a clean separation of concerns, the application serves as a robust dashboard for small businesses to track, filter, search, and manage leads through a fluid user interface with support for both Table and Kanban perspectives.

Built using the **MERN Stack** (MongoDB, Express, React, Node.js) with **Tailwind CSS**, **React Hook Form**, and **Zod** schema validation.

---

## 🏗️ System Architecture & Engineering Philosophy

This project is structured as a Monorepo containing decoupled `client` and `server` directory structures. Key engineering highlights include:

*   **Type-Safe Request Validation**: Both the client-side forms and the backend endpoints share strict validation constraints powered by **Zod**. This guarantees that invalid data is rejected before it even reaches the network layer.
*   **Decoupled State Management**: React state is managed cleanly using a custom `LeadContext` combined with the `useReducer` hook, creating a predictable one-way data flow resembling Redux without the boilerplate.
*   **Custom Settings Persistence**: Settings like **Data Density** (comfortable/compact/spacious), **Default Dashboard View** (Table/Kanban), and **Pagination Size** are persisted natively in the browser via a custom `SettingsContext` synced with `localStorage`, minimizing cumulative layout shifts.
*   **Aggregated Analytics**: The backend provides a single-pass MongoDB aggregation route (`/api/leads/stats`) to compile real-time CRM performance indicators, eliminating client-side compute overhead.
*   **Robust Global Error Handling**: Custom global error-handling middlewares on the backend catch asynchronous exceptions gracefully and format error responses in a standardized API format.

---

## 🛠️ Technical Stack

### Frontend (Client)
*   **Core**: React 18, Vite (Fast HMR)
*   **Styling & UI**: Tailwind CSS (Native dark mode toggle)
*   **Form Management**: React Hook Form
*   **Validation**: Zod (Client-side schema validation)
*   **Icons**: Lucide React
*   **HTTP client**: Axios (configured with clean interceptors and baseURL environment config)
*   **Notifications**: React Hot Toast (Micro-animations)

### Backend (Server)
*   **Framework**: Node.js, Express.js
*   **Database**: MongoDB Atlas, Mongoose ODM
*   **Security & Logs**: Helmet (secure HTTP headers), CORS, Morgan (HTTP request logger)
*   **Linter/Dev Tools**: Nodemon, ESLint

---

## 📁 Repository Structure

```text
CRM/
├── client/                 # Frontend React Application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── api/            # Axios API connection endpoints
│   │   ├── components/     # UI, layouts, and leads-related modular components
│   │   ├── context/        # Theme, Lead, and Settings state providers
│   │   ├── hooks/          # Custom hooks (e.g., useDebounce)
│   │   ├── pages/          # Analytics, Settings, and Dashboard views
│   │   ├── schemas/        # Zod verification validation schemas
│   │   └── utils/          # Formatting helpers (currencies, dates)
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json         # SPA router redirects for Vercel
│
└── server/                 # Backend Node/Express API
    ├── src/
    │   ├── config/         # Mongoose & environment configuration
    │   ├── controllers/    # API business logic handlers
    │   ├── middleware/     # Cors, global error, and request filters
    │   ├── models/         # Mongoose Lead schema definitions
    │   ├── routes/         # Express router mount points
    │   └── utils/          # Seed scripts and standard API helpers
    ├── package.json
    └── .env.example
```

---

## ⚙️ Local Setup & Installation

### Prerequisites
*   Node.js (v18 or higher recommended)
*   A running MongoDB database (Local or MongoDB Atlas cluster connection string)

### 1. Clone the Repository
```bash
git clone https://github.com/SanketTheCodeCrafter/CRM.git
cd CRM
```

### 2. Configure & Run Backend Server (`/server`)
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/crm?retryWrites=true&w=majority
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   ```
5. **(Optional) Seed Database with Mock Data**:
   To seed the database with representative lead profiles, run:
   ```bash
   npm run seed
   ```
6. Start the API server in development mode:
   ```bash
   npm run dev
   ```

### 3. Configure & Run Frontend Client (`/client`)
1. Open a new terminal session and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Update the client environment configuration:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
5. Start the Vite local server:
   ```bash
   npm run dev
   ```

Now open your browser and navigate to `http://localhost:5173`.

---

## 📡 API Specification

All API responses follow a uniform JSON structure to simplify client consumption:
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation description"
}
```

| HTTP Method | Route | Description | Query Parameters / Payload |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/health` | Service status health check | None |
| **GET** | `/api/leads` | Retrieve paginated, sorted, and filtered leads | `page`, `limit`, `search`, `status`, `sortBy`, `sortOrder` |
| **GET** | `/api/leads/stats` | Retrieve real-time aggregate dashboard stats | None |
| **POST** | `/api/leads` | Create a new lead (with validation) | `{ name, email, phone, company, status, notes }` |
| **PUT** | `/api/leads/:id` | Update an existing lead record | `{ name, email, phone, company, status, notes }` |
| **DELETE**| `/api/leads/:id` | Delete a lead from the database | None |

---

## 🗄️ Database Design (MongoDB / Mongoose Schema)

The Mongoose Lead Model contains indexing for high-throughput searches.

```javascript
const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      index: true // Indexed for search optimization
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      index: true
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'],
      default: 'New',
      index: true
    },
    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true // Automatically tracks 'createdAt' and 'updatedAt'
  }
);
```

---

## 🚀 Production Deployment Configuration

### Frontend (Vercel)
*   **Root Directory**: `client`
*   **Framework Preset**: `Vite`
*   **Build Command**: `npm run build`
*   **Output Directory**: `dist`
*   **Environment Variables**:
    *   `VITE_API_URL`: `https://<your-render-backend-url>.onrender.com/api`

### Backend (Render Web Service)
*   **Root Directory**: `server`
*   **Build Command**: `npm install`
*   **Start Command**: `node src/server.js` or `npm start`
*   **Environment Variables**:
    *   `NODE_ENV`: `production`
    *   `MONGODB_URI`: `<your-production-mongodb-atlas-uri>`
    *   `CORS_ORIGIN`: `https://<your-vercel-app-name>.vercel.app`
