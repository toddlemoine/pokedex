import { storageKey } from './../api';
import { AppStore } from './app_store';
import { when } from 'mobx';

describe('AppStore', () => {
    const localStorage = window.localStorage;
    const mockData = JSON.stringify([
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Banana' },
        { id: 3, name: 'Kiwi' },
    ]);

    const givenCachedPokemonExist = () => {
        localStorage.setItem(storageKey, mockData);
        return () => localStorage.clear();
    };

    describe('initialization', () => {
        it('loads pokemon from localstorage cache', async () => {
            const teardown = givenCachedPokemonExist();
            const store = new AppStore();
            expect(store.total).toBe(0);
            await when(() => store.ready);
            expect(store.total).toBe(3);
            teardown();
        });

        describe('when no cached items exist', () => {
            it('loads all pokemon from server', async () => {
                const store = new AppStore();
                expect(store.total).toBe(0);
                await when(() => store.ready);
                expect(store.total).toBe(3);
            });

            it('saves fetched pokemon to cache', async () => {
                const store = new AppStore();
                expect(store.total).toBe(0);
                await when(() => store.ready);
                const cached = JSON.parse(localStorage.getItem(storageKey) ?? '');
                expect(cached.length).toBe(3);
            });
        });
    });
});
