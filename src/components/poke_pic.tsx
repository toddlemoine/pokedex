import { IPokemon } from "pokeapi-typescript";
import React from "react";
import styles from "./poke_pic.module.css";
import { getBestArtworkUrl } from "../utils";

export const PokePic: React.FC<{ pokemon: IPokemon }> = ({ pokemon }) => {
  return (
    <img
      className={styles.root}
      src={getBestArtworkUrl(pokemon)}
      alt={`${pokemon.name} artwork`}
    />
  );
};
