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
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const LocationSearch = ({ panTo, setSearchBar, searchBar }) => {
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

  const [toggle, setToggle] = useState(false);
  return (
    <Div>
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
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </Wrapper>
      <SearchBarConatiner>
        <Button
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            setToggle(!toggle);
          }}
        >
          <FaSearch />
        </Button>
        {toggle ? (
          <SearchBar
            value={searchBar}
            placeholder="Search for anything"
            onChange={(e) => {
              setSearchBar(e.target.value.toLowerCase());
            }}
          />
        ) : null}
      </SearchBarConatiner>
    </Div>
  );
};

export default LocationSearch;

const Wrapper = styled.div`
  z-index: 10;
  width: 30vw;
  margin: 10px;
`;

const SearchBar = styled.input`
  border: none;
  padding: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 5px;
`;
const SearchBarConatiner = styled.div`
  z-index: 5;
  display: flex;
  align-items: center;
  margin: 0 10px;
`;

const Div = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background-color: var(--dark-blue);
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
