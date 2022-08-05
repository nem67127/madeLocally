import styled from "styled-components";

const Header = () => {
  // where logo, events link, profile link (if artisan), sign in, message icon live
  //sign in only shows up if theres no current user
  // and profile replaces it when there is a current user
  return (
    <Wrapper>
      <Name>Made Locally</Name>
      <Events>Events</Events>
      {/* it will show message icon as well if current user exist display - none right now */}
      <Message>MessageIcon</Message>
      <SignIn>SignIn</SignIn>
      {/* if current user exist it will show profile */}
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

const Name = styled.h1``;

const SignIn = styled.div``;

const Events = styled.div``;

const Message = styled.div``;
