import { IPokemonSpecies, IType } from "pokeapi-typescript";

export interface Query {
  [key: string]: string;
  name: string;
  species: string;
  types: string;
  sort: string;
}

export type PokemonType = Pick<IType, "name">;
export type PokemonSpecies = Pick<IPokemonSpecies, "name">;
