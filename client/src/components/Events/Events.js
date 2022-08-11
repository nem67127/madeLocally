import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import CreateEvent from "./CreateEvent";
import styled from "styled-components";
import EventsInfoBox from "./EventsInfoBox";
import { UpdateEventContext } from "../contexts/UpdateEvents";

const Events = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { eventUpdate } = useContext(UpdateEventContext);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  //list of all the upcoming/ current events
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.data);
      })
      .catch((err) => setError(err.message));
  }, [eventUpdate]);

  if (error !== null) {
    return <div>error</div>;
  }
  if (events === null) {
    return <div> loading</div>;
  }

  return (
    <Container>
      {/* artisans if logged in are able to create a new event */}
      {currentUser && currentUser.artisan ? <CreateEvent /> : <></>}
      <Wrapper>
        <EventsList>
          {events && events.length > 0 ? (
            events.map((event) => {
              return <EventsInfoBox event={event} key={event._id} />;
            })
          ) : (
            <></>
          )}
        </EventsList>
      </Wrapper>
    </Container>
  );
};
export default Events;
const Container = styled.div`
  background-color: var(--main-background-color);
`;
const Wrapper = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const EventsList = styled.div`
  width: 70%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 20px;
`;
