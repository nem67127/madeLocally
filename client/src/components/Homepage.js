import styled from "styled-components";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

const HomePage = () => {
  //not sure how to implement search bar function
  //popup for address

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <div>Loading Map</div>;
  }
  const center = {
    lat: 48.407326,
    lng: -123.329773,
  };

  return (
    <Wrapper>
      <Map>
        <GoogleMap
          center={center}
          zoom={10}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          {/* displaying markers */}
        </GoogleMap>
      </Map>
    </Wrapper>
  );
};

export default HomePage;
const Wrapper = styled.div`
  height: calc(100vh - 50px);
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Map = styled.div`
  height: 70%;
  width: 80%;
`;
