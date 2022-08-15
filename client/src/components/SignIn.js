import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import Loading from "./Loading";

const SignIn = () => {
  const [radioValue, setRadioValue] = useState(null);

  const navigate = useNavigate();

  const { user } = useAuth0();
  //modifying the user.sub to work as _id
  const stringId = user && user.sub;
  const _id = stringId.substring(stringId.indexOf("|") + 1);

  const handleChange = (ev) => {
    const { value } = ev.target;
    setRadioValue(value);
  };

  const onSumbit = (ev) => {
    ev.preventDefault();

    fetch(`/api/users/${_id}`, {
      method: "POST",
      body: JSON.stringify({ artisan: radioValue }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("update user", data);
        }
      })
      .catch((err) => console.log(err));
    //navigate to homepage - no profile setup
    if (radioValue === null) {
      navigate(`/`);
      //navigates to profile form for artisan
    } else {
      navigate(`/profile-f/${_id}`);
    }
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Form>
        <Choice>Are you an ARTISAN?</Choice>
        <Span>
          <Div>
            <Input
              type="radio"
              name="artisan"
              value="yes"
              onChange={(ev) => handleChange(ev)}
            />
            yes
          </Div>
          <Div>
            <Input type="radio" name="artisan" value="no" />
            no
          </Div>
        </Span>
        <Button onClick={(ev) => onSumbit(ev)}>Confirm</Button>
      </Form>
    </Wrapper>
  );
};

export default SignIn;

const Wrapper = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--main-background-color);
  font-size: 30px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 50%;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  background-color: white;
`;
const Choice = styled.p`
  margin-bottom: 30px;
`;
const Button = styled.button`
  width: 20%;
  border: none;
  padding: 10px;
  margin-top: 30px;
  border-radius: 10px;
  background-color: transparent;
  border: 2px solid var(--dark-blue);
  color: var(--dark-blue);
  &:hover {
    background-color: var(--dark-blue);
    color: white;
  }
`;
const Input = styled.input`
  margin-right: 5px;
`;
const Span = styled.span`
  width: 30%;
  display: flex;
  justify-content: space-evenly;
`;
const Div = styled.div`
  display: flex;
`;
