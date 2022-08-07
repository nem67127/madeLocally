import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

//used instead of Route in app.js if you want it to show only when someone is logged in

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <div>Loading</div>,
    })}
    {...args}
  />
);

export default ProtectedRoute;
