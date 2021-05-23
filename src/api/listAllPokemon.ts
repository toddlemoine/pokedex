import { INamedApiResourceList, IPokemon } from "pokeapi-typescript";
import { ApiError } from "./api_error";
import { config } from "../config";

export const listAllPokemon = async (): Promise<
  INamedApiResourceList<IPokemon>
> => {
  try {
    const rawResp = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${config.pokedexSize}`
    );
    const resp = await rawResp.json();
    return resp;
  } catch (err) {
    throw new ApiError(`Error fetching list of Pokemon.`, err.message);
  }
};
