import React from "react";
import styled from "styled-components";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import SignUpButton from "./SignUpButton";

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <LogoutButton />
  ) : (
    <Span>
      <SignUpButton /> | <LoginButton />
    </Span>
  );
};

export default AuthenticationButton;

const Span = styled.span``;
