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
} from "evergreen-ui";
import { useAppStore } from "../hooks/use_app_store";
import { PokeGrid } from "./poke_grid";
import { TypesFilterGroup } from "./types_filter_group";

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

  return (
    <div className={styles.root}>
      <aside className={styles.filterpane}>
        <Heading size={900}>Pokedex</Heading>
        <form onSubmit={cancelSubmit}>
          <TextInputField
            value={store.query.name}
            onChange={handleNameInputChange}
            label="Character name"
          />

          <FormField label="Species">
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
        <PokeGrid items={store.queryResults} />
      </div>
    </div>
  );
});

export default App;
