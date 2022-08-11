import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CurrentUserProvider } from "./components/contexts/CurrentUserContext";
import { UpdateEventContextProvider } from "./components/contexts/UpdateEvents";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <UpdateEventContextProvider>
        <App />
      </UpdateEventContextProvider>
    </CurrentUserProvider>
  </React.StrictMode>
);
