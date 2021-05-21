import { Pane, Paragraph } from 'evergreen-ui';
import { IPokemon } from 'pokeapi-typescript';
import React from 'react';
import { PokeCard } from './poke_card';

export const PokeGrid: React.FC<{ items: IPokemon[] }> = ({ items }) => {
    return (
        <Pane>
            {items.length === 0 && <Paragraph>No Pokemon found.</Paragraph>}
            {items.map(item => (
                <PokeCard
                    pokemon={item}
                    key={item.id}
                    data-testid={`pokedex-entry-card-${item.id}`}
                />
            ))}
        </Pane>
    );
};
