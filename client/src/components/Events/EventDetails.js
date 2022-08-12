import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";
const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState("loading");
  const [vendors, setVendors] = useState([]);

  //formating dates
  const goodDate = event && event.startDate.replaceAll("-", "/");
  const evDate = new Date(goodDate);
  const goodEndDate = event && event.endDate.replaceAll("-", "/");
  const evEndDate = new Date(goodEndDate);
  const startDate = format(evDate, "MMMM dd, yyyy");
  const endDate = event && event.endDate && format(evEndDate, "MMMM dd, yyyy");
  //get specific event
  useEffect(() => {
    fetch(`/api/event/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data.data);
        setStatus("idle");
      })
      .catch((err) => console.log(err));
  }, [eventId]);

  //get artisans based on id == userId in event.vendor array
  useEffect(() => {
    event &&
      event.vendor &&
      event.vendor.map((user) => {
        fetch(`/api/users/${user.userId}`)
          .then((res) => res.json())
          .then((data) => {
            return setVendors([data.data]);
          })
          .catch((err) => console.log(err));
      });
  }, [event]);

  if (status === "loading") {
    return <div>loading</div>;
  }

  return (
    <Wrapper>
      <Main>
        <Name>{event.name}</Name>
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
          <Div>{event.location}</Div>
        </EventDate>

        <Div>Description:</Div>
        <Div>{event.description}</Div>
        <Div>Vendors on MadeLocally:</Div>
        <Vendors>
          {vendors.length > 0 ? (
            vendors.map((user) => {
              console.log(user.businessName);
              return (
                <User to={`/profile/${user._id}`} key={user._id}>
                  {user.businessName}
                </User>
              );
            })
          ) : (
            <div>loading</div>
          )}
        </Vendors>

        <Vendors>
          {event && event.vendors && (
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

const Name = styled.h1`
  color: black;
`;
const Div = styled.div``;
const EventDate = styled.div`
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--dark-blue);
`;
const Span = styled.span`
  margin-left: 5px;
`;
const Vendors = styled.div``;

const User = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: var(--dark-blue);
  }
`;
