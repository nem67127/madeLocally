import styled from "styled-components";
import { FiInstagram, FiPhone } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { MdWebAsset, MdLocationPin } from "react-icons/md";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const SideInputs = ({ handleChangeProfile }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 48.528525, lng: () => -123.39876 },
      radius: 200 * 1000,
    },
  });
  return (
    <>
      <Box>
        <MdLocationPin style={{ height: "10%", width: "10%" }} />
        <Combobox
          onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();
            try {
              handleChangeProfile(address, "location");
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <ComboboxInput
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
            disabled={!ready}
            placeholder="Enter your location"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
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
