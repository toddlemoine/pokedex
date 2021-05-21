import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import { AppStoreProvider } from '../hooks/use_app_store';
import { AppStore } from '../stores/app_store';
import { renderWithProvider } from '../../mocks/utils';

describe('App', () => {
    const renderWithStore = renderWithProvider(AppStoreProvider, new AppStore());

    it('has a semantic heading', () => {
        renderWithStore(<App />);
        const heading = screen.getByRole('heading', { text: /Pokedex/i });
        expect(heading).toBeInTheDocument();
    });
});
