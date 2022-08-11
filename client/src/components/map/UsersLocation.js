import styled from "styled-components";
import { MdOutlineMyLocation } from "react-icons/md";

const UsersLocation = ({ panTo }) => {
  return (
    <Button
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <MdOutlineMyLocation style={{ color: "white" }} />
    </Button>
  );
};
export default UsersLocation;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10%;
  border: none;
  background-color: #2e6bc5;
  margin: 10px;
  z-index: 5;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
