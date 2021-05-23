import React, { ChangeEvent, FormEvent } from "react";
import { observer } from "mobx-react";
import styles from "./App.module.css";
import {
  Button,
  Heading,
  FormField,
  SelectMenu,
  SelectMenuItem,
  TextInputField,
  SideSheet,
  Pane,
  Paragraph,
} from "evergreen-ui";
import { useAppStore } from "../hooks/use_app_store";
import { PokeGrid } from "./poke_grid";
import { TypesFilterGroup } from "./types_filter_group";
import { IPokemon } from "pokeapi-typescript";
import { PokemonDetail } from "./pokemon_detail";
import { SortMenu } from "./sort_menu";
import { fieldNames } from "../utils";

const App = observer(() => {
  const store = useAppStore();

  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    store.filterByName(e.target.value);
  };

  const handleTypesChange = (checkedTypes: string[]) => {
    store.filterByType(checkedTypes);
  };

  const handleSpeciesSelect = (item: SelectMenuItem) => {
    const activeSpecies = store.activeSpecies.concat(item.value.toString());
    store.filterBySpecies(activeSpecies);
  };

  const handleSpeciesDeselect = (item: SelectMenuItem) => {
    const selected = item.value;
    const activeSpecies = store.activeSpecies.filter((s) => s !== selected);
    store.filterBySpecies(activeSpecies);
  };

  const options = store.pokemonSpecies.map((species) => ({
    label: species.name,
    value: species.name,
  }));

  const cancelSubmit = (e: FormEvent) => e.preventDefault();

  const speciesButtonText =
    store.activeSpecies.length > 0
      ? store.activeSpecies.join(", ")
      : "Select...";

  const showPokemon = store.activePokemon !== undefined;
  const activePokemon = store.activePokemon;

  const handleGridItemClick = (item: IPokemon) => {
    store.selectPokemon(item);
  };

  const handleSheetClose = () => {
    store.selectPokemon(null);
  };

  const summaryText =
    store.queryResults.length === 0
      ? "No Pokemon found"
      : `${store.queryResults.length} of ${store.pokemon.length} Pokemon shown`;

  return (
    <>
      <div className={styles.root}>
        <aside className={styles.filterpane}>
          <Heading is="h1" size={900} marginBottom={16}>
            Pokedex
          </Heading>
          <form
            id="filter-form"
            aria-label="Filter the Pokedex by name, type, or species"
            onSubmit={cancelSubmit}
          >
            <TextInputField
              value={store.query.name}
              onChange={handleNameInputChange}
              label="Character name"
            />

            <FormField label="Species" marginBottom={16}>
              <SelectMenu
                isMultiSelect={true}
                title="Species"
                options={options}
                selected={store.activeSpecies}
                onSelect={handleSpeciesSelect}
                onDeselect={handleSpeciesDeselect}
              >
                <Button>{speciesButtonText}</Button>
              </SelectMenu>
            </FormField>
            <TypesFilterGroup
              options={store.pokemonTypes}
              onChange={handleTypesChange}
              checked={store.activeTypes}
            />
          </form>
        </aside>
        <div className={styles.contentpane}>
          <Pane display="flex" flexDirection="row" marginBottom={16}>
            <Pane flex={1}>
              <Heading>{summaryText}</Heading>
              <Paragraph>
                Sorted by {fieldNames(store.sortField)},{" "}
                {store.sortedAscending
                  ? "lowest to highest"
                  : "highest to lowest"}
              </Paragraph>
            </Pane>
            <Pane>
              <SortMenu
                activeField={store.sortField}
                activeDirection={store.sortedAscending ? "asc" : "desc"}
                onSelect={(field) => store.sortBy(field)}
              />
            </Pane>
          </Pane>
          <PokeGrid
            items={store.queryResults}
            onItemClick={handleGridItemClick}
          />
        </div>
      </div>
      {activePokemon && (
        <SideSheet isShown={showPokemon} onCloseComplete={handleSheetClose}>
          <PokemonDetail pokemon={activePokemon} />
        </SideSheet>
      )}
    </>
  );
});

export default App;
