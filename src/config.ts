interface AppConfig {
    pokeapiHostName: string;
    pokedexSize: number;
}

export const config: AppConfig = {
    pokeapiHostName: process.env.REACT_APP_POKEAPI_HOST_NAME ?? '',
    pokedexSize: 4,
};
