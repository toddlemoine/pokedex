import { useContext } from 'react';
import { createContext } from 'react';
import { AppStore } from '../stores/app_store';

export const AppStoreContext = createContext<AppStore | undefined>(undefined);

export const useInitializeAppStore = () => {
    return new AppStore();
};

export const useAppStore = () => {
    const context = useContext(AppStoreContext);
    if (!context) {
        throw Error('Unable to initialize app store without AppStoreProvider');
    }
    return context;
};

export const AppStoreProvider = AppStoreContext.Provider;
