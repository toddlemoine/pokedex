import { Checkbox, FormField } from "evergreen-ui";
import { observer } from "mobx-react";
import React, { ChangeEventHandler } from "react";
import { useAppStore } from "../hooks/use_app_store";
import { PokemonType } from "../types";

interface Props {
  onChange: (selected: string[]) => void;
  options: PokemonType[];
  checked: string[];
}

export const TypesFilterGroup: React.FC<Props> = observer(
  ({ onChange, checked }) => {
    const store = useAppStore();

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      console.log("change", e.target.value, e.target.checked);
      const types = e.target.checked
        ? checked.concat(e.target.value)
        : checked.filter((opt) => opt !== e.target.value);
      onChange(types);
    };

    return (
      <FormField>
        {store.pokemonTypes.map((t) => (
          <Checkbox
            key={t.name}
            name="types"
            label={t.name}
            onChange={handleChange}
            value={t.name}
            checked={checked.includes(t.name)}
          />
        ))}
      </FormField>
    );
  }
);
