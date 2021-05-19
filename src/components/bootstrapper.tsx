import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useAppStore } from '../hooks/use_app_store';

export const Bootstrapper: React.FC = observer(({ children }) => {
    const store = useAppStore();

    useEffect(() => {
        if (!store.ready && !store.pending) {
            store.fetchAllPokemonNames();
        }
    }, [store]);

    return store.ready ? <>{children}</> : <></>;
});
