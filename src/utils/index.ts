import { IPokemon } from "pokeapi-typescript";
import { Query, PokemonType, PokemonSpecies } from "../types";
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

interface PokemonStatsMap {
  [name: string]: {
    base: number;
    effort: number;
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
    curr.types?.forEach((t) => acc.add(t.type.name));
    return acc;
  }, new Set<string>());
  return Array.from(nameSet).map((name) => ({ name }));
};

export const parseUniqueSpecies = (pokemon: IPokemon[]): PokemonSpecies[] => {
  const names = pokemon.map((p) => p.species?.name).filter(Boolean);
  const nameSet = new Set(names);
  return Array.from(nameSet).map((name) => ({ name }));
};

export const parseTypes = (pokemon: IPokemon): string[] => {
  return pokemon.types.map((t) => t.type.name).sort();
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

export const statsToMap = (pokemon: IPokemon): PokemonStatsMap => {
  return pokemon.stats.reduce((acc, stat) => {
    const key: string = stat.stat.name;
    acc[key] = { base: stat.base_stat, effort: stat.effort };
    return acc;
  }, {} as PokemonStatsMap);
};
