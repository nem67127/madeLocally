import { FiInstagram, FiPhone } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { MdWebAsset, MdLocationPin } from "react-icons/md";
import styled from "styled-components";

const ProfileDetails = ({ profiles }) => {
  return (
    <>
      <Box>
        {profiles.location ? (
          <>
            <MdLocationPin style={{ height: "2vw", width: "2vw" }} />
            <Input>{profiles.location}</Input>
          </>
        ) : (
          <></>
        )}
      </Box>
      <Box>
        {profiles.phone ? (
          <>
            <FiPhone style={{ height: "2vw", width: "2vw" }} />
            <Input>{profiles.phone}</Input>
          </>
        ) : (
          <></>
        )}
      </Box>
      <Box>
        {profiles.websiteUrl ? (
          <>
            <MdWebAsset style={{ height: "2vw", width: "2vw" }} />
            <Input>{profiles.websiteUrl}</Input>
          </>
        ) : (
          <></>
        )}
      </Box>
      <Box>
        {profiles.facebookUrl ? (
          <>
            <FaFacebook style={{ height: "2vw", width: "2vw" }} />
            <Input>{profiles.facebookUrl}</Input>
          </>
        ) : (
          <></>
        )}
      </Box>
      <Box>
        {profiles.instagramUrl ? (
          <>
            <FiInstagram style={{ height: "2vw", width: "2vw" }} />
            <Input>{profiles.instagramUrl}</Input>
          </>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default ProfileDetails;

const Box = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;
const Input = styled.div`
  width: 100%;
  margin-left: 10px;
`;
