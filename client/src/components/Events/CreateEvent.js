import { useContext, useState } from "react";
import styled from "styled-components";
import { UpdateEventContext } from "../contexts/UpdateEvents";

const CreateEvent = () => {
  const [createEvent, setCreateEvent] = useState(null);
  const { eventUpdate, setEventUpdate } = useContext(UpdateEventContext);
  //onChange function
  const handleChange = (value, name) => {
    setCreateEvent({ ...createEvent, [name]: value });
  };
  //on submit post to events
  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch("/api/events", {
      method: "POST",
      body: JSON.stringify({ ...createEvent }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setEventUpdate(!eventUpdate);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      <Form onSubmit={(ev) => handleSubmit(ev)}>
        <Box>
          <Label>Name of Event:</Label>
          <Input
            name="name"
            placeholder="Enter name of the event"
            onChange={(ev) => handleChange(ev.target.value, "name")}
          />
        </Box>
        <Box>
          <Label>Where:</Label>
          <Input
            name="location"
            placeholder="Where is it located"
            type="address"
            onChange={(ev) => handleChange(ev.target.value, "location")}
          />
        </Box>

        <Box>
          <Label>Date:</Label>
          <div style={{ marginRight: "2.5%" }}>start:</div>
          <Time
            name="startDate"
            type="date"
            onChange={(ev) => handleChange(ev.target.value, "startDate")}
          />
          <div style={{ margin: " 0 2.5%" }}>end:</div>
          <Time
            name="endDate"
            type="date"
            onChange={(ev) => handleChange(ev.target.value, "endDate")}
          />
        </Box>
        <Box>
          <Label>Time:</Label>
          <div style={{ marginRight: "2.5%" }}>start:</div>
          <Time
            name="startTime"
            type="time"
            onChange={(ev) => handleChange(ev.target.value, "startTime")}
          />
          <div style={{ margin: " 0 2.5%" }}>end:</div>
          <Time
            name="endTime"
            type="time"
            onChange={(ev) => handleChange(ev.target.value, "endTime")}
          />
        </Box>

        <Box>
          <Label>List of Vendors:</Label>
          <Input
            name="aritsans"
            placeholder="Add each artisan separating them with a comma"
            onChange={(ev) => handleChange(ev.target.value, "vendors")}
          />
        </Box>

        <Box>
          <Label>Description:</Label>
          <Input
            name="description"
            placeholder="Description"
            onChange={(ev) => handleChange(ev.target.value, "description")}
          />
        </Box>
        {createEvent === null ||
        createEvent.name === "" ||
        createEvent.startDate === "" ||
        createEvent.startTime === "" ||
        createEvent.location === "" ? (
          <Button type="submit" disabled={true}>
            Create Event
          </Button>
        ) : (
          <Button type="submit">Create Event</Button>
        )}
      </Form>
    </Wrapper>
  );
};

export default CreateEvent;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  /* background-color: var(--main-background-color); */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  margin-top: 30px;
  border-radius: 10px;
  background-color: white;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const Label = styled.div`
  width: 15%;
`;
const Input = styled.input`
  width: 85%;
`;
const Button = styled.button`
  width: 40%;
  padding: 10px;
  align-self: center;
  border: 2px solid #add6ff;
  color: #2e6bc5;
  border-radius: 5px;
  background-color: transparent;
  &:disabled {
    opacity: 0.5;
    background-color: #add6ff;
  }
  &:hover {
    background-color: #add6ff;
  }
`;

const Time = styled.input`
  width: 36.25%;
`;
