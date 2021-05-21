import React from 'react';
import { observer } from 'mobx-react';
import { useAppStore } from '../hooks/use_app_store';
import { last } from '../utils';
import { LoadingDialog } from './loading_dialog';

export const Bootstrapper: React.FC = observer(({ children }) => {
    const store = useAppStore();

    if (store.loading) {
        return <LoadingDialog text={`Adding ${last(store.pokemon)?.name}`} />;
    }

    if (store.ready) {
        return <>{children}</>;
    }

    return <></>;
});
