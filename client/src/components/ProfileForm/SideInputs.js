import styled from "styled-components";
import { FiInstagram, FiPhone } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { MdWebAsset, MdLocationPin } from "react-icons/md";

const SideInputs = ({ handleChangeProfile }) => {
  return (
    <>
      <Box>
        <MdLocationPin style={{ height: "10%", width: "10%" }} />
        <Input
          name="location"
          placeholder="where are you located"
          type="address"
          onChange={(ev) => handleChangeProfile(ev.target.value, "location")}
        />
      </Box>
      <Box>
        <FiPhone style={{ height: "10%", width: "10%" }} />
        <Input
          name="phone"
          placeholder="Contact number"
          type="tel"
          onChange={(ev) => handleChangeProfile(ev.target.value, "phone")}
        />
      </Box>
      <Box>
        <MdWebAsset style={{ height: "10%", width: "10%" }} />
        <Input
          name="websiteUrl"
          placeholder="Website url"
          type="text"
          onChange={(ev) => handleChangeProfile(ev.target.value, "websiteUrl")}
        />
      </Box>
      <Box>
        <FaFacebook style={{ height: "10%", width: "10%" }} />
        <Input
          name="facebookUrl"
          placeholder="Facebook url"
          type="text"
          onChange={(ev) => handleChangeProfile(ev.target.value, "facebookUrl")}
        />
      </Box>
      <Box>
        <FiInstagram style={{ height: "10%", width: "10%" }} />
        <Input
          name="instagramUrl"
          placeholder="Instagram url"
          type="text"
          onChange={(ev) =>
            handleChangeProfile(ev.target.value, "instagramUrl")
          }
        />
      </Box>
      {/* <Button onClick={(ev) => handleSubmit(ev)}>Save</Button>
      <Button onClick={(ev) => handleLocation(ev)}>Add location to Map</Button> */}
    </>
  );
};
export default SideInputs;

const Box = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;
const Input = styled.input`
  width: 100%;
  margin-left: 10px;
`;
const Button = styled.button``;
