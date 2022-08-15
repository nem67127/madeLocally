import styled from "styled-components";
import { InfoWindow } from "@react-google-maps/api";

const InfoWindowComponent = ({
  selectedMarker,
  setSelectedMarker,
  user,
  currentUser,
  navigate,
}) => {
  return (
    <InfoWindow
      position={{
        lat: Number(selectedMarker.lat),
        lng: Number(selectedMarker.lng),
      }}
      onCloseClick={() => {
        setSelectedMarker(null);
      }}
    >
      <Container>
        {/* user has to be signed in to click link */}
        {selectedMarker.artisan.businessName ? (
          <h1
            onClick={() => {
              if (currentUser || user) {
                navigate(`/profile/${selectedMarker.user}`);
              } else {
                return window.alert(
                  "Please LOG IN / SIGN UP to view Artisan's profile."
                );
              }
            }}
          >
            {selectedMarker.artisan.businessName}
          </h1>
        ) : null}
        {selectedMarker.artisan.businessDescrip ? (
          <div>{selectedMarker.artisan.businessDescrip}</div>
        ) : null}
        {selectedMarker.artisan.location ? (
          <div>{selectedMarker.artisan.location}</div>
        ) : null}
      </Container>
    </InfoWindow>
  );
};
export default InfoWindowComponent;

const Container = styled.div``;
