import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

const ProfileForm = () => {
  //This is where artisans are directed to if they are new to the site to set up their profile
  const { profileId } = useParams();
  const { currentUser } = useContext(CurrentUserContext);
  //need to create a patch that will update made on profileid = objectId

  //Handle change to set form data and thats what we send to backend
  return (
    <Wrapper>
      <Form>
        <Container>
          <ProfilePic name="profileSrc">
            Where the image src for the profile pic to input
          </ProfilePic>
          <Div>
            <Name
              placeholder="Buisiness Name"
              name="businessName"
              type="text"
            />
            <Description
              placeholder="Enter a description of your business here"
              name="businessDescrip"
              type="text"
              multiline={true}
              rows={5}
            />
          </Div>
        </Container>

        <Container>
          <Info>
            <Input
              name="location"
              placeholder="where are you located"
              type="address"
            />
            <Input name="phone" placeholder="Contact number" type="tel" />
            <Input name="websiteUrl" placeholder="Website url" type="text" />
            <Input name="facebookUrl" placeholder="Facebook url" type="text" />
            <Input
              name="instagramUrl"
              placeholder="Instagram url"
              type="text"
            />
            <Categories>
              <span>
                <Input type="checkbox" id="jewlery" value="jewlery" />
                <Label htmlFor="jewlery">Jewlery</Label>
              </span>
              <span>
                <Input
                  type="checkbox"
                  id="Pottery/Ceramics"
                  value="pottery/ceramics"
                />
                <Label htmlFor="Pottery/Ceramics">Pottery / Ceramics</Label>
              </span>
              <span>
                <Input type="checkbox" id="food/drink" value="food/drink" />
                <Label htmlFor="food/drink">Food/Drink</Label>
              </span>
              <span>
                <Input type="checkbox" id="Woodwork" value="woodwork" />
                <Label htmlFor="woodwork">Woodworking</Label>
              </span>
              <span>
                <Input type="checkbox" id="Glasswork" value="glasswork" />
                <Label htmlFor="Glasswork">Glasswork</Label>
              </span>
              <span>
                <Input
                  type="checkbox"
                  id="Graphic Design / Printing"
                  value="graphicDesign/printing"
                />
                <Label htmlFor="Graphic Design / Printing">
                  Graphic Design / Printing
                </Label>
              </span>
              <span>
                <Input type="checkbox" id="Textiles" value="textiles" />
                <Label htmlFor="Textiles">Textiles</Label>
              </span>
              <span>
                <Input type="checkbox" id="Fine Arts" value="fineArts" />
                <Label htmlFor="Fine Arts">Fine Arts</Label>
              </span>
              <span>
                <Input type="checkbox" id="MetalWork" value="metalWork" />
                <Label htmlFor="MetalWork">Metal Work</Label>
              </span>
            </Categories>
          </Info>
          <Items name="items" placeholder="Drag and drop for picture urls" />
        </Container>
        <Button>Confirm</Button>
      </Form>
    </Wrapper>
  );
};

export default ProfileForm;

const Wrapper = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Form = styled.form`
  height: 100%;
  width: 80%;
  padding: 20px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProfilePic = styled.div`
  min-height: 30px;
  min-width: 30px;
  height: 15vw;
  width: 15vw;
  border: 1px solid black;
  border-radius: 50%;
`;
const Name = styled.input`
  font-size: 5vh;
`;
const Description = styled.textarea`
  margin-top: 10px;
  height: 100px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  width: 70%;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const Items = styled.input`
  margin-left: 20px;
  height: 45vh;
  width: 70%;
`;
const Input = styled.input`
  margin-bottom: 10px;
`;
const Categories = styled.div`
  display: flex;
  flex-direction: column;
  width: 15vw;
`;
const Label = styled.label``;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 15vh;
  margin-left: 20px;
`;
const Button = styled.button``;
