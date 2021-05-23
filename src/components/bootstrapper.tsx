import React from "react";
import { observer } from "mobx-react";
import { useAppStore } from "../hooks/use_app_store";
import { LoadingDialog } from "./loading_dialog";
import { config } from "../config";

export const Bootstrapper: React.FC = observer(({ children }) => {
  const store = useAppStore();

  if (store.loading) {
    return (
      <LoadingDialog
        text={`${store.pokemon.length} of ${config.pokedexSize} loaded.`}
      />
    );
  }

  if (store.ready) {
    return <>{children}</>;
  }

  return <></>;
});
