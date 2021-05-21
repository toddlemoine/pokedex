import { IPokemon } from 'pokeapi-typescript';
export const last = <T>(coll: T[]): T | null => {
    return coll[coll.length - 1];
};

interface PokemonOtherSprites {
    sprites: {
        other?: {
            ['official-artwork']: {
                front_default?: string;
            };
        };
    };
}

export const getBestArtworkUrl = (pokemon: IPokemon & PokemonOtherSprites): string => {
    const officialArtwork = pokemon.sprites.other && pokemon.sprites.other['official-artwork'];
    return officialArtwork?.front_default ?? pokemon.sprites.front_default ?? '';
};
