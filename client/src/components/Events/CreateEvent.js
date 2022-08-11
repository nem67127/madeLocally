import { useContext, useState } from "react";
import styled from "styled-components";
import { UpdateEventContext } from "../contexts/UpdateEvents";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const CreateEvent = () => {
  const initialState = {
    name: "",
    location: null,
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
  };
  const [createEvent, setCreateEvent] = useState(initialState);
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
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 48.528525, lng: () => -123.39876 },
      radius: 200 * 1000,
    },
  });
  console.log(createEvent);

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
          <Combobox
            onSelect={async (address) => {
              setValue(address, false);
              clearSuggestions();
              try {
                handleChange(address, "location");
              } catch (err) {
                console.log(err);
              }
            }}
            style={{ width: "85%" }}
          >
            <ComboboxInput
              value={value}
              onChange={(ev) => setValue(ev.target.value)}
              disabled={!ready}
              placeholder="Enter your location"
              style={{ width: "100%" }}
            />
            <ComboboxPopover>
              <ComboboxList>
                {status === "OK" &&
                  data.map(({ id, description }) => (
                    <ComboboxOption key={id} value={description} />
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
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
        {createEvent.name === "" ||
        createEvent.startDate === "" ||
        createEvent.startTime === "" ||
        createEvent.location === null ? (
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
