# Lead Management Dashboard Frontend

React-based frontend application for the Lead Management Dashboard.

## Tech Stack

- React 18 (with Vite)
- Redux Toolkit (state management)
- React Router DOM (routing)
- Tailwind CSS v3 (styling)

## Requirements

- Node.js 18+
- Backend API running (default: `http://localhost:5000`)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file (optional, for custom API URL):
   ```
   # Local development
   VITE_API_URL=http://localhost:5000
   
   # Production (Railway)
   # VITE_API_URL=https://lead-management-backend-production-3fc3.up.railway.app/api/leads
   ```

## Run

- Development (with hot reload):
  ```bash
  npm run dev
  ```
  - Default port: `5173`

- Build for production:
  ```bash
  npm run build
  ```

- Preview production build:
  ```bash
  npm run preview
  ```

## Features

- **Authentication**: Login page with hardcoded credentials
- **Dashboard**: Analytics cards (Total Leads, Converted, By Stage)
- **Lead Table**: Paginated table with search and stage filtering
- **Lead Details**: Individual lead view page
- **Protected Routes**: Route protection based on localStorage authentication

## Routes

- `/` - Redirects to `/dashboard` (if authenticated) or `/login`
- `/login` - Login page (public)
- `/dashboard` - Main dashboard with analytics and leads table (protected)
- `/leads/:id` - Individual lead details page (protected)

## State Management

Redux store structure:
- `leads`: Lead data, pagination, analytics, loading/error states

## Styling

- Tailwind CSS v3
- Responsive design (mobile-first)
- Modern card-based UI components

## Environment Variables

- `VITE_API_URL`: Backend API base URL
  - Default: `http://localhost:5000`
  - Production: `https://lead-management-backend-production-3fc3.up.railway.app/api/leads`

## Notes

- Authentication uses localStorage (no backend authentication)
- Hardcoded login credentials: `admin@test.com` / `admin123`
