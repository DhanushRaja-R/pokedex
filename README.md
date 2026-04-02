# ⚡ Pokédex 

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

A blazing-fast, production-ready Pokédex application built with modern React. It features advanced data fetching, aggressive caching, infinite scrolling, and a robust global search that seamlessly filters through 1,000+ Pokémon.

**🔴 Live Demo:** [View on Vercel](https://pokedex-ash-greninja-123.vercel.app)

---

## ✨ Features

- **Infinite Scrolling:** Implemented using `@tanstack/react-query` to seamlessly fetch and append paginated data as the user scrolls, minimizing initial load times.
- **Debounced Global Search:** A custom search architecture that downloads a lightweight dictionary of all Pokémon names in the background, allowing for instant filtering without crashing the browser or hitting API rate limits.
- **Relational Type Filtering:** Users can dynamically filter the grid by specific Pokémon types via dedicated API endpoints.
- **Dynamic Routing:** Utilizes `react-router-dom` for seamless navigation between the master grid and deep-dive detail pages, complete with full Evolution Trees.
- **Persistent Dark/Light Mode:** Engineered using CSS Variables and browser `localStorage` for a zero-flicker, performant theme toggle.
- **Responsive Design:** A mobile-first CSS grid layout with dynamic color themes based on Pokémon typings.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite
- **Routing:** React Router v6
- **Data Fetching & Caching:** TanStack Query (React Query) v5, Axios
- **Icons:** Lucide-React
- **API:** [PokéAPI](https://pokeapi.co/)
- **Deployment:** Vercel

---

## 🏗️ Architecture & State Management

This project was built to demonstrate scalable frontend architecture:
1. **Custom Hooks (`src/hooks/usePokemon.js`):** All API logic and caching rules are abstracted into custom TanStack queries. This keeps components clean and strictly focused on UI rendering.
2. **Network Optimization:** Instead of loading 1,000 heavy image assets at once, the app utilizes "shallow" requests for names, and allows individual `PokemonCard` components to fetch their own heavy assets only when they enter the viewport.
3. **Global CSS Variables:** Theming is handled at the document root, allowing the browser's native engine to paint theme transitions instantly without triggering React re-renders.

---

## 🚀 Local Development Setup

To run this project locally on your machine:

**1. Clone the repository:**
```bash
git clone [https://github.com/DhanushRaja-R/pokedex.git](https://github.com/DhanushRaja-R/pokedex.git)
cd pokedex

2. Install dependencies:

Bash
npm install
3. Start the Vite development server:

Bash
npm run dev
4. Open your browser:
Navigate to http://localhost:5173

📂 Folder Structure
Plaintext
src/
├── components/      # Reusable UI elements (PokemonCard, FilterBar, etc.)
├── hooks/           # Custom React Query hooks for state/fetching
├── pages/           # Top-level route components (PokemonDetail)
├── services/        # Axios configuration and API endpoint functions
├── utils/           # Helper functions and constants (Type colors)
├── App.jsx          # Main application router and theme provider
└── main.jsx         # React root and QueryClient setup
🔮 Future Enhancements
[ ] Add an interactive stat radar chart using Chart.js or D3.

[ ] Implement a "Favorites" feature using local storage to let users build their own team.

[ ] Add native Pokémon cries (audio) to the detail page.

Designed and developed by Dhanush Raja.
