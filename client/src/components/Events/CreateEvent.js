import styled from "styled-components";

const CreateEvent = () => {
  return (
    <Wrapper>
      <Form>
        <Box>
          <Label>Name of Event:</Label>
          <Input name="name" placeholder="Enter name of the event" />
        </Box>
        <Box>
          <Label>Where:</Label>
          <Input name="location" placeholder="Where is it located" />
        </Box>

        <Box>
          <Label>When:</Label>
          <Input
            name="date"
            placeholder="When and what time will it take place"
          />
        </Box>

        <Box>
          <Label>List of Vendors:</Label>
          <Input
            name="aritsans"
            placeholder="Add each artisan separating them with a comma"
          />
        </Box>

        <Box>
          <Label>Description:</Label>
          <Input name="description" placeholder="Description" />
        </Box>

        <Button>Create Event</Button>
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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
