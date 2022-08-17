import styled from "styled-components";
import { CgMenu } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import AuthNav from "./signin user/AuthNav";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const Dropdown = ({ currentUser }) => {
  const { user } = useAuth0();
  const [toggle, setToggle] = useState(false);

  return (
    <Wrapper>
      <Button
        onClick={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          setToggle(!toggle);
        }}
      >
        <CgMenu />
      </Button>
      {toggle ? (
        <Div>
          {(currentUser && currentUser.artisan) || (user && user.artisan) ? (
            <>
              <Link to={`/profile/${currentUser._id}`}>Profile</Link>
              <Link to={`/profile-f/${currentUser._id}`}>Update Profile</Link>
              <Link to="/fav-artisans">Fav Artisans</Link>
              <Link to="/intereted-events">Interested Events</Link>
            </>
          ) : null}
          <AuthNav />
        </Div>
      ) : null}
    </Wrapper>
  );
};
export default Dropdown;

const Wrapper = styled.div`
  position: relative;
`;
const Button = styled.button`
  border: none;
  background-color: transparent;
  color: var(--dark-blue);
  &:hover {
    opacity: 0.5;
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
  margin-bottom: 5px;
`;

const Div = styled.div`
  color: var(--dark-blue);
  position: absolute;
  right: -100%;
  top: calc(100% + 10px);
  background-color: white;
  padding: 10px 20px;

  border-radius: 10px;
  width: 9vw;
  z-index: 10;
  box-shadow: 0 2px 10px -5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;
