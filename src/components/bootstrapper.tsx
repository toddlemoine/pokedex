import { observer } from 'mobx-react';
import React from 'react';
import { useAppStore } from '../hooks/use_app_store';
import { last } from '../utils';

export const Bootstrapper: React.FC = observer(({ children }) => {
    const store = useAppStore();

    if (store.loading) {
        return <div>Loading Pokemon ({last(store.pokemon)?.name})</div>;
    }

    return store.ready ? <>{children}</> : <></>;
});
