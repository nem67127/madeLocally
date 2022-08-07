import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
//can I create two different redirects based off if they have an account or not ?
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
