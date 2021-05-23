import { Pane, Paragraph } from "evergreen-ui";
import { IPokemon } from "pokeapi-typescript";
import React from "react";
import { PokeCard } from "./poke_card";
import styles from "./poke_grid.module.css";

export const PokeGrid: React.FC<{
  items: IPokemon[];
  onItemClick: (item: IPokemon) => void;
}> = ({ items, onItemClick }) => {
  return (
    <Pane className={styles.root}>
      {items.length === 0 && <Paragraph>No Pokemon found.</Paragraph>}
      {items.map((item) => (
        <PokeCard
          onClick={onItemClick}
          pokemon={item}
          key={item.id}
          data-testid={`pokedex-entry-card-${item.id}`}
        />
      ))}
    </Pane>
  );
};
