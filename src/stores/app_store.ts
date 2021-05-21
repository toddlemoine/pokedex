import { setCachedPokemon } from './../api/cachedPokemon';
import { getPokemon, getCachedPokemon } from '../api';
import { toJS, action, makeObservable, observable, computed, runInAction, autorun } from 'mobx';
import { IPokemon } from 'pokeapi-typescript';
import { listAllPokemon } from '../api/listAllPokemon';

enum AppStoreState {
    INITIAL,
    LOADING,
    FULFILLED,
    ERROR,
}

interface Query {
    name?: string;
    species?: string;
    types?: string;
    sort?: string;
}

export class AppStore {
    public state: AppStoreState = AppStoreState.INITIAL;
    public pokemon: IPokemon[] = [];
    public query: Query = {};

    constructor(initialQuery?: Query) {
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
            query: observable,
            queryResults: computed,
        });

        if (initialQuery) {
            this.query = initialQuery;
        }
        this.initializePokemon();
        this.keepLocationBarInSyncWithAppState();
    }

    private keepLocationBarInSyncWithAppState() {
        autorun(() => {
            const params = new URLSearchParams(this.query as Record<string, string>);
            window.history.replaceState(null, '', '?' + params);
        });
    }

    public async initializePokemon() {
        try {
            const cachedPokemon = await getCachedPokemon();
            if (cachedPokemon !== null) {
                runInAction(() => {
                    this.pokemon = cachedPokemon;
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
                    this.state = AppStoreState.FULFILLED;
                    setCachedPokemon(toJS(this.pokemon));
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

    public get queryResults(): IPokemon[] {
        let results = this.pokemon;

        if (this.query.name) {
            const { name } = this.query;
            results = results.filter(p => p.name.includes(name));
        }

        return results;
    }

    public filterByName(name: string) {
        this.query.name = name;
    }
}
