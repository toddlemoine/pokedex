import React from 'react';
import { observer } from 'mobx-react';
import styles from './App.module.css';
import { Heading, Button } from 'evergreen-ui';
import { useAppStore } from '../hooks/use_app_store';

const App = observer(() => {
    const store = useAppStore();
    const handleClick = () => console.log('clicked');

    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <Heading size={900}>Pokedex</Heading>
            </header>
            <p>App is ready? {store.ready.toString()}</p>
            <Button onClick={handleClick}>Click me</Button>
        </div>
    );
});

export default App;
