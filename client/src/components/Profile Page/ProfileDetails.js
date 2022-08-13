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
        ) : null}
      </Box>
      <Box>
        {profiles.phone ? (
          <>
            <FiPhone style={{ height: "2vw", width: "2vw" }} />
            <Input>{profiles.phone}</Input>
          </>
        ) : null}
      </Box>
      <Box>
        {profiles.websiteUrl ? (
          <>
            <MdWebAsset style={{ height: "2vw", width: "2vw" }} />
            <Url href={`${profiles.websiteUrl}`}>{profiles.websiteUrl}</Url>
          </>
        ) : null}
      </Box>
      <Box>
        {profiles.facebookUrl ? (
          <>
            <FaFacebook style={{ height: "2vw", width: "2vw" }} />
            <Url href={`${profiles.facebookUrl}`}>{profiles.facebookUrl}</Url>
          </>
        ) : null}
      </Box>
      <Box>
        {profiles.instagramUrl ? (
          <>
            <FiInstagram style={{ height: "2vw", width: "2vw" }} />
            <Url href={`${profiles.instagramUrl}`}>{profiles.instagramUrl}</Url>
          </>
        ) : null}
      </Box>
    </>
  );
};

export default ProfileDetails;

const Box = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  min-width: 30px;
  width: 15vw;
`;
const Input = styled.div`
  margin-left: 10px;
  width: 100%;
`;

const Url = styled.a`
  margin-left: 10px;
  text-decoration: none;
  color: black;
  &:hover {
    color: var(--dark-blue);
  }
`;
