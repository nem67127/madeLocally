import styled from "styled-components";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

const HomePage = () => {
  //not sure how to implement search bar function

  //set state for markers and fetch locations and set array to markers
  const [markers, setMarkers] = useState(null);
  const [error, setError] = useState(null);
  // //get user
  const { user } = useAuth0();
  const navigate = useNavigate();

  const { setCurrentUser, currentUser } = useContext(CurrentUserContext);

  //check if user is in users collection
  useEffect(() => {
    if (user) {
      const email = user.email;
      fetch(`/api/user/${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.data.artisan === undefined) {
            //if user does not have artisan attritube navigate to form
            navigate("/sign-in");
          }
          setCurrentUser(data.data);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [user]);

  //get all the locations - should depend on if another profile is made
  useEffect(() => {
    fetch("api/locations")
      .then((res) => res.json())
      .then((data) => {
        setMarkers(data.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  //get the user on the location clicked to show information

  //for the map
  const libraries = ["places"];
  const mapContainerStyle = { width: "100%", height: "100%" };
  const options = {
    //styling from snazzymaps: https://snazzymaps.com/style/77/clean-cut
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };
  //where the map will populate at the start
  const center = {
    lat: 48.528525,
    lng: -123.39876,
  };
  //checking if map is loaded or if there was an error
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError || error) {
    return <div>ErrorLoading Maps{error}</div>;
  }

  if (!isLoaded) {
    return <div>Loading Map</div>;
  }

  return (
    <Wrapper>
      <Map>
        <GoogleMap
          center={center}
          zoom={10}
          mapContainerStyle={mapContainerStyle}
          options={options}
        >
          {markers
            ? markers.map((marker) => {
                return (
                  <Marker
                    key={marker._id}
                    //put in address as lat and lng or can markers use addresses
                    position={{
                      lat: Number(marker.lat),
                      lng: Number(marker.lng),
                    }}
                  />
                );
              })
            : null}
        </GoogleMap>
      </Map>
    </Wrapper>
  );
};

export default HomePage;
const Wrapper = styled.div`
  height: calc(100vh - 80px);
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Map = styled.div`
  height: 70%;
  width: 80%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
