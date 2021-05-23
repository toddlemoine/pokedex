import { storageKey } from "../storage";
import { AppStore } from "./app_store";
import { when } from "mobx";
import { createStorageAdapter } from "../../mocks/storage_adapter";
import bulbasaur from "../../mocks/bulbasaur.json";
import venusaur from "../../mocks/venusaur.json";
import ditto from "../../mocks/ditto.json";

describe("AppStore", () => {
  const localStorage = window.localStorage;
  const storage = createStorageAdapter(storageKey);

  beforeEach(() => localStorage.clear());
  afterAll(() => localStorage.clear());

  const givenCachedPokemonExist = async () => {
    await storage.setCachedPokemon([bulbasaur, venusaur, ditto]);
  };

  describe("initialization", () => {
    it("accepts an initial set of query params", () => {
      const store = new AppStore(
        new URLSearchParams({ name: "Apples" }),
        storage
      );
      expect(store.query.name).toBe("Apples");
    });

    describe("when cached items exist", () => {
      it("loads pokemon from localstorage cache", async () => {
        await givenCachedPokemonExist();
        const store = new AppStore(undefined, storage);
        expect(store.total).toBe(0);
        await when(() => store.ready);
        expect(store.total).toBe(3);
      });

      it("parses unique types", async () => {
        await givenCachedPokemonExist();
        const store = new AppStore(undefined, storage);
        await when(() => store.ready);
        expect(store.pokemonTypes.length).toBe(3);
      });

      it("parses unique species", async () => {
        await givenCachedPokemonExist();
        const store = new AppStore(undefined, storage);
        await when(() => store.ready);
        expect(store.pokemonSpecies.length).toBe(3);
      });
    });

    describe("when no cached items exist", () => {
      it("loads all pokemon from server", async () => {
        const store = new AppStore(undefined, storage);
        expect(store.total).toBe(0);
        await when(() => store.ready);
        expect(store.total).toBe(3);
      });

      it("saves fetched pokemon to cache", async () => {
        const store = new AppStore(undefined, storage);
        expect(store.total).toBe(0);
        await when(() => store.ready);
        const cached = await storage.getCachedPokemon();
        expect(cached.length).toBe(3);
      });
    });
  });

  describe("when filtering items", () => {
    it("filters by name", async () => {
      await givenCachedPokemonExist();
      const store = new AppStore(undefined, storage);
      await when(() => store.ready);
      store.filterByName("bul");
      expect(store.queryResults.length).toBe(1);
    });

    it("filters by type", async () => {
      await givenCachedPokemonExist();
      const store = new AppStore(undefined, storage);
      await when(() => store.ready);
      store.filterByType("grass");
      expect(store.queryResults.length).toBe(2);
    });

    it("filters by species", async () => {
      await givenCachedPokemonExist();
      const store = new AppStore(undefined, storage);
      await when(() => store.ready);
      store.filterBySpecies("bulbasaur");
      expect(store.queryResults.length).toBe(1);
    });

    it("sorts ascending by default", async () => {
      await givenCachedPokemonExist();
      const store = new AppStore(undefined, storage);
      await when(() => store.ready);
      store.sortBy("name");
      expect(store.queryResults.length).toBe(3);
      const names = store.queryResults.map((r) => r.name).join(", ");
      expect(names).toBe("bulbasaur, ditto, venusaur");
    });

    it("toggles sort order", async () => {
      await givenCachedPokemonExist();
      const store = new AppStore(undefined, storage);
      await when(() => store.ready);
      store.sortBy("name");
      store.sortBy("name");
      const names = store.queryResults.map((r) => r.name).join(", ");
      expect(names).toBe("venusaur, ditto, bulbasaur");
    });
  });
});
