import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import styles from './App.module.css';
import { Heading, TextInputField } from 'evergreen-ui';
import { useAppStore } from '../hooks/use_app_store';
import { PokeGrid } from './poke_grid';

const App = observer(() => {
    const store = useAppStore();

    const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        store.filterByName(e.target.value);
    };

    return (
        <div className={styles.root}>
            <aside className={styles.filterpane}>
                <Heading size={900}>Pokedex</Heading>
                <form>
                    <TextInputField onChange={handleNameInputChange} label="Character name" />
                </form>
            </aside>
            <div className={styles.contentpane}>
                <PokeGrid items={store.queryResults} />
            </div>
        </div>
    );
});

export default App;
