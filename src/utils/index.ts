import { IPokemon } from "pokeapi-typescript";
import { SortDirection, Query, PokemonType, PokemonSpecies } from "../types";

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

interface FieldAccessors {
  [key: string]: (p: IPokemon) => string | number;
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
  return Array.from(params.entries()).reduce(
    (query, [key, val]) => {
      if (validKeys.includes(key)) {
        query[key] = val;
      }
      return query;
    },
    { name: "", types: "", species: "", sort: "order.asc" } as Query
  );
};

export const statsToMap = (pokemon: IPokemon): PokemonStatsMap => {
  return pokemon.stats.reduce((acc, stat) => {
    const key: string = stat.stat.name;
    acc[key] = { base: stat.base_stat, effort: stat.effort };
    return acc;
  }, {} as PokemonStatsMap);
};

export const fieldAccessors: FieldAccessors = {
  name: (p: IPokemon): string => p.name,
  type: (p: IPokemon): string => p.types[0].type.name,
  species: (p: IPokemon): string => p.name,
  exp: (p: IPokemon): number => p.base_experience,
  hp: (p: IPokemon): number =>
    p.stats.find((s) => s.stat.name === "hp")?.base_stat ?? 0,
  height: (p: IPokemon): number => p.height,
  weight: (p: IPokemon): number => p.weight,
  ability_count: (p: IPokemon): number => p.abilities.length,
  order: (p: IPokemon): number => p.order,
};

export const flipDirection = (direction: SortDirection): SortDirection => {
  return direction === "asc" ? "desc" : "asc";
};

export const fieldNames = (key: string): string => {
  const fields: { [key: string]: string } = {
    name: "Name",
    type: "Type",
    species: "Species",
    hp: "Hit Points",
    exp: "Base experience",
    height: "Height",
    weight: "Weight",
    ability_count: "Ability Count",
    order: "Order",
  };

  return fields[key] ?? "Unknown";
};

export const titleCase = (str: string): string => {
  return str[0].toUpperCase() + str.split("").slice(1).join("");
};
