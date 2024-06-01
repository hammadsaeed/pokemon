import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: Pokemon[];
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonDetail {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  sprites: {
    front_default: string;
  };
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({baseUrl: Config.API_URL}),
  endpoints: builder => ({
    getPokemons: builder.query<PokemonListResponse, void>({
      query: () => 'pokemon',
    }),
    getPokemonById: builder.query<PokemonDetail, string>({
      query: name => `pokemon/${name}`,
    }),
  }),
});

export const {useGetPokemonsQuery, useGetPokemonByIdQuery} = pokemonApi;
