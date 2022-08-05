import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  // where logo, events link, profile link (if artisan), sign in, message icon live
  //sign in only shows up if theres no current user
  // and profile replaces it when there is a current user
  const { loginWithRedirect, logout, user } = useAuth0();
  //checkif user is signed in will return treu or false
  const userSignedIn = JSON.stringify(user, null, 2);

  //check if signed in user has created a profile before of not

  return (
    <Wrapper>
      <Link to="/">
        <h1>Made Locally</h1>
      </Link>
      <Link to="/events">Events</Link>
      {/* it will show message icon as well if current user exist display - none right now */}
      <Link to="/messages">MessageIcon</Link>
      {userSignedIn ? (
        <>
          {/* make this a dropdown */}
          <SignOut onClick={() => logout()}>SignOut</SignOut>
          {/* make it the profile of the current user  */}
          <Link to="/profile">Profile</Link>
        </>
      ) : (
        <SignIn onClick={() => loginWithRedirect()}>SignIn</SignIn>
      )}
    </Wrapper>
  );
};
export default Header;

const Wrapper = styled.div`
  height: 50px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: black;
`;

const SignIn = styled.button`
  border: none;
  background-color: transparent;
`;
const SignOut = styled.button`
  border: none;
  background-color: transparent;
`;
