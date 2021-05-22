import { setCachedPokemon } from "./../api/cachedPokemon";
import { getPokemon, getCachedPokemon } from "../api";
import {
  toJS,
  action,
  makeObservable,
  observable,
  computed,
  runInAction,
  autorun,
} from "mobx";
import { IPokemon } from "pokeapi-typescript";
import { listAllPokemon } from "../api/listAllPokemon";
import { Query, PokemonType, PokemonSpecies } from "../types";
import {
  searchParamsToQuery,
  parseUniqueTypes,
  parseUniqueSpecies,
  parseTypes,
} from "../utils";

enum AppStoreState {
  INITIAL,
  LOADING,
  FULFILLED,
  ERROR,
}

export class AppStore {
  public state: AppStoreState = AppStoreState.INITIAL;
  public pokemon: IPokemon[] = [];
  public pokemonTypes: PokemonType[] = [];
  public pokemonSpecies: PokemonSpecies[] = [];
  public query: Query = { name: "", species: "", types: "", sort: "" };

  constructor(searchParams: URLSearchParams = new URLSearchParams()) {
    this.query = searchParamsToQuery(searchParams);

    makeObservable(this, {
      state: observable,
      loading: computed,
      ready: computed,
      error: computed,
      pokemon: observable,
      fetchAllPokemon: action,
      initializePokemon: action,
      total: computed,
      filterByName: action,
      filterByType: action,
      query: observable,
      queryResults: computed,
      activeTypes: computed,
      activeSpecies: computed,
    });

    this.initializePokemon();
    this.keepLocationBarInSyncWithAppState();
  }

  private keepLocationBarInSyncWithAppState() {
    autorun(() => {
      const params = new URLSearchParams(this.query as Record<string, string>);
      window.history.replaceState(null, "", "?" + params);
    });
  }

  public async initializePokemon() {
    try {
      const cachedPokemon = await getCachedPokemon();
      if (cachedPokemon !== null) {
        runInAction(() => {
          this.pokemon = cachedPokemon;
          this.pokemonTypes = parseUniqueTypes(cachedPokemon);
          this.pokemonSpecies = parseUniqueSpecies(cachedPokemon);
          this.state = AppStoreState.FULFILLED;
        });
      } else {
        this.fetchAllPokemon();
      }
    } catch (_err) {
      this.fetchAllPokemon();
    }
  }

  public async fetchAllPokemon() {
    this.state = AppStoreState.LOADING;

    try {
      const { results } = await listAllPokemon();
      let counter = results.length;
      while (counter--) {
        const resource = results[counter];
        const pokemon = await getPokemon(resource);
        runInAction(() => {
          this.pokemon = this.pokemon.concat(pokemon);
        });
      }
    } catch (err) {
      runInAction(() => {
        this.state = AppStoreState.ERROR;
      });
    } finally {
      if (!this.error) {
        runInAction(() => {
          this.pokemonTypes = parseUniqueTypes(this.pokemon);
          this.pokemonSpecies = parseUniqueSpecies(this.pokemon);
          setCachedPokemon(toJS(this.pokemon));
          this.state = AppStoreState.FULFILLED;
        });
      }
    }
  }

  get loading() {
    return this.state === AppStoreState.LOADING;
  }

  get ready() {
    return this.state === AppStoreState.FULFILLED;
  }

  get error() {
    return this.state === AppStoreState.ERROR;
  }

  get total() {
    return this.pokemon.length;
  }

  get activeTypes() {
    return this.query.types?.split(",") ?? [];
  }

  get activeSpecies() {
    return this.query.species?.split(",") ?? [];
  }

  public get queryResults(): IPokemon[] {
    if (this.loading) return [];

    let results = this.pokemon;

    if (this.query.name) {
      const { name } = this.query;
      results = results.filter((p) => p.name.includes(name));
    }

    if (this.query.types) {
      const activeTypes = this.activeTypes;
      results = results.filter((pokemon) => {
        const pTypes = parseTypes(pokemon);
        return pTypes.some((t) => activeTypes.includes(t));
      });
    }

    if (this.query.species) {
      const activeSpecies = this.activeSpecies;
      results = results.filter((pokemon) => {
        return activeSpecies.includes(pokemon.species.name);
      });
    }

    return results;
  }

  public filterByName(name: string) {
    this.query.name = name;
  }

  public filterByType(types: string[]) {
    this.query.types = types.toString();
  }

  public filterBySpecies(species: string[]) {
    this.query.species = species.toString();
  }
}
