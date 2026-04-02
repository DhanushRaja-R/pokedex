// src/components/PokedexGrid.jsx
import React, { useState, useMemo } from 'react';
import { usePokemonList, useGlobalPokemonList, usePokemonByType } from '../hooks/usePokemon'; 
import PokemonCard from './PokemonCard';
import FilterBar from './FilterBar';
import './PokedexGrid.css';

const PokedexGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // 1. Paginated Data (Default View)
  const { data: paginatedData, isLoading: isLoadingPaginated, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonList();
  
  // 2. Global Data (For text searching)
  const { data: globalList } = useGlobalPokemonList();
  
  // 3. Type Data (For dropdown filtering)
  const { data: typeList, isLoading: isLoadingType } = usePokemonByType(selectedType);

  const allLoadedPokemon = useMemo(() => {
    if (!paginatedData) return [];
    return paginatedData.pages.flatMap(page => page.results);
  }, [paginatedData]);

  // === THE MASTER DISPLAY LOGIC ===
  const displayPokemon = useMemo(() => {
    let baseList = [];

    // Step A: Determine which list is our "Base"
    if (selectedType !== 'all' && typeList) {
      baseList = typeList; // Use the specific type list
    } else if (searchTerm.length > 0 && globalList) {
      baseList = globalList; // Use the massive global list
    } else {
      baseList = allLoadedPokemon; // Use the normal scrolling list
    }

    // Step B: Apply text search to the chosen base list
    let finalResults = baseList;
    if (searchTerm.length > 0) {
      finalResults = finalResults.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Step C: Performance Guard (Don't render 1000 cards at once!)
    if (searchTerm.length > 0 || selectedType !== 'all') {
      return finalResults.slice(0, 40); 
    }

    return finalResults;
  }, [searchTerm, selectedType, globalList, allLoadedPokemon, typeList]);


  if (isLoadingPaginated) return <div className="loading-screen">Booting Pokédex...</div>;

  // Check if we are actively using a filter
  const isFiltering = searchTerm.length > 0 || selectedType !== 'all';

  return (
    <div className="pokedex-container">
      <FilterBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      {isFiltering && displayPokemon.length === 40 && (
        <p className="search-warning" style={{textAlign: 'center', color: '#888', marginBottom: '1rem'}}>
          Showing top 40 results. Keep typing to narrow it down!
        </p>
      )}

      {isLoadingType && <p style={{textAlign: 'center'}}>Scanning for {selectedType} types...</p>}

      <div className="pokemon-grid">
        {displayPokemon.length > 0 ? (
          displayPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} />
          ))
        ) : (
          !isLoadingType && (
            <div className="no-results" style={{textAlign: 'center', gridColumn: '1 / -1', padding: '3rem'}}>
              <h2>No Pokémon found.</h2>
            </div>
          )
        )}
      </div>
      
      {/* Only show Load More if we are looking at the default view */}
      {hasNextPage && !isFiltering && (
        <button 
          className="load-more-btn"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Scanning...' : 'Load More Pokémon'}
        </button>
      )}
    </div>
  );
};

export default PokedexGrid;