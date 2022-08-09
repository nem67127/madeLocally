import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import { FiInstagram, FiPhone } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { MdWebAsset, MdLocationPin } from "react-icons/md";
import { Dropzone } from "react-dropzone";

const ProfileForm = () => {
  //This is where artisans are directed to if they are new to the site to set up their profile
  const { profileId } = useParams();
  const { currentUser } = useContext(CurrentUserContext);

  const [profileData, setProfileData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useState(null);
  //need to create a patch that will update made on profileid = objectId
  //Handle change to set form data and thats what we send to backend
  const handleChangeProfile = (value, name) => {
    setProfileData({ ...profileData, [name]: value });
    if (name === "location") {
      setLocation({ user: profileId, location: value });
    }
  };
  //to put categories checked into an array
  const handleChangeCategories = (ev) => {
    setCategories([ev.target.value, ...categories]);
  };
  //need onclick to submit form and navigate and post location and patch user
  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(profileData);
    console.log(categories);
    console.log(location);
  };

  return (
    <Wrapper>
      <Form onSubmit={(ev) => handleSubmit(ev)}>
        <Container>
          <ProfilePic name="profileSrc">
            Where the image src for the profile pic to input
          </ProfilePic>
          <Div>
            <Name
              placeholder="Buisiness Name"
              name="businessName"
              type="text"
              onChange={(ev) =>
                handleChangeProfile(ev.target.value, "businessName")
              }
            />
            <Description
              placeholder="Enter a description of your business here"
              name="businessDescrip"
              type="text"
              multiline={true}
              rows={5}
              onChange={(ev) =>
                handleChangeProfile(ev.target.value, "businessDescrip")
              }
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
                onChange={(ev) =>
                  handleChangeProfile(ev.target.value, "location")
                }
              />
            </Box>

            <Box>
              <FiPhone style={{ height: "10%", width: "10%" }} />
              <Input
                name="phone"
                placeholder="Contact number"
                type="tel"
                onChange={(ev) => handleChangeProfile(ev.target.value, "phone")}
              />
            </Box>
            <Box>
              <MdWebAsset style={{ height: "10%", width: "10%" }} />
              <Input
                name="websiteUrl"
                placeholder="Website url"
                type="text"
                onChange={(ev) =>
                  handleChangeProfile(ev.target.value, "websiteUrl")
                }
              />
            </Box>
            <Box>
              <FaFacebook style={{ height: "10%", width: "10%" }} />
              <Input
                name="facebookUrl"
                placeholder="Facebook url"
                type="text"
                onChange={(ev) =>
                  handleChangeProfile(ev.target.value, "facebookUrl")
                }
              />
            </Box>
            <Box>
              <FiInstagram style={{ height: "10%", width: "10%" }} />
              <Input
                name="instagramUrl"
                placeholder="Instagram url"
                type="text"
                onChange={(ev) =>
                  handleChangeProfile(ev.target.value, "instagramUrl")
                }
              />
            </Box>

            <Categories>
              <p>Categories:</p>
              <Box>
                <Check
                  type="checkbox"
                  id="category"
                  value="jewlery"
                  onChange={(ev) => handleChangeCategories(ev)}
                />
                <Label htmlFor="category">Jewlery</Label>
              </Box>
              <Box>
                <Check
                  type="checkbox"
                  id="category"
                  value="pottery/ceramics"
                  onChange={(ev) => handleChangeCategories(ev)}
                />
                <Label htmlFor="category">Pottery / Ceramics</Label>
              </Box>
              <Box>
                <Check
                  type="checkbox"
                  id="category"
                  value="food/drink"
                  onChange={(ev) => handleChangeCategories(ev)}
                />
                <Label htmlFor="category">Food/Drink</Label>
              </Box>
              <Box>
                <Check
                  type="checkbox"
                  id="category"
                  value="woodwork"
                  onChange={(ev) => handleChangeCategories(ev)}
                />
                <Label htmlFor="category">Woodworking</Label>
              </Box>
              <Box>
                <Check
                  type="checkbox"
                  id="category"
                  value="glasswork"
                  onChange={(ev) => handleChangeCategories(ev)}
                />
                <Label htmlFor="category">Glasswork</Label>
              </Box>
              <Box>
                <Check
                  type="checkbox"
                  id="category"
                  value="graphicDesign/printing"
                  onChange={(ev) => handleChangeCategories(ev)}
                />
                <Label htmlFor="category">Graphic Design / Printing</Label>
              </Box>
              <Box>
                <Check
                  type="checkbox"
                  id="category"
                  value="textiles"
                  onChange={(ev) => handleChangeCategories(ev)}
                />
                <Label htmlFor="category">Textiles</Label>
              </Box>
              <Box>
                <Check
                  type="checkbox"
                  id="category"
                  value="fineArts"
                  onChange={(ev) => handleChangeCategories(ev)}
                />
                <Label htmlFor="category">Fine Arts</Label>
              </Box>

              <Box>
                <Check
                  type="checkbox"
                  id="category"
                  value="metalWork"
                  onChange={(ev) => handleChangeCategories(ev)}
                />
                <Label htmlFor="category">Metal Work</Label>
              </Box>
            </Categories>
          </Info>
          <Items name="items" placeholder="Drag and drop for picture urls" />
        </Container>
        <Button type="submit">Confirm</Button>
      </Form>
    </Wrapper>
  );
};

export default ProfileForm;

const Wrapper = styled.div`
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
  align-self: flex-start;
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
