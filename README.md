# Pokedex

Simple Pokedex using the [ PokeApi ][pokeapi] and IndexedDB for cacheing locally. Written in Typescript,
with types provided by the [pokeapi-typescript][pokeapi-typescript] library. Uses the [ Evergreen ][evergreen] component
library for much of its UI.

## Getting started

Clone this repo and run

```
# With yarn
yarn && yarn serve

# With npm
npm install && npm run serve
```

## Configuration

Configuration is limited, but what's there is managed through the `.env` file in the root
of the project. You can change the size of the pokedex from the default 75 to something
more suitable for your use case.

## Development

Start a local development server:

```
yarn start # or npm start
```

## Tests

This project uses Jest, [ MSW ][msw], and [Testing Library][testing-library] for its unit and integration tests.

```
# With yarn
yarn test

# With npm
npm test
```

[pokeapi]: https://pokeapi.co
[pokeapi-typescript]: https://www.npmjs.com/package/pokeapi-typescript
[msw]: https://mswjs.io/
[testing-library]: https://testing-library.com
[evergreen]: https://evergreen.segment.com
