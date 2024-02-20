# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# This project actually contains two projects:

- A React.js application (i.e., the frontend SPA)
- A dummy backend API to which the React app can "talk" (to send + fetch data)

# You must run "npm install" in both project folders.

Thereafter, you can start the dummy backend API server via "npm start" (inside the "backend" folder).
The React app dev server is then started via "npm run dev".

# You MUST have both servers (backend + frontend) up and running for the projects to work.

The dummy backend API does not use any external database - instead the dummy data is saved to an "events.json" file inside the project folder.
