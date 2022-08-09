import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import { FiInstagram, FiPhone } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { MdWebAsset, MdLocationPin } from "react-icons/md";

const ProfileForm = () => {
  //This is where artisans are directed to if they are new to the site to set up their profile
  const { profileId } = useParams();
  const { currentUser } = useContext(CurrentUserContext);
  //need to create a patch that will update made on profileid = objectId

  //Handle change to set form data and thats what we send to backend
  //need onlcik to submit form and navigate and post location and patch user
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
            <Box>
              <MdLocationPin style={{ height: "10%", width: "10%" }} />
              <Input
                name="location"
                placeholder="where are you located"
                type="address"
              />
            </Box>

            <Box>
              <FiPhone style={{ height: "10%", width: "10%" }} />
              <Input name="phone" placeholder="Contact number" type="tel" />
            </Box>
            <Box>
              <MdWebAsset style={{ height: "10%", width: "10%" }} />
              <Input name="websiteUrl" placeholder="Website url" type="text" />
            </Box>
            <Box>
              <FaFacebook style={{ height: "10%", width: "10%" }} />
              <Input
                name="facebookUrl"
                placeholder="Facebook url"
                type="text"
              />
            </Box>
            <Box>
              <FiInstagram style={{ height: "10%", width: "10%" }} />
              <Input
                name="instagramUrl"
                placeholder="Instagram url"
                type="text"
              />
            </Box>

            <Categories>
              <Box>
                <Check type="checkbox" id="jewlery" value="jewlery" />
                <Label htmlFor="jewlery">Jewlery</Label>
              </Box>
              <Box>
                <Check
                  type="checkbox"
                  id="Pottery/Ceramics"
                  value="pottery/ceramics"
                />
                <Label htmlFor="Pottery/Ceramics">Pottery / Ceramics</Label>
              </Box>
              <Box>
                <Check type="checkbox" id="food/drink" value="food/drink" />
                <Label htmlFor="food/drink">Food/Drink</Label>
              </Box>
              <Box>
                <Check type="checkbox" id="Woodwork" value="woodwork" />
                <Label htmlFor="woodwork">Woodworking</Label>
              </Box>
              <Box>
                <Check type="checkbox" id="Glasswork" value="glasswork" />
                <Label htmlFor="Glasswork">Glasswork</Label>
              </Box>
              <Box>
                <Check
                  type="checkbox"
                  id="Graphic Design / Printing"
                  value="graphicDesign/printing"
                />
                <Label htmlFor="Graphic Design / Printing">
                  Graphic Design / Printing
                </Label>
              </Box>
              <Box>
                <Check type="checkbox" id="Textiles" value="textiles" />
                <Label htmlFor="Textiles">Textiles</Label>
              </Box>
              <Box>
                <Check type="checkbox" id="Fine Arts" value="fineArts" />
                <Label htmlFor="Fine Arts">Fine Arts</Label>
              </Box>

              <Box>
                <Check type="checkbox" id="MetalWork" value="metalWork" />
                <Label htmlFor="MetalWork">Metal Work</Label>
              </Box>
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
  width: 100%;
  margin-left: 10px;
`;
const Categories = styled.div`
  display: flex;
  flex-direction: column;
  width: 15vw;
`;
const Label = styled.label`
  width: 80%;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 15vh;
  margin-left: 20px;
`;
const Button = styled.button`
  position: absolute;
  left: 80vw;
  padding: 10px;
`;

const Box = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;

const Check = styled.input`
  margin-right: 10px;
`;
