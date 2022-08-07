import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      onClick={() =>
        loginWithRedirect({
          screen_hint: "signup",
          //i want to return to the sign-in page
          returnTo: "/sign-in",
        })
      }
    >
      Sign Up
    </Button>
  );
};

export default SignupButton;

const Button = styled.button`
  border: none;
  background-color: transparent;
`;
