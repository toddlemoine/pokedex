import { IPokemon } from "pokeapi-typescript";
import { Query, PokemonType } from "../types";
export const last = <T>(coll: T[]): T | null => {
  return coll[coll.length - 1];
};

interface PokemonOtherSprites {
  sprites: {
    other?: {
      ["official-artwork"]: {
        front_default?: string;
      };
    };
  };
}

export const getBestArtworkUrl = (
  pokemon: IPokemon & PokemonOtherSprites
): string => {
  const officialArtwork =
    pokemon.sprites.other && pokemon.sprites.other["official-artwork"];
  return officialArtwork?.front_default ?? pokemon.sprites.front_default ?? "";
};

export const parseUniqueTypes = (pokemon: IPokemon[]): PokemonType[] => {
  const nameSet = pokemon.reduce((acc, curr) => {
    curr.types.forEach((t) => acc.add(t.type.name));
    return acc;
  }, new Set<string>());
  return Array.from(nameSet).map((name) => ({ name }));
};

export const parseTypes = (pokemon: IPokemon): string[] => {
  return pokemon.types.map((t) => t.type.name);
};

export const searchParamsToQuery = (params: URLSearchParams): Query => {
  const validKeys = ["name", "sort", "types", "species"];
  return Array.from(params.entries()).reduce((query, [key, val]) => {
    if (validKeys.includes(key)) {
      query[key] = val;
    }
    return query;
  }, {} as Query);
};
