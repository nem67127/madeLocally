import styled from "styled-components";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { IoMdAddCircleOutline, IoMdRemoveCircle } from "react-icons/io";

const EventsInfoBox = ({ event }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [joinToggle, setJoinToggle] = useState(false);
  const [interested, setInterested] = useState(false);
  //create current date
  const date = new Date();
  const evDate = new Date(event.startDate);
  const evEndDate = new Date(event.endDate);

  const startDate = format(evDate, "MMMM dd, yyyy");
  const endDate = event.endDate && format(evEndDate, "MMMM dd, yyyy");
  //
  const navigate = useNavigate();
  //go to event detail page
  const handleClickEvent = (ev) => {
    ev.stopPropagation();
    navigate(`/event/${event._id}`);
  };

  const handleClickJoin = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    fetch(`api/vendor-update/${event._id}/${currentUser._id}`, {
      method: "PATCH",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200 && data.message === "removed") {
          setJoinToggle(false);
        } else {
          setJoinToggle(true);
        }
      })
      .catch((err) => console.log(err));
    //patch adds vendor to vendors array in event and add event_id to vending array on user
    //will remove if event id is in vendors or vending
  };

  const handleClickInterest = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    //patch adds event id to user interested events array, will remove if already there
  };
  return (
    <>
      {evDate >= date || (evEndDate && evEndDate >= date) ? (
        <Wrapper>
          <Name onClick={(ev) => handleClickEvent(ev)}>{event.name}</Name>
          <EventDate>
            {startDate}
            <Span>
              {event.startTime}
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
          {/* if current user is an artisan have a button to join event/unjoin, if not add button to say interested/uninterested */}
          {/* if there is no currentUser */}
          {currentUser === null ? (
            <></>
          ) : currentUser && currentUser.artisan ? (
            <Button onClick={(ev) => handleClickJoin(ev)}>
              {!joinToggle ? (
                <IoMdAddCircleOutline style={{ height: "2vw", width: "2vw" }} />
              ) : (
                <IoMdRemoveCircle style={{ height: "2vw", width: "2vw" }} />
              )}
            </Button>
          ) : (
            <Button onClick={(ev) => handleClickInterest(ev)}>
              {!interested ? (
                <BsHeartFill style={{ height: "2vw", width: "2vw" }} />
              ) : (
                <BsHeart style={{ height: "2vw", width: "2vw" }} />
              )}
            </Button>
          )}
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

const Button = styled.button`
  background-color: transparent;
  border: none;
`;
