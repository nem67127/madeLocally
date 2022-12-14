import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { useContext } from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import Loading from "./Loading";
import Dropdown from "./Dropdown";

const Header = () => {
  const { isLoading } = useAuth0();
  //maybe fetch user after login to check if they are a user or artisan to either disable link to profile or not
  const { currentUser } = useContext(CurrentUserContext);
  //check if signed in user has created a profile before of not
  //create a post fetch that send sthe users sub (specific id) to the backend to check has account if not add email/sub to create new users
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Link to="/">
        <Logo>Made Locally</Logo>
      </Link>
      <Link to={`/events`}>Events</Link>
      {/* if a user is signed in it will show the message icon */}
      {/* {currentUser ? <Link to="">MessageIcon</Link> : null} */}
      <Dropdown currentUser={currentUser} />
    </Wrapper>
  );
};
export default Header;

const Wrapper = styled.div`
  height: 80px;
  border-bottom: 5px solid var(--water-blue);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  font-size: 20px;
`;
const Logo = styled.h1`
  font-family: var(--font-dm-serif);
  color: black;
  &:hover {
    color: var(--dark-blue);
  }
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-family: var(--font--thasa);
  color: var(--dark-blue);
  &:hover {
    opacity: 0.5;
  }
`;
