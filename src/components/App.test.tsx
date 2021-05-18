import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const heading = screen.getByRole("heading", { text: /Pokedex/i });
  expect(heading).toBeInTheDocument();
});
