import { Badge, Tablist, Tab, Card, Pane, Heading } from "evergreen-ui";
import { IPokemon } from "pokeapi-typescript";
import React, { useState } from "react";
import { statsToMap } from "../utils";
import { AbilitiesList } from "./abilities_list";
import { MovesList } from "./moves_list";
import { PokePic } from "./poke_pic";
import styles from "./pokemon_detail.module.css";

const CoreAttribute: React.FC<{ name: string; value: string | number }> = ({
  name,
  value,
}) => {
  return (
    <span className={styles.coreAttribute}>
      <Badge color="neutral">{name}</Badge>
      <span className={styles.coreAttributeValue}>{value}</span>
    </span>
  );
};

export const PokemonDetail: React.FC<{ pokemon: IPokemon }> = ({ pokemon }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const p = pokemon;
  const stats = statsToMap(p);
  return (
    <article>
      <Pane>
        <Pane padding={16} borderBottom="muted">
          <Heading size={800}>{p.name}</Heading>
          <Pane flexDirection="row">
            <CoreAttribute name="Height" value={p.height} />
            <CoreAttribute name="Weight" value={p.weight} />
            <CoreAttribute name="Exp" value={p.base_experience} />
            <CoreAttribute name="HP" value={stats.hp.base} />
          </Pane>
        </Pane>
        <Pane display="flex" padding={8}>
          <Tablist>
            {["Traits", "Moves"].map((tab, index) => (
              <Tab
                key={tab}
                isSelected={selectedIndex === index}
                onSelect={() => setSelectedIndex(index)}
                aria-controls={`panel-${tab.toLowerCase()}`}
              >
                {tab}
              </Tab>
            ))}
          </Tablist>
        </Pane>
        <Pane
          id="panel-traits"
          role="tabpanel"
          aria-labelledby={"Traits"}
          aria-hidden={selectedIndex !== 0}
          display={selectedIndex === 0 ? "block" : "none"}
          flex="1"
          overflowY="scroll"
          background="tint1"
          padding={16}
        >
          <Card
            backgroundColor="white"
            elevation={0}
            height={240}
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginBottom={16}
          >
            <PokePic pokemon={p} />
          </Card>
          <Pane flex={1}>
            <Heading is="h3" marginBottom={8}>
              Abilities
            </Heading>
            <AbilitiesList pokemon={pokemon} />
          </Pane>
        </Pane>
        <Pane
          id="panel-moves"
          role="tabpanel"
          aria-labelledby={"Moves"}
          aria-hidden={selectedIndex !== 1}
          display={selectedIndex === 1 ? "block" : "none"}
          padding={16}
        >
          <MovesList pokemon={p} />
        </Pane>
      </Pane>
    </article>
  );
};
