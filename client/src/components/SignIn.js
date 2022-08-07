import styled from "styled-components";
const SignIn = () => {
  //this is where people who have to sign up will be redirected to, to chose what userType they are
  //will get posted to their mongodb user
  // once submit redirect to either homepage or profileform
  //it will post to user - backend will have to check if user exist if so front end will navigate tohomepage, if not and is make will create profile
  //create onClick that will fetch POST into
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
        <Button>Confirm</Button>
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
