import { useContext, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Dropzone } from "react-dropzone";
import ItemsDropZone from "../drag and drop/ItemDropzone";
import Categories from "./Categories";
import SideInputs from "./SideInputs";

const ProfileForm = () => {
  //This is where artisans are directed to if they are new to the site to set up their profile
  const { profileId } = useParams();
  const { currentUser } = useContext(CurrentUserContext);
  //what the user will be set with
  const [profileData, setProfileData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useState(null);
  //drag and drop for profile picture
  const [profilePic, setProfilePic] = useState(null);

  //for drag and drop of item images
  const [images, setImages] = useState([]);

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
    console.log(images);
    console.log(profilePic);
    //this is to be inputted to locations collection
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
            <SideInputs handleChangeCategories={handleChangeProfile} />
            <Categories handleChangeCategories={handleChangeCategories} />
          </Info>
          <Items>
            <ItemsDropZone images={images} setImages={setImages} />
          </Items>
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
const Items = styled.div`
  margin-left: 20px;
  height: 45vh;
  width: 70%;
  align-self: flex-start;
`;
const Input = styled.input`
  width: 100%;
  margin-left: 10px;
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
