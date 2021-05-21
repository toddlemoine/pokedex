import { render } from '@testing-library/react';

export const renderWithProvider = (Provider, store) => {
    return component => {
        const Providers = ({ children }) => {
            return <Provider value={store}>{children}</Provider>;
        };

        return render(component, { wrapper: Providers });
    };
};
