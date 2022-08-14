import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
const Button = styled.button`
  border: none;
  margin: 0;
  margin-bottom: 5px;
  padding: 0;
  background-color: transparent;
  color: var(--dark-blue);
  &:hover {
    opacity: 0.5;
  }
`;
