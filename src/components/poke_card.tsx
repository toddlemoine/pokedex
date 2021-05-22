import { Heading, Paragraph } from "evergreen-ui";
import { IPokemon } from "pokeapi-typescript";
import React, { PropsWithChildren } from "react";
import styles from "./poke_card.module.css";
import { PokePic } from "./poke_pic";
import { titleCase } from "../utils";

export const PokeCard: React.FC<PropsWithChildren<{
  pokemon: IPokemon;
  onClick: (item: IPokemon) => void;
}>> = ({ pokemon, onClick, ...props }) => {
  const handleClick = () => onClick(pokemon);

  return (
    <button className={styles.root} {...props} onClick={handleClick}>
      <PokePic pokemon={pokemon} />
      <Heading>{titleCase(pokemon.name)}</Heading>
      <Paragraph>Height: {pokemon.height}</Paragraph>
      <Paragraph>Weight: {pokemon.weight}</Paragraph>
    </button>
  );
};
