import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { format } from "date-fns";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { IoMdAddCircleOutline, IoMdRemoveCircle } from "react-icons/io";
import { VscCircleFilled } from "react-icons/vsc";

import Loading from "../Loading";

const EventDetails = () => {
  const { eventId } = useParams();
  const { currentUser } = useContext(CurrentUserContext);
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState("loading");

  // formating dates
  const goodDate = event && event.startDate.replaceAll("-", "/");
  const evDate = new Date(goodDate);
  const goodEndDate = event && event.endDate.replaceAll("-", "/");
  const evEndDate = new Date(goodEndDate);
  const startDate = format(evDate, "MMMM dd, yyyy");
  const endDate = event && event.endDate && format(evEndDate, "MMMM dd, yyyy");

  const [joinToggle, setJoinToggle] = useState(
    currentUser &&
      currentUser.vending &&
      currentUser.vending.some((ev) => {
        if (ev.eventId === eventId) {
          return true;
        }
        return false;
      })
  );
  const [interested, setInterested] = useState(
    currentUser &&
      currentUser.interestEvents &&
      currentUser.interestEvents.some((ev) => {
        if (ev.eventId === eventId) {
          return true;
        }
        return false;
      })
  );

  //get specific event
  useEffect(() => {
    fetch(`/api/event/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data.data);
        setStatus("idle");
      })
      .catch((err) => console.log(err));
  }, [eventId, setEvent, joinToggle]);

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

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Main>
        <Container>
          <Div>
            <Name>{event.name}</Name>
            <EventDate>
              {startDate}
              <Span>
                {event.startTime}
                {event.endTime && <span>-{event.endTime}</span>}
              </Span>

              {endDate ? (
                <>
                  <span> - {event.endDate}</span>
                  <Span>
                    {event.startTime}
                    {event.endTime && <span>-{event.endTime}</span>}
                  </Span>
                </>
              ) : (
                <></>
              )}
              <Div>{event.location}</Div>
            </EventDate>
          </Div>
          <ButtonContainer>
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
          </ButtonContainer>
        </Container>

        <Div>Description:</Div>
        <Div>{event.description}</Div>
        <Div>Vendors on MadeLocally:</Div>
        <Vendors>
          {event.vendor &&
            event.vendor.map((user) => {
              return (
                <User to={`/profile/${user.userId}`} key={user.userId}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <VscCircleFilled /> <span>{user.businessName}</span>
                  </div>
                </User>
              );
            })}
        </Vendors>

        <Vendors>
          {event.vendors && (
            <>
              <Div>Other Vendors:</Div>
              <Div>{event.vendors}</Div>
            </>
          )}
        </Vendors>
      </Main>
    </Wrapper>
  );
  //where when you click on an event it shows more details of what vendors are there
  //if current user is artisan then they can add them selves to the list of vendors (links to thier profile)
  //users can show interest and will go on their interested Events Page (** need to make component)
};

export default EventDetails;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 80px);
  background-color: var(--main-background-color);
`;
const Main = styled.div`
  height: 100%;
  width: 80%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
const Container = styled.div`
  display: flex;
  border-bottom: 1px solid var(--dark-blue);
  width: 100%;
  margin-bottom: 20px;
`;

const Name = styled.h1`
  color: black;
`;
const Div = styled.div``;
const EventDate = styled.div`
  padding-bottom: 10px;
  margin-bottom: 10px;
`;
const Span = styled.span`
  margin-left: 5px;
`;
const Vendors = styled.div`
  display: flex;
  flex-direction: column;
`;

const User = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: var(--dark-blue);
  }
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  margin-top: 10px;
  margin-left: 10%;
`;
const ButtonContainer = styled.div`
  position: absolute;
  left: 85%;
`;
