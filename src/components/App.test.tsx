import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AppStoreProvider } from '../hooks/use_app_store';
import { AppStore } from '../stores/app_store';

describe('App', () => {
    const renderWithStore = (component, store = new AppStore()) => {
        const Providers = ({ children }) => {
            return <AppStoreProvider value={store}>{children}</AppStoreProvider>;
        };

        return render(component, { wrapper: Providers });
    };

    it('has a semantic heading', () => {
        renderWithStore(<App />);
        const heading = screen.getByRole('heading', { text: /Pokedex/i });
        expect(heading).toBeInTheDocument();
    });
});
