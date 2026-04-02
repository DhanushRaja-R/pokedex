// src/components/PokemonCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // <-- This is crucial!
import { usePokemonDetails } from '../hooks/usePokemon';
import { TYPE_COLORS } from '../utils/typeColors';
import './PokemonCard.css'; 

const PokemonCard = ({ name }) => {
  const { data: pokemon, isLoading, isError } = usePokemonDetails(name);

  if (isLoading) {
    return <div className="pokemon-card skeleton">Loading...</div>;
  }

  if (isError || !pokemon) return null;

  // Extracting data
  const id = pokemon.id.toString().padStart(3, '0');
  const primaryType = pokemon.types[0].type.name;
  const image = pokemon.sprites.other['official-artwork'].front_default;

  return (
    // The entire card must be wrapped in this Link component!
    <Link 
      to={`/pokemon/${pokemon.name}`} 
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className={`pokemon-card type-${primaryType}`}>
        <div className="card-header">
          <span className="pokemon-id">#{id}</span>
        </div>
        
        <div className="image-container">
          <img src={image} alt={pokemon.name} loading="lazy" />
        </div>
        
        <div className="card-info">
          <h3 className="pokemon-name">{pokemon.name}</h3>
          
          <div className="types">
            {pokemon.types.map((t) => {
              const typeName = t.type.name;
              return (
                <span 
                  key={typeName} 
                  className="type-badge"
                  style={{ 
                    backgroundColor: TYPE_COLORS[typeName] || '#777',
                    color: 'white',
                    textShadow: '0px 1px 2px rgba(0,0,0,0.3)'
                  }}
                >
                  {typeName}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;