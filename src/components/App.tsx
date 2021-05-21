import React from 'react';
import { observer } from 'mobx-react';
import styles from './App.module.css';
import { Heading } from 'evergreen-ui';
import { useAppStore } from '../hooks/use_app_store';
import { PokeGrid } from './poke_grid';

const App = observer(() => {
    const store = useAppStore();

    return (
        <div className={styles.root}>
            <aside className={styles.filterpane}>
                <Heading size={900}>Pokedex</Heading>
                Sidebar
            </aside>
            <div className={styles.contentpane}>
                <PokeGrid items={store.pokemon} />
            </div>
        </div>
    );
});

export default App;
