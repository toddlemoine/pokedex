import React from "react";
import {
  Strong,
  Text,
  Button,
  Menu,
  Popover,
  SortIcon,
  Position,
  SortAscIcon,
  SortDescIcon,
} from "evergreen-ui";
import { SortDirection } from "../types";
import { fieldNames } from "../utils";

export const SortMenu: React.FC<{
  onSelect: (field: string) => void;
  activeField: string;
  activeDirection: SortDirection;
}> = ({ onSelect, activeField, activeDirection }) => {
  const createHandler = (field: string) => {
    return () => onSelect(field);
  };

  const fields = "order name type species hp exp ability_count height weight".split(
    " "
  );

  const ActiveSortIcon = activeDirection === "asc" ? SortAscIcon : SortDescIcon;

  return (
    <Popover
      position={Position.BOTTOM_LEFT}
      content={
        <Menu>
          <Menu.Group>
            {fields.map((field) => (
              <Menu.Item
                key={field}
                secondaryText={
                  activeField === field ? <ActiveSortIcon /> : undefined
                }
                onSelect={createHandler(field)}
              >
                {activeField === field ? (
                  <Strong>{fieldNames(field)}</Strong>
                ) : (
                  <Text>{fieldNames(field)}</Text>
                )}
              </Menu.Item>
            ))}
          </Menu.Group>
        </Menu>
      }
    >
      <Button marginRight={16}>
        <SortIcon />
      </Button>
    </Popover>
  );
};
