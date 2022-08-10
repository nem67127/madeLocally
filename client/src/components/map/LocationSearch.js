import styled from "styled-components";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const LocationSearch = ({ panTo }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => "", lng: () => "" },
      radius: 200 * 1000,
    },
  });
  return (
    <Wrapper>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(ev) => {
            setValue(ev.target.value);
          }}
          disabled={!ready}
          placeholder="Enter your location"
          style={{
            width: "100%",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          }}
        />
        <ComboboxPopover>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxPopover>
      </Combobox>
    </Wrapper>
  );
};

export default LocationSearch;

const Wrapper = styled.div`
  position: absolute;
  z-index: 10;
  width: 30vw;
  margin: 10px;
`;
