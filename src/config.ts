interface AppConfig {
  pokeapiHostName: string;
}

export const config: AppConfig = {
  pokeapiHostName: process.env.REACT_APP_POKEAPI_HOST_NAME ?? "",
};
