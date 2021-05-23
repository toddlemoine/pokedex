import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { AppStoreProvider } from "../hooks/use_app_store";
import { AppStore } from "../stores/app_store";
import { renderWithProvider } from "../../mocks/utils";
import { createStorageAdapter } from "../../mocks/storage_adapter";
import { storageKey } from "../storage";
import bulbasaur from "../../mocks/bulbasaur.json";
import venusaur from "../../mocks/venusaur.json";
import ditto from "../../mocks/ditto.json";

describe("App", () => {
  const localStorage = window.localStorage;
  const storageAdapter = createStorageAdapter(storageKey, localStorage);
  const renderWithStore = renderWithProvider(
    AppStoreProvider,
    new AppStore(undefined, storageAdapter)
  );

  const givenCachedPokemonExist = async () => {
    await storageAdapter.setCachedPokemon([bulbasaur, venusaur, ditto]);
  };

  beforeEach(() => localStorage.clear());

  it("has a semantic heading", async () => {
    await givenCachedPokemonExist();
    renderWithStore(<App />, new AppStore(undefined, storageAdapter));
    const heading = screen.getByRole("heading", { level: 1, name: /Pokedex/i });
    expect(heading).toBeInTheDocument();
  });

  it("has a form for filtering", async () => {
    await givenCachedPokemonExist();
    renderWithStore(<App />, new AppStore(undefined, storageAdapter));
    const form = screen.getByRole("form", {
      name: /Filter the Pokedex by name, type, or species/,
    });
    expect(form).toBeInTheDocument();
  });

  it("shows pokemon", async () => {
    await givenCachedPokemonExist();
    renderWithStore(<App />, new AppStore(undefined, storageAdapter));
    const pokemon = await screen.findAllByTestId(/pokedex-entry-card/);
    expect(pokemon.length).toBe(3);
  });

  it("shows the number of pokemon shown", async () => {
    await givenCachedPokemonExist();
    renderWithStore(<App />, new AppStore(undefined, storageAdapter));
    const heading = await screen.findByRole("heading", {
      level: 2,
      name: /3 of 3 Pokemon shown/,
    });
    expect(heading).toBeInTheDocument();
  });

  describe("when filters are applied", () => {
    it("the pokemon shown are filtered", async () => {
      await givenCachedPokemonExist();
      renderWithStore(<App />, new AppStore(undefined, storageAdapter));
      const nameEl = screen.getByLabelText("Character name");
      fireEvent.change(nameEl, { target: { value: "d" } });
      const pokemon = await screen.findAllByTestId(/pokedex-entry-card/);
      expect(pokemon.length).toBe(1);
    });
  });
});
