import React from 'react';
import { PokeGrid } from './poke_grid';
import { render, screen } from '@testing-library/react';

describe('PokeGrid', () => {
    const pokemonFactory = (id, name) => {
        return {
            id,
            name,
            height: '1m',
            weight: '300kg',
            sprites: {
                other: {
                    'official-artwork': {
                        front_default:
                            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png',
                    },
                },
            },
        };
    };
    const mockData = [
        pokemonFactory(1, 'Apple'),
        pokemonFactory(2, 'Banana'),
        pokemonFactory(3, 'Kiwi'),
    ];

    describe('when there are pokemon', () => {
        it('displays pokemon', async () => {
            render(<PokeGrid items={mockData} />);
            const pokemon = await screen.findAllByTestId(/pokedex-entry-card/);
            expect(pokemon.length).toBe(3);
        });
    });

    describe('when there are no pokemon', () => {
        it('displays an empty state message', async () => {
            render(<PokeGrid items={[]} />);
            expect(await screen.findByText('No Pokemon found.')).toBeInTheDocument();
        });
    });
});
