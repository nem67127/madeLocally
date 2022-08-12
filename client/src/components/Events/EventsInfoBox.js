import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { IoMdAddCircleOutline, IoMdRemoveCircle } from "react-icons/io";
import moment from "moment";
import { UpdateEventContext } from "../contexts/UpdateEvents";

const EventsInfoBox = ({ event }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [joinToggle, setJoinToggle] = useState(
    currentUser &&
      currentUser.vending &&
      currentUser.vending.some((ev) => {
        if (ev.eventId === event._id) {
          return true;
        }
        return false;
      })
  );
  const [interested, setInterested] = useState(
    currentUser &&
      currentUser.interestEvents &&
      currentUser.interestEvents.some((ev) => {
        if (ev.eventId === event._id) {
          return true;
        }
        return false;
      })
  );
  //create current date
  const dayBefore = moment().subtract(1, "days");
  const { startDate, endDate } = useContext(UpdateEventContext);

  const navigate = useNavigate();
  //go to event detail page
  const handleClickEvent = (ev) => {
    ev.stopPropagation();
    navigate(`/event/${event._id}`);
  };

  const handleClickJoin = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    //patch adds vendor to vendors array in event and add event_id to vending array on user
    //will remove if event id is in vendors or vending
    fetch(`/api/vendor-update/${event._id}/${currentUser._id}`, {
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
  };

  const handleClickInterest = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    //patch adds event id to user interested events array, will remove if already there
    fetch(`/api/user-interest/${event._id}/${currentUser._id}`, {
      method: "PATCH",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200 && data.message === "remove") {
          setInterested(false);
        } else {
          setInterested(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {moment(event.startDate).isSameOrAfter(dayBefore) ||
      (event.endDate && moment(event.endDate).isSameOrAfter(dayBefore)) ? (
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
            <div>
              <Button onClick={(ev) => handleClickJoin(ev)}>
                {!joinToggle ? (
                  <IoMdAddCircleOutline
                    style={{ height: "2vw", width: "2vw", color: "#add6ff" }}
                  />
                ) : (
                  <IoMdRemoveCircle
                    style={{ height: "2vw", width: "2vw", color: "#add6ff" }}
                  />
                )}
              </Button>
              <Button onClick={(ev) => handleClickInterest(ev)}>
                {interested ? (
                  <BsHeartFill
                    style={{ height: "2vw", width: "2vw", color: "#ffc6cb" }}
                  />
                ) : (
                  <BsHeart
                    style={{ height: "2vw", width: "2vw", color: "#ffc6cb" }}
                  />
                )}
              </Button>
            </div>
          ) : (
            <Button onClick={(ev) => handleClickInterest(ev)}>
              {interested ? (
                <BsHeartFill
                  style={{ height: "2vw", width: "2vw", color: "#ffc6cb" }}
                />
              ) : (
                <BsHeart
                  style={{ height: "2vw", width: "2vw", color: "#ffc6cb" }}
                />
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
  margin-top: 10px;
`;
