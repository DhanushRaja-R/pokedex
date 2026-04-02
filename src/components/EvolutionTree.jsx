// src/components/EvolutionTree.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import './EvolutionTree.css';

// Helper function to extract the Pokemon ID from the species URL
const extractIdFromUrl = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 2]; 
};

// Recursive Component for a single evolution stage
const EvolutionNode = ({ node, isRoot }) => {
  const speciesName = node.species.name;
  const id = extractIdFromUrl(node.species.url);
  // Construct image URL directly from GitHub raw content (same source PokeAPI uses)
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="evolution-stage-wrapper">
      
      {/* Don't show an arrow before the very first Pokemon */}
      {!isRoot && (
        <div className="evolution-arrow">
          <ArrowRight className="arrow-desktop" size={24} color="#ccc" />
          <ArrowDown className="arrow-mobile" size={24} color="#ccc" />
        </div>
      )}

      <div className="evolution-node">
        <Link to={`/pokemon/${speciesName}`} className="evolution-link">
          <div className="evolution-image-container">
            <img src={imageUrl} alt={speciesName} loading="lazy" />
          </div>
          <span className="evolution-name">{speciesName}</span>
        </Link>
        
        {/* If this node has evolutions, recursively render them */}
        {node.evolves_to.length > 0 && (
          <div className={`evolution-branches ${node.evolves_to.length > 1 ? 'is-branched' : ''}`}>
            {node.evolves_to.map((childNode) => (
              <EvolutionNode key={childNode.species.name} node={childNode} isRoot={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Main Export Component
const EvolutionTree = ({ chain }) => {
  if (!chain) return <div className="no-evolution">Genetics unreadable...</div>;

  return (
    <div className="evolution-tree-container">
      <EvolutionNode node={chain} isRoot={true} />
    </div>
  );
};

export default EvolutionTree;