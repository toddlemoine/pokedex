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

## Clearing local cache

To reset your browser, or to simply remove this app's data once you're finished, open your
browser's dev inspector and manually clear the site data from there.

- In Chrome, go to the Application tab and click `Clear site data`
- In Firefox, go to the Storage tab, expand the IndexedDB menu, and remove the `pokedex` database.
- In Safari, go to the Storage tab, expanded the Indexed Databases menu, and remove the `pokedex` database.

## Development

Start a local development server:

```
yarn start # or npm start
```

## Known issues

- Firefox takes a couple of seconds after the initial set of Pokemon are cached. Safari and Chrome seem unaffected.

## Tests

This project uses Jest, [MSW][msw], and [Testing Library][testing-library] for its unit and integration tests.

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
