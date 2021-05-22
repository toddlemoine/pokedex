import { Table, StatusIndicator } from "evergreen-ui";
import { IPokemon } from "pokeapi-typescript";
import React from "react";

export const AbilitiesList: React.FC<{ pokemon: IPokemon }> = ({ pokemon }) => {
  return (
    <Table>
      <Table.Head>
        <Table.TextHeaderCell>Name</Table.TextHeaderCell>
        <Table.TextHeaderCell>Hidden?</Table.TextHeaderCell>
        <Table.TextHeaderCell>Slot</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body height={240}>
        {pokemon.abilities.map((a) => (
          <Table.Row key={a.ability.name}>
            <Table.TextCell>{a.ability.name}</Table.TextCell>
            <Table.TextCell>
              <StatusIndicator color={a.is_hidden ? "success" : undefined}>
                {a.is_hidden ? "Yes" : "No"}
              </StatusIndicator>
            </Table.TextCell>
            <Table.TextCell isNumber>{a.slot}</Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
