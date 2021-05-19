import { action, makeObservable, observable, computed, runInAction } from 'mobx';
import { INamedApiResource, IPokemon } from 'pokeapi-typescript';
import { getAllPokemonNames } from '../api/getAllPokemonNames';

enum AppStoreState {
    INITIAL,
    LOADING,
    FULFILLED,
    ERROR,
}

export class AppStore {
    public state: AppStoreState = AppStoreState.INITIAL;
    public pokemon: INamedApiResource<IPokemon>[] = [];

    constructor() {
        makeObservable(this, {
            state: observable,
            pending: computed,
            ready: computed,
            error: computed,
            pokemon: observable,
            fetchAllPokemonNames: action,
        });
    }

    public async fetchAllPokemonNames() {
        this.state = AppStoreState.LOADING;
        try {
            const resp = await getAllPokemonNames();
            runInAction(() => {
                this.pokemon = resp.results;
                this.state = AppStoreState.FULFILLED;
            });
        } catch (err) {
            runInAction(() => {
                this.state = AppStoreState.ERROR;
            });
        }
    }

    get pending() {
        return this.state === AppStoreState.LOADING;
    }

    get ready() {
        return this.state === AppStoreState.FULFILLED;
    }

    get error() {
        return this.state === AppStoreState.ERROR;
    }
}
