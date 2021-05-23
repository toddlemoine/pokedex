import React, { PropsWithChildren } from "react";
import { IPokemon } from "pokeapi-typescript";
import { Strong, Pane, Badge } from "evergreen-ui";
import { PokePic } from "./poke_pic";
import { statsToMap, titleCase } from "../utils";
import styles from "./poke_card.module.css";

export const PokeCard: React.FC<PropsWithChildren<{
  pokemon: IPokemon;
  onClick: (item: IPokemon) => void;
}>> = ({ pokemon, onClick, ...props }) => {
  const handleClick = () => onClick(pokemon);

  const stats = statsToMap(pokemon);

  return (
    <button className={styles.root} {...props} onClick={handleClick}>
      <Pane padding={8}>
        <PokePic pokemon={pokemon} />
        <Strong>{titleCase(pokemon.name)}</Strong>
        <Pane display="flex" flexDirection="row" justifyContent="center">
          <Pane marginRight={8}>
            <Badge color="purple">EXP</Badge> {pokemon.base_experience}
          </Pane>
          <Pane>
            <Badge color="red">HP</Badge> {stats.hp.base}
          </Pane>
        </Pane>
      </Pane>
    </button>
  );
};
