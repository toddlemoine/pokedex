import { IPokemon } from "pokeapi-typescript";
import { config } from "../config";

export const storageKey: string = `${config.appId}`;

export const getCachedPokemon = async (): Promise<IPokemon[] | null> => {
  try {
    const cached = window.localStorage.getItem(storageKey);
    return cached ? JSON.parse(cached) : null;
  } catch (err) {
    return null;
  }
};

export const setCachedPokemon = async (pokemon: IPokemon[]): Promise<void> => {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(pokemon));
  } catch (err) {
    console.error("Error saving pokemon to cache", err);
  }
};
