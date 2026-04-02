// src/components/FilterBar.jsx
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { TYPE_COLORS } from '../utils/typeColors';
import './FilterBar.css';

const FilterBar = ({ searchTerm, setSearchTerm, selectedType, setSelectedType }) => {
  const types = Object.keys(TYPE_COLORS);

  return (
    <div className="filter-bar">
      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="type-filter-container">
        <Filter size={18} />
        <select 
          value={selectedType} 
          onChange={(e) => setSelectedType(e.target.value)}
          className="type-select"
        >
          <option value="all">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;