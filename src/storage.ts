import localforage from "localforage";
import { IPokemon } from "pokeapi-typescript";
import { config } from "./config";

localforage.config({
  driver: localforage.INDEXEDDB,
  name: "pokedex",
  storeName: config.appId,
});

export const storageKey: string = `${config.appId}`;

export const getCachedPokemon = async (): Promise<IPokemon[] | null> => {
  try {
    return await localforage.getItem(storageKey);
  } catch (err) {
    return null;
  }
};

export const setCachedPokemon = async (pokemon: IPokemon[]): Promise<void> => {
  try {
    await localforage.setItem(storageKey, pokemon);
  } catch (err) {
    console.error("Error saving pokemon to cache", err);
  }
};
