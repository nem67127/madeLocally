import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;
const Button = styled.button`
  border: none;
  margin: 0;
  margin-bottom: 5px;
  padding: 0;
  padding-top: 10px;
  background-color: transparent;
  color: var(--dark-blue);
  &:hover {
    opacity: 0.5;
  }
`;
