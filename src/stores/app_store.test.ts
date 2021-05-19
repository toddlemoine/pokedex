import { AppStore } from './app_store';
import { when } from 'mobx';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { config } from '../config';
import pokemonNamesJson from '../../mocks/pokemon_names.json';

describe('AppStore', () => {
    const setup = (responseFn: () => void) => {
        const host = 'https://' + config.pokeapiHostName;
        const apiBasePath = `${host}/api/v2`;
        const server = setupServer(rest.get(`${apiBasePath}/pokemon`, responseFn));
        server.listen();
        return () => server.close();
    };

    describe('by default', () => {
        it('starts in an initial state', () => {
            const store = new AppStore();
            expect(store.pending).toBe(false);
            expect(store.ready).toBe(false);
        });

        it('starts with an empty set of pokemon', () => {
            const store = new AppStore();
            expect(store.pokemon.length).toBe(0);
        });
    });

    // Again, because of the built-in caching, we have to test the error state
    // before the success state.
    describe('when there is an error trying to get ready', () => {
        it('reports an error state', async () => {
            const teardown = setup((_req, res, ctx) => res(ctx.status(500)));
            const store = new AppStore();
            store.fetchAllPokemonNames();
            await when(() => store.error);
            expect(store.error).toBe(true);
        });
    });

    describe('determines ready state', () => {
        it('fetches all pokemon names and urls', async () => {
            const teardown = setup((_req, res, ctx) => res(ctx.json(pokemonNamesJson)));
            const store = new AppStore();
            store.fetchAllPokemonNames();
            await when(() => store.ready);
            expect(store.pokemon.length).toBe(3);
            expect(store.pokemon[0].name).toBe('bulbasaur');
            expect(store.pokemon[0].url).toBeDefined();
            teardown();
        });
    });
});
