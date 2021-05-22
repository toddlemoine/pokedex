import React from "react";
import { Button, Menu, Popover, SortIcon, Position } from "evergreen-ui";

export const SortMenu: React.FC<{ onSelect: (field: string) => void }> = ({
  onSelect,
}) => {
  const createHandler = (field: string) => {
    return () => onSelect(field);
  };

  return (
    <Popover
      position={Position.BOTTOM_LEFT}
      content={
        <Menu>
          <Menu.Group>
            <Menu.Item onSelect={createHandler("name")}>Name</Menu.Item>
            <Menu.Item onSelect={createHandler("type")}>Type</Menu.Item>
            <Menu.Item onSelect={createHandler("species")}>Species</Menu.Item>
            <Menu.Item onSelect={createHandler("hp")}>HP</Menu.Item>
            <Menu.Item onSelect={createHandler("exp")}>
              Base Experience
            </Menu.Item>
            <Menu.Item onSelect={createHandler("ability_count")}>
              Ability Count
            </Menu.Item>
            <Menu.Item onSelect={createHandler("height")}>Height</Menu.Item>
            <Menu.Item onSelect={createHandler("weight")}>Weight</Menu.Item>
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
