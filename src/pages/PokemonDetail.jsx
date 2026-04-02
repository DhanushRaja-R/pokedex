// src/pages/PokemonDetail.jsx
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePokemonDetails, usePokemonSpecies, useEvolutionChain, useTypeRelations } from '../hooks/usePokemon';
import { ArrowLeft } from 'lucide-react';
import { TYPE_COLORS } from '../utils/typeColors';
import './PokemonDetail.css';

const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  
  // 1. Fetch Core Data
  const { data: pokemon, isLoading: loadingDetails, isError: errorDetails } = usePokemonDetails(name);
  const { data: species, isLoading: loadingSpecies } = usePokemonSpecies(name);

  // 2. Fetch Secondary Data (Derived from Core Data URLs)
  const evolutionUrl = species?.evolution_chain?.url;
  const { data: evolutionData } = useEvolutionChain(evolutionUrl);
  
  const primaryTypeUrl = pokemon?.types[0]?.type?.url;
  const { data: typeRelations } = useTypeRelations(primaryTypeUrl);

  // Loading and Error States
  if (loadingDetails || loadingSpecies) {
    return <div className="detail-loading-screen">Analyzing Data for {name}...</div>;
  }

  if (errorDetails || !pokemon || !species) {
    return (
      <div className="error-screen">
        <h2>Failed to load Pokémon data.</h2>
        <button className="back-btn" onClick={() => navigate('/')}>Return to Pokedex</button>
      </div>
    );
  }

  // Extract necessary variables
  const primaryType = pokemon.types[0].type.name;
  const image = pokemon.sprites.other['official-artwork'].front_default;
  const pokemonId = pokemon.id.toString().padStart(3, '0');

  // Helper function to traverse the nested evolution chain to find the NEXT evolution
  const getNextEvolution = () => {
    if (!evolutionData) return null;
    
    const findNext = (node) => {
      if (node.species.name === name) {
        return node.evolves_to.length > 0 ? node.evolves_to[0].species.name : 'Fully Evolved';
      }
      for (let nextNode of node.evolves_to) {
        const result = findNext(nextNode);
        if (result) return result;
      }
      return null;
    };
    
    return findNext(evolutionData.chain);
  };

  const nextEvolutionName = getNextEvolution();

  return (
    <div className="detail-container">
      <button className="back-btn" onClick={() => navigate('/')}>
        <ArrowLeft size={24} /> Back to Hub
      </button>

      <div className="detail-header">
        <h1>{pokemon.name}</h1>
        <span className="pokemon-id">#{pokemonId}</span>
      </div>

      <div className="detail-content">
        
        {/* === LEFT COLUMN: Image, Types, Abilities === */}
        <div className="left-column">
          <div className="image-card" style={{ backgroundColor: `${TYPE_COLORS[primaryType]}20` }}>
            <img src={image} alt={pokemon.name} />
          </div>
          
          <div className="types-container">
            {pokemon.types.map((t) => (
              <span 
                key={t.type.name} 
                className="type-badge"
                style={{ 
                  backgroundColor: TYPE_COLORS[t.type.name] || '#777',
                  color: 'white',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="abilities-section">
            <h3>Abilities</h3>
            <div className="ability-list">
              {pokemon.abilities.map((a) => (
                <span key={a.ability.name} className="ability-pill">
                  {a.ability.name.replace('-', ' ')}
                  {a.is_hidden && <span className="hidden-tag"> (Hidden)</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* === RIGHT COLUMN: Matchups & Evolution === */}
        <div className="right-column">
          
          {/* Battle Matchups */}
          {typeRelations && (
            <div className="matchup-section">
              <h3>Type Matchups (Primary)</h3>
              
              <div className="matchup-group">
                <h4>Strong Against (2x Damage)</h4>
                <div className="type-list">
                  {typeRelations.double_damage_to.length > 0 ? (
                    typeRelations.double_damage_to.map(t => (
                      <span key={t.name} className="type-badge small" style={{ backgroundColor: TYPE_COLORS[t.name] }}>
                        {t.name}
                      </span>
                    ))
                  ) : <span className="none-text">None</span>}
                </div>
              </div>

              <div className="matchup-group">
                <h4>Weak Against (Takes 2x Damage)</h4>
                <div className="type-list">
                  {typeRelations.double_damage_from.length > 0 ? (
                    typeRelations.double_damage_from.map(t => (
                      <span key={t.name} className="type-badge small" style={{ backgroundColor: TYPE_COLORS[t.name] }}>
                        {t.name}
                      </span>
                    ))
                  ) : <span className="none-text">None</span>}
                </div>
              </div>
            </div>
          )}

          {/* Evolution Chain Data */}
          <div className="evolution-section">
            <h3>Evolution Data</h3>
            <div className="evolution-status">
              {nextEvolutionName === 'Fully Evolved' ? (
                <p>This Pokémon has reached its final form.</p>
              ) : nextEvolutionName ? (
                <p>
                  Evolves into: 
                  <Link to={`/pokemon/${nextEvolutionName}`} className="evo-link">
                    {nextEvolutionName}
                  </Link>
                </p>
              ) : (
                <p>Analyzing genetics...</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;