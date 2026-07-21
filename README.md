# COCSIT College ERP & Website CMS (Version 3.0)

## Overview
This repository contains the complete source code for the COCSIT College ERP and Website Content Management System.

### Architecture
*   **Frontend:** React, Vite, React Router, Vanilla CSS
*   **Backend:** Node.js, Express, SQLite (fallback for Supabase)
*   **Authentication:** JWT, Role-Based Access Control (RBAC)

## Portals
The system features 5 distinct portals sharing a unified backend:
1.  **Website CMS (Admin):** Manage global settings, news/notices, and media uploads.
2.  **Student Portal:** View attendance, academic results, fee ledgers.
3.  **Teacher Portal:** Mark attendance, input grades, upload study material.
4.  **HOD Portal:** Department statistics, faculty management, subject curriculum.
5.  **Principal Portal:** Campus-wide analytics and staff directory.

## Deployment Preparation

### Frontend Deployment (Vercel / Netlify / Render)
1. Navigate to the `frontend` directory.
2. Ensure environment variables are set (e.g., `VITE_API_URL`).
3. Build the frontend: `npm run build`
4. The output will be located in the `frontend/dist` directory.

### Backend Deployment (Render / Heroku / DigitalOcean)
1. Navigate to the `backend` directory.
2. Ensure environment variables are set: `PORT`, `JWT_SECRET`, `NODE_ENV`.
3. Install production dependencies: `npm install --production`
4. Start the server: `npm start`
5. *Note on Storage:* If using the local fallback storage, ensure the `/uploads` folder persists (use a persistent disk). If using Supabase Storage, update the storage routes.

## Testing
*   Both frontend and backend builds have been successfully verified.
*   Zero compiler warnings across all React components.
*   RBAC middleware verified via internal routes.

## License
Proprietary - COCSIT College
