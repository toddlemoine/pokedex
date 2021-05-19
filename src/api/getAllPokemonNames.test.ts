import { getAllPokemonNames } from './getAllPokemonNames';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { config } from '../config';
import pokemonNamesJson from '../../mocks/pokemon_names.json';

describe('getAllPokemonNames', () => {
    const setup = (responseFn: () => void) => {
        const host = 'https://' + config.pokeapiHostName;
        const apiBasePath = `${host}/api/v2`;

        const server = setupServer(rest.get(`${apiBasePath}/pokemon`, responseFn));
        server.listen();
        return () => server.close();
    };

    // Unfortunately, order of tests matters here to work around the built-in
    // caching in the PokeApi library. If we fail first, no response is cached.
    // If these were reversed, the mock response for the error would be ignored
    // because a successful response exists in the internal library cache.

    it('throws an error when there is a problem getting names', async () => {
        const teardown = setup((_req, res, ctx) => res.once(ctx.status(500)));

        let caughtError;
        try {
            await getAllPokemonNames();
        } catch (err) {
            caughtError = err;
        } finally {
            expect(caughtError).toBeDefined();
            teardown();
        }
    });

    it('returns an array of short Pokemon objects', async () => {
        const teardown = setup((_req, res, ctx) => res(ctx.json(pokemonNamesJson)));
        const resp = await getAllPokemonNames();
        expect(resp).toEqual(pokemonNamesJson);
        teardown();
    });
});
