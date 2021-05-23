import { getCachedPokemon, setCachedPokemon } from "../storage";
import { getPokemon } from "../api";
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
import { SortDirection, Query, PokemonType, PokemonSpecies } from "../types";
import {
  searchParamsToQuery,
  parseUniqueTypes,
  parseUniqueSpecies,
  parseTypes,
  fieldAccessors,
  flipDirection,
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
  public activePokemon: IPokemon | null = null;

  constructor(searchParams?: URLSearchParams) {
    if (searchParams) {
      this.query = searchParamsToQuery(searchParams);
    }

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
      activePokemon: observable,
      selectPokemon: action,
      sortBy: action,
      sortField: computed,
      sortedAscending: computed,
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

      const chunks = [];
      while (results.length) {
        chunks.push(results.splice(0, 5));
      }

      let counter = chunks.length;

      while (counter--) {
        const resources = chunks[counter];
        const pokemon = await Promise.allSettled(
          resources.map((res) => getPokemon(res))
        );

        runInAction(() => {
          const fulfilled = pokemon.reduce((acc, result) => {
            if (result.status === "fulfilled") {
              acc.push(result.value);
            }
            return acc;
          }, [] as IPokemon[]);

          this.pokemon = this.pokemon.concat(fulfilled);
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
    const hasTypes = this.query.types?.length > 0;
    return hasTypes ? this.query.types.split(",") : [];
  }

  get activeSpecies() {
    const hasSpecies = this.query.species?.length > 0;
    return hasSpecies ? this.query.species.split(",") : [];
  }

  public get queryResults(): IPokemon[] {
    if (this.loading) return [];

    let results = this.pokemon;

    if (this.query.name) {
      const { name } = this.query;
      const re = new RegExp(name, "gi");
      results = results.filter((p) => p.name.match(re));
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

    return this.sortResults(results);
  }

  public get sortField(): string {
    const [field = "order", _dir] = this.query.sort.split(".");
    return field;
  }

  public get sortedAscending(): boolean {
    const [_field, dir] = this.query.sort.split(".");
    return dir === "asc";
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

  public selectPokemon(pokemon: IPokemon | null) {
    this.activePokemon = pokemon;
  }

  public sortBy(field: string) {
    const [currentField, currentDirection] = this.query.sort.split(".");
    const dir: SortDirection =
      field === currentField
        ? flipDirection(currentDirection as SortDirection)
        : "asc";
    this.query.sort = [field, dir].join(".");
  }

  private sortResults(results: IPokemon[]): IPokemon[] {
    const sortParams = this.query.sort ?? "order.asc";
    const [field, direction] = sortParams.split(".");
    const fieldAccessor = fieldAccessors[field] ?? fieldAccessors.name;
    const sorted = results.slice().sort((a: IPokemon, b: IPokemon) => {
      const aVal = fieldAccessor(a);
      const bVal = fieldAccessor(b);
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
      return 0;
    });
    return direction === "desc" ? sorted.reverse() : sorted;
  }
}
