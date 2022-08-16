import { FiInstagram, FiPhone } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { MdWebAsset, MdLocationPin, MdOutlineEmail } from "react-icons/md";
import styled from "styled-components";

const ProfileDetails = ({ profiles }) => {
  return (
    <>
      <Box>
        {profiles.location ? (
          <Div>
            <MdLocationPin style={{ height: "2vw", width: "2vw" }} />
            <Input>{profiles.location}</Input>
          </Div>
        ) : null}
      </Box>
      <Box>
        {profiles.phone ? (
          <Div>
            <FiPhone style={{ height: "2vw", width: "2vw" }} />
            <Input>{profiles.phone}</Input>
          </Div>
        ) : null}
      </Box>
      <Box>
        {profiles.email ? (
          <Div>
            <MdOutlineEmail style={{ height: "2vw", width: "2vw" }} />
            <Input>{profiles.email}</Input>
          </Div>
        ) : null}
      </Box>
      <Box>
        {profiles.websiteUrl ? (
          <Div>
            <MdWebAsset style={{ height: "2vw", width: "2vw" }} />
            <Url href={`${profiles.websiteUrl}`}>{profiles.websiteUrl}</Url>
          </Div>
        ) : null}
      </Box>
      <Box>
        {profiles.facebookUrl ? (
          <Div>
            <FaFacebook style={{ height: "2vw", width: "2vw" }} />
            <Url href={`${profiles.facebookUrl}`}>{profiles.facebookUrl}</Url>
          </Div>
        ) : null}
      </Box>
      <Box>
        {profiles.instagramUrl ? (
          <Div>
            <FiInstagram style={{ height: "2vw", width: "2vw" }} />
            <Url href={`${profiles.instagramUrl}`}>{profiles.instagramUrl}</Url>
          </Div>
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
  text-decoration: none;
  color: black;
  &:hover {
    color: var(--dark-blue);
  }
  flex-wrap: wrap;
  width: 85%;
  margin-left: 5px;
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  overflow-wrap: break-word;
`;
