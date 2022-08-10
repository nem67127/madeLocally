import styled from "styled-components";

const ItemImage = ({ image }) => {
  return (
    <Container>
      <Item alt="" src={image.src} />
    </Container>
  );
};

export default ItemImage;

const Container = styled.div``;
const Item = styled.img`
  height: 200px;
  margin: 10px;
`;
