import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import CreateEvent from "./CreateEvent";
import styled from "styled-components";

const Events = () => {
  const { currentUser } = useContext(CurrentUserContext);

  //list of all the upcoming/ current events

  return (
    <>
      {/* artisans if logged in are able to create a new event */}
      {currentUser.artisan ? <CreateEvent /> : <></>}
      <Wrapper>
        <EventsList>List of events</EventsList>
      </Wrapper>
    </>
  );
};
export default Events;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;
const EventsList = styled.div`
  border: 1px solid blue;
  width: 70%;
  padding: 20px;
`;
