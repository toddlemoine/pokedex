import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AppStoreProvider } from "./hooks/use_app_store";
import { AppStore } from "./stores/app_store";
import "./index.css";
import { Bootstrapper } from "./components/bootstrapper";

const store = new AppStore(new URLSearchParams(window.location.search));

ReactDOM.render(
  <React.StrictMode>
    <AppStoreProvider value={store}>
      <Bootstrapper>
        <App />
      </Bootstrapper>
    </AppStoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
