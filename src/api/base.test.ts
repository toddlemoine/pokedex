import { getPokemonByName } from './base';
import magbyJson from '../../mocks/pokemon_240_magby.json';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { config } from '../config';

describe('Pokedex api', () => {
    const setup = (responseFn: () => void) => {
        const host = 'https://' + config.pokeapiHostName;
        const apiBasePath = `${host}/api/v2`;

        const server = setupServer(rest.get(`${apiBasePath}/pokemon`, responseFn));
        server.listen();
        return () => server.close();
    };

    describe('getPokemonByName', () => {
        it('throws an error when an invalid name is given', async () => {
            const teardown = setup((_req, res, ctx) => res(ctx.status(404), ctx.text('Not found')));

            let caughtError;
            try {
                await getPokemonByName('boop');
            } catch (error) {
                caughtError = error;
            } finally {
                expect(caughtError).toBeDefined();
                expect(caughtError.message).toBe('Pokemon not found');
                teardown();
            }
        });

        it('returns a pokemon object', async () => {
            const teardown = setup((_req, res, ctx) => res(ctx.json(magbyJson)));
            const result = await getPokemonByName('magby');
            const expected = magbyJson;
            expect(result).toEqual(expected);
            teardown();
        });
    });
});
