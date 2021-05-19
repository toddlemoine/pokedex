import PokeAPI, { IPokemon } from 'pokeapi-typescript';
import { ApiError } from './api_error';

export const getPokemonByName = async (name: string): Promise<IPokemon> => {
    try {
        const resp = await PokeAPI.Pokemon.resolve(name);
        return resp;
    } catch (err) {
        // If we get 'invalid-json' back, assume it's a "Not found" response.
        if (err.type === 'invalid-json') {
            throw new ApiError('Pokemon not found', err.status);
        } else {
            throw new ApiError(`Unknown error fetching pokemon.`);
        }
    }
};
