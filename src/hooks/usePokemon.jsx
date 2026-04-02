import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { 
  fetchPokemonList, 
  fetchPokemonDetails, 
  fetchPokemonSpecies, 
  fetchAllPokemonNames,
  fetchPokemonByType 
} from '../services/api';

export const usePokemonList = () => {
  return useInfiniteQuery({
    queryKey: ['pokemonList'],
    queryFn: async ({ pageParam = 0 }) => {
      return await fetchPokemonList(20, pageParam);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return url.searchParams.get('offset');
    },
  });
};

export const usePokemonDetails = (name) => {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemonDetails(name),
    enabled: !!name, 
  });
};

export const usePokemonSpecies = (name) => {
  return useQuery({
    queryKey: ['pokemonSpecies', name],
    queryFn: () => fetchPokemonSpecies(name),
    enabled: !!name,
  });
};

export const useEvolutionChain = (evolutionUrl) => {
  return useQuery({
    queryKey: ['evolution', evolutionUrl],
    queryFn: async () => {
      const { data } = await axios.get(evolutionUrl);
      return data;
    },
    enabled: !!evolutionUrl,
  });
};

export const useTypeRelations = (typeUrl) => {
  return useQuery({
    queryKey: ['typeRelations', typeUrl],
    queryFn: async () => {
      const { data } = await axios.get(typeUrl);
      return data.damage_relations;
    },
    enabled: !!typeUrl,
  });
};

export const useGlobalPokemonList = () => {
  return useQuery({
    queryKey: ['globalPokemonList'],
    queryFn: fetchAllPokemonNames,
    staleTime: Infinity, 
  });
};

export const usePokemonByType = (type) => {
  return useQuery({
    queryKey: ['pokemonByType', type],
    queryFn: () => fetchPokemonByType(type),
    enabled: type !== 'all', 
    staleTime: Infinity, 
  });
};