import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "../Loading";
import ItemsDropZone from "../drag and drop/ItemDropzone";
import Categories from "./Categories";
import SideInputs from "./SideInputs";
import ProfilePicture from "../drag and drop/ProfilePicture";
import Geocode from "react-geocode";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];
const ProfileForm = () => {
  //This is where artisans are directed to if they are new to the site to set up their profile
  const { profileId } = useParams();
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

  //checking if map is loaded or if there was an error
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

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
          body: JSON.stringify({
            ...location,
            ...latlng,
            artisan: { ...profileData, categories, images, profilePic },
          }),
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

  if (loadError) {
    return <div>ErrorLoading Maps</div>;
  }
  if (!isLoaded) {
    return <Loading />;
  }

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

  background-color: var(--main-background-color);
`;
const Form = styled.form`
  margin-top: 20px;
  min-height: calc(100vh - 80px);
  width: 80%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  background-color: white;
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

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 20vh;
  margin-left: 20px;
`;
const Button = styled.button``;
