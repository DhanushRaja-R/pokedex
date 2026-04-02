// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import PokedexGrid from './components/PokedexGrid';
import PokemonDetail from './pages/PokemonDetail';
import { useTheme } from './hooks/useTheme'; // Import our new hook
import './App.css';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-container">
      <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
        <h1 style={{ margin: 0 }}>Pokédex</h1>
        
        {/* The Theme Toggle Button */}
        <button 
          onClick={toggleTheme} 
          className="theme-toggle"
          aria-label="Toggle Dark Mode"
        >
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </header>
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<PokedexGrid />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;