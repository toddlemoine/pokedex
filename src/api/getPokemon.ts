import { INamedApiResource, IPokemon } from 'pokeapi-typescript';
import { GetPokemonError } from './api_error';

export const getPokemon = async (resource: INamedApiResource<IPokemon>): Promise<IPokemon> => {
    try {
        const resp = await fetch(resource.url, { headers: { 'Content-Type': 'application/json' } });
        const json = await resp.json();
        return json;
    } catch (err) {
        throw new GetPokemonError(resource.name, resource.url);
    }
};
