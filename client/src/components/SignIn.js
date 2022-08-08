import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const SignIn = () => {
  const [radioValue, setRadioValue] = useState(null);
  //will get posted to their mongodb user
  //get current user based on {user} from auth0
  // once submit redirect to either homepage or profileform
  //create onClick that will fetch POST into
  const navigate = useNavigate();

  const { user } = useAuth0();

  const stringId = user.sub;
  const _id = stringId.substring(stringId.indexOf("|") + 1);

  const handleChange = (ev) => {
    const { value } = ev.target;
    setRadioValue(value);
  };

  const onSumbit = (ev) => {
    ev.preventDefault();

    fetch(`/api/users/${_id}`, {
      method: "PATCH",
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
      //navigate to profile form for artisan
    } else {
      navigate(`/profile-f/${_id}`);
    }
  };

  if (!user) {
    return <div>Loading</div>;
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
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 50%;
  border: 1px solid black;
`;
const Choice = styled.p`
  margin-bottom: 30px;
`;
const Button = styled.button`
  width: 20%;
  border: none;
  padding: 10px;
  margin-top: 30px;
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
