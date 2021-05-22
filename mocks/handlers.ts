import { rest } from "msw";

export const handlers = [
  rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          {
            name: "A",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
            species: { name: "SpeciesA" },
            types: [{ type: { name: "TypeA" } }],
          },
          {
            name: "B",
            url: "https://pokeapi.co/api/v2/pokemon/2/",
            species: { name: "SpeciesB" },
            types: [{ type: { name: "TypeB" } }],
          },
          {
            name: "C",
            url: "https://pokeapi.co/api/v2/pokemon/3/",
            species: { name: "SpeciesC" },
            types: [{ type: { name: "TypeC" } }],
          },
        ],
      })
    );
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon/:id/", (req, res, ctx) => {
    return res(
      ctx.json({ id: parseInt(req.params.id, 10), name: "some name" })
    );
  }),
];
