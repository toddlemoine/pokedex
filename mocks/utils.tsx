import { render } from "@testing-library/react";

export const renderWithProvider = (Provider, store) => {
  return (component, perRenderStore?) => {
    const Providers = ({ children }) => {
      return <Provider value={perRenderStore ?? store}>{children}</Provider>;
    };

    return render(component, { wrapper: Providers });
  };
};
