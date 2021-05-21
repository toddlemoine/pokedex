import { setCachedPokemon } from './../api/cachedPokemon';
import { getPokemon, getCachedPokemon } from '../api';
import { toJS, action, makeObservable, observable, computed, runInAction } from 'mobx';
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

    constructor() {
        makeObservable(this, {
            state: observable,
            loading: computed,
            ready: computed,
            error: computed,
            pokemon: observable,
            fetchAllPokemon: action,
            initializePokemon: action,
            total: computed,
            queryResults: computed,
        });

        this.initializePokemon();
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
        return [];
    }
}
