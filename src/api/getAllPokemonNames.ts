import PokeAPI, { INamedApiResourceList, IPokemon } from 'pokeapi-typescript';
import { ApiError } from './api_error';

export const getAllPokemonNames = async (): Promise<INamedApiResourceList<IPokemon>> => {
    try {
        const resp = await PokeAPI.Pokemon.listAll();
        return resp;
    } catch (err) {
        throw new ApiError(`Unknown error fetching list of Pokemon.`);
    }
};
