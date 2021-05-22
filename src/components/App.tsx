import React, { ChangeEvent } from "react";
import { observer } from "mobx-react";
import styles from "./App.module.css";
import { Heading, TextInputField } from "evergreen-ui";
import { useAppStore } from "../hooks/use_app_store";
import { PokeGrid } from "./poke_grid";
import { TypesFilterGroup } from "./types_filter_group";

const App = observer(() => {
  const store = useAppStore();

  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    store.filterByName(e.target.value);
  };

  const handleTypesChange = (checkedTypes: string[]) => {
    console.log("checked", checkedTypes);
    store.filterByType(checkedTypes);
  };

  return (
    <div className={styles.root}>
      <aside className={styles.filterpane}>
        <Heading size={900}>Pokedex</Heading>
        <form>
          <TextInputField
            onChange={handleNameInputChange}
            label="Character name"
          />
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
