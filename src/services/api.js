import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokeApi = axios.create({
  baseURL: BASE_URL,
});

// 1. Get the initial paginated list
export const fetchPokemonList = async (limit = 20, offset = 0) => {
  const response = await pokeApi.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
};

// 2. Get specific details for a single Pokemon
export const fetchPokemonDetails = async (nameOrId) => {
  const response = await pokeApi.get(`/pokemon/${nameOrId}`);
  return response.data;
};

// 3. Get species data (for evolution URLs)
export const fetchPokemonSpecies = async (nameOrId) => {
  const response = await pokeApi.get(`/pokemon-species/${nameOrId}`);
  return response.data;
};

// 4. Get the global dictionary (for the Search Bar)
export const fetchAllPokemonNames = async () => {
  const response = await pokeApi.get('/pokemon?limit=10000');
  return response.data.results; 
};

// 5. Get all Pokemon of a specific type (for the Dropdown)
export const fetchPokemonByType = async (type) => {
  if (type === 'all') return null;
  const response = await pokeApi.get(`/type/${type}`);
  return response.data.pokemon.map(p => p.pokemon);
};