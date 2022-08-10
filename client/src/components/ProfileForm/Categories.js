import styled from "styled-components";
import { useState } from "react";

const Categories = ({ profileId, handleChangeCategories }) => {
  return (
    <Cat>
      <p>Categories:</p>
      <Box>
        <Check
          type="checkbox"
          id="category"
          value="jewlery"
          onChange={(ev) => handleChangeCategories(ev)}
        />
        <Label htmlFor="category">Jewlery</Label>
      </Box>
      <Box>
        <Check
          type="checkbox"
          id="category"
          value="pottery/ceramics"
          onChange={(ev) => handleChangeCategories(ev)}
        />
        <Label htmlFor="category">Pottery / Ceramics</Label>
      </Box>
      <Box>
        <Check
          type="checkbox"
          id="category"
          value="food/drink"
          onChange={(ev) => handleChangeCategories(ev)}
        />
        <Label htmlFor="category">Food/Drink</Label>
      </Box>
      <Box>
        <Check
          type="checkbox"
          id="category"
          value="woodwork"
          onChange={(ev) => handleChangeCategories(ev)}
        />
        <Label htmlFor="category">Woodworking</Label>
      </Box>
      <Box>
        <Check
          type="checkbox"
          id="category"
          value="glasswork"
          onChange={(ev) => handleChangeCategories(ev)}
        />
        <Label htmlFor="category">Glasswork</Label>
      </Box>
      <Box>
        <Check
          type="checkbox"
          id="category"
          value="graphicDesign/printing"
          onChange={(ev) => handleChangeCategories(ev)}
        />
        <Label htmlFor="category">Graphic Design / Printing</Label>
      </Box>
      <Box>
        <Check
          type="checkbox"
          id="category"
          value="textiles"
          onChange={(ev) => handleChangeCategories(ev)}
        />
        <Label htmlFor="category">Textiles</Label>
      </Box>
      <Box>
        <Check
          type="checkbox"
          id="category"
          value="fineArts"
          onChange={(ev) => handleChangeCategories(ev)}
        />
        <Label htmlFor="category">Fine Arts</Label>
      </Box>

      <Box>
        <Check
          type="checkbox"
          id="category"
          value="metalWork"
          onChange={(ev) => handleChangeCategories(ev)}
        />
        <Label htmlFor="category">Metal Work</Label>
      </Box>
      {/* <Button onClick={(ev) => handleSubmit(ev)}>Save</Button> */}
    </Cat>
  );
};

export default Categories;

const Cat = styled.div`
  display: flex;
  flex-direction: column;
  width: 15vw;
`;
const Label = styled.label`
  width: 80%;
`;
const Check = styled.input`
  margin-right: 10px;
`;
const Box = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;
const Button = styled.button``;
