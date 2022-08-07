import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AuthNav from "./signin user/AuthNav";

const Header = () => {
  // where logo, events link, profile link (if artisan), sign in, message icon live
  //sign in only shows up if theres no current user
  // and profile replaces it when there is a current user
  const { isAuthenticated, user, isLoading } = useAuth0();

  //check if signed in user has created a profile before of not
  //create a post fetch that send sthe users sub (specific id) to the backend to check has account if not add email/sub to create new users
  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Wrapper>
      <Link to="/">
        <h1>Made Locally</h1>
      </Link>
      <Link to="/events">Events</Link>
      {/* if a user is signed in it will show the message icon */}
      {isAuthenticated ? <Link to="">MessageIcon</Link> : <div></div>}

      <AuthNav />
      {isAuthenticated && <Link to={`/profile/${user.sub}`}>Profile</Link>}
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
