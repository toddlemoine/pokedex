import { Paragraph } from "evergreen-ui";
import { IPokemon } from "pokeapi-typescript";
import React from "react";

export const MovesList: React.FC<{ pokemon: IPokemon }> = ({ pokemon }) => {
  const moves = pokemon.moves.map((m) => m.move.name).sort();
  return <Paragraph>{moves.join(", ")}</Paragraph>;
};
