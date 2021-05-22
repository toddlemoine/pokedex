import { storageKey } from "./../api";
import { AppStore } from "./app_store";
import { when } from "mobx";

describe("AppStore", () => {
  const localStorage = window.localStorage;
  const mockType = (name) => ({ type: { name } });
  const mockSpecies = (name) => ({ name });
  const mockData = JSON.stringify([
    {
      id: 1,
      name: "Apple",
      types: [mockType("red")],
      species: mockSpecies("fruit"),
    },
    {
      id: 2,
      name: "Banana",
      types: [mockType("blue")],
      species: mockSpecies("fruit"),
    },
    {
      id: 3,
      name: "Kiwi",
      types: [mockType("red")],
      species: mockSpecies("fuzzyfruit"),
    },
  ]);

  beforeAll(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  const givenCachedPokemonExist = () => {
    localStorage.setItem(storageKey, mockData);
    return () => localStorage.clear();
  };

  describe("initialization", () => {
    it("accepts an initial set of query params", () => {
      const store = new AppStore(new URLSearchParams({ name: "Apples" }));
      expect(store.query.name).toBe("Apples");
    });

    describe("when cached items exist", () => {
      it("loads pokemon from localstorage cache", async () => {
        const teardown = givenCachedPokemonExist();
        const store = new AppStore();
        expect(store.total).toBe(0);
        await when(() => store.ready);
        expect(store.total).toBe(3);
        teardown();
      });

      it("parses unique types", async () => {
        const teardown = givenCachedPokemonExist();
        const store = new AppStore();
        await when(() => store.ready);
        expect(store.pokemonTypes.length).toBe(2);
        teardown();
      });

      it("parses unique species", async () => {
        const teardown = givenCachedPokemonExist();
        const store = new AppStore();
        await when(() => store.ready);
        expect(store.pokemonSpecies.length).toBe(2);
        teardown();
      });
    });

    describe("when no cached items exist", () => {
      it("loads all pokemon from server", async () => {
        const store = new AppStore();
        expect(store.total).toBe(0);
        await when(() => store.ready);
        expect(store.total).toBe(3);
      });
      // it("saves fetched pokemon to cache", async () => {
      //   const store = new AppStore();
      //   expect(store.total).toBe(0);
      //   await when(() => store.ready);
      //   const cached = JSON.parse(localStorage.getItem(storageKey) ?? "");
      //   expect(cached.length).toBe(3);
      // });
    });
  });
});
