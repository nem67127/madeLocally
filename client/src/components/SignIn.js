import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  //will get posted to their mongodb user
  //get current user based on {user} from auth0
  // once submit redirect to either homepage or profileform
  //create onClick that will fetch POST into
  const navigate = useNavigate();

  const onSumbit = () => {
    //navigate to profile form of person
    navigate("/profile-f");
  };
  return (
    <Wrapper>
      <Form>
        <Choice>Are you an ARTISAN?</Choice>
        <Span>
          <Div>
            <Input type="radio" name="artisan" value="yes" />
            yes
          </Div>
          <Div>
            <Input type="radio" name="artisan" value="no" />
            no
          </Div>
        </Span>
        <Button onClcik={(ev) => onSumbit(ev)}>Confirm</Button>
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
