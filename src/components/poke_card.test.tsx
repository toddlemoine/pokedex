import React from "react";
import { PokeCard } from "./poke_card";
import { render, screen } from "@testing-library/react";

describe("PokeCard", () => {
  const mockPokemon = {
    id: 1,
    name: "Ditto",
    height: "1m",
    weight: "300kg",
    sprites: {
      other: {
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png",
        },
      },
    },
  };

  it("is a semantic button", async () => {
    render(<PokeCard pokemon={mockPokemon} />);
    const el = await screen.findByRole("button");
    expect(el).toBeInTheDocument();
  });

  it("has an image of the pokemon with alt text", () => {
    render(<PokeCard pokemon={mockPokemon} />);
    const el = screen.getByAltText("Ditto artwork");
    expect(el).toBeInTheDocument();
  });
});
