import { Heading, Paragraph } from 'evergreen-ui';
import { IPokemon } from 'pokeapi-typescript';
import React, { PropsWithChildren } from 'react';
import { getBestArtworkUrl } from '../utils';
import styles from './poke_card.module.css';

export const PokeCard: React.FC<PropsWithChildren<{ pokemon: IPokemon }>> = ({
    pokemon,
    ...props
}) => {
    return (
        <button className={styles.root} {...props}>
            <img className={styles.image} src={getBestArtworkUrl(pokemon)} alt={pokemon.name} />
            <Heading>{pokemon.name}</Heading>
            <Paragraph>Height: {pokemon.height}</Paragraph>
            <Paragraph>Weight: {pokemon.weight}</Paragraph>
        </button>
    );
};
