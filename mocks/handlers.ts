import { rest } from 'msw';

export const handlers = [
    rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
        return res(
            ctx.json({
                results: [
                    { name: 'A', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                    { name: 'B', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
                    { name: 'C', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
                ],
            }),
        );
    }),
    rest.get('https://pokeapi.co/api/v2/pokemon/:id/', (req, res, ctx) => {
        return res(ctx.json({ id: parseInt(req.params.id, 10), name: 'some name' }));
    }),
];
