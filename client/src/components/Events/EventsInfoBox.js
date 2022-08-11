import styled from "styled-components";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const EventsInfoBox = ({ event }) => {
  //create current date
  const date = new Date();
  const evDate = new Date(event.startDate);
  const evEndDate = new Date(event.endDate);

  const startDate = format(evDate, "MMMM dd, yyyy");
  const endDate = event.endDate && format(evEndDate, "MMMM dd, yyyy");
  console.log(event);
  const navigate = useNavigate();
  const handleClickEvent = (ev) => {
    ev.stopPropagation();
    navigate(`/event/${event._id}`);
  };
  return (
    <>
      {evDate >= date || evEndDate >= date ? (
        <Wrapper>
          <Name onClick={(ev) => handleClickEvent(ev)}>{event.name}</Name>
          <EventDate>
            {startDate}
            <Span>
              {event.startTime}am
              {event.endTime && <span>-{event.endTime}</span>}
            </Span>
            {event.endDate ? (
              <>
                <span> - {endDate}</span>
                <Span>
                  {event.startTime}
                  {event.endTime && <span>-{event.endTime}</span>}
                </Span>
              </>
            ) : (
              <></>
            )}
          </EventDate>
          <Location>{event.location}</Location>
        </Wrapper>
      ) : (
        <></>
      )}
    </>
  );
};

export default EventsInfoBox;

const Wrapper = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  padding: 20px;
  border-radius: 10px;
  width: 30%;
  margin-bottom: 20px;
  background-color: white;
`;
const Name = styled.h2`
  &:hover {
    opacity: 0.6;
  }
`;
const EventDate = styled.div``;
const Span = styled.span`
  margin-left: 5px;
`;
const Location = styled.p``;
