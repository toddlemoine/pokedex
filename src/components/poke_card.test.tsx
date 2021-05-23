import React from "react";
import { PokeCard } from "./poke_card";
import { render, screen } from "@testing-library/react";
import magbyJson from "../../mocks/pokemon_240_magby.json";

describe("PokeCard", () => {
  const mockPokemon = magbyJson;

  it("is a semantic button", async () => {
    render(<PokeCard pokemon={mockPokemon} />);
    const el = await screen.findByRole("button");
    expect(el).toBeInTheDocument();
  });

  it("has an image of the pokemon with alt text", () => {
    render(<PokeCard pokemon={mockPokemon} />);
    const el = screen.getByAltText("magby artwork");
    expect(el).toBeInTheDocument();
  });
});
