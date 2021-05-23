interface AppConfig {
  appId: string;
  pokeapiHostName: string;
  pokedexSize: number;
}

if (process.env.REACT_APP_ID === undefined) {
  throw Error(
    "No application id found. Check env variables before continuing."
  );
}

export const config: AppConfig = {
  appId: process.env.REACT_APP_ID,
  pokeapiHostName: process.env.REACT_APP_POKEAPI_HOST_NAME ?? "",
  pokedexSize: Number(process.env.REACT_APP_POKEDEX_SIZE) ?? 10,
};
