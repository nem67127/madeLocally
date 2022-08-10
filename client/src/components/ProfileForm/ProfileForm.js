import { useContext, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ItemsDropZone from "../drag and drop/ItemDropzone";
import Categories from "./Categories";
import SideInputs from "./SideInputs";
import ProfilePicture from "../drag and drop/ProfilePicture";
import Geocode from "react-geocode";

const ProfileForm = () => {
  //This is where artisans are directed to if they are new to the site to set up their profile
  const { profileId } = useParams();
  const { currentUser } = useContext(CurrentUserContext);
  //what the user will be set with
  const [profileData, setProfileData] = useState(null);
  const [images, setImages] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useState(null);

  const navigate = useNavigate();
  //to put categories checked into an array
  const handleChangeCategories = (ev) => {
    setCategories([ev.target.value, ...categories]);
  };
  //change location to lat and lng with react-geocode
  const getLatLng = () => {
    Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
    return Geocode.fromAddress(`${location.location}`).then(
      (res) => {
        console.log(res);
        const { lat, lng } = res.results[0].geometry.location;
        console.log(lat, lng);
        return { lat, lng };
      },
      (err) => {
        console.log(err);
      }
    );
  };
  //Handle change to set form data and thats what we send to backend
  const handleChangeProfile = (value, name) => {
    setProfileData({ ...profileData, [name]: value });
    if (name === "location") {
      setLocation({ user: profileId, location: value });
    }
  };

  //need onclick to submit form and navigate and post location and patch user
  const handleSubmit = async (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    console.log("hello");

    await fetch(`/api/profile/${profileId}`, {
      method: "PATCH",
      body: JSON.stringify({ ...profileData, categories, images, profilePic }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("user updated", data);
        }
      })
      .catch((err) => console.log(err));
    if (location) {
      const latlng = await getLatLng();
      if (latlng) {
        await fetch(`/api/locations`, {
          method: "POST",
          body: JSON.stringify({ ...location, ...latlng }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 200) {
              console.log("user's location updated", data);
            }
          })
          .catch((err) => console.log(err));
      }
    }

    await navigate(`/profile/${profileId}`);
  };

  return (
    <Wrapper>
      <Form>
        <Container>
          <ProfilePicture
            profileId={profileId}
            profilePic={profilePic}
            setProfilePic={setProfilePic}
          />
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
            <SideInputs
              profileId={profileId}
              handleChangeProfile={handleChangeProfile}
            />
            <Categories
              profileId={profileId}
              handleChangeCategories={handleChangeCategories}
            />
          </Info>
          <Items>
            <ItemsDropZone
              profileId={profileId}
              images={images}
              setImages={setImages}
            />
          </Items>
        </Container>
        <Button onClick={(ev) => handleSubmit(ev)}>Update/Save</Button>
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
  height: 20vh;
  margin-left: 20px;
`;
const Button = styled.button``;

const Box = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;
