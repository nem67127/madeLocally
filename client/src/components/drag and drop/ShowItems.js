import styled from "styled-components";
import ItemImage from "./itemImages";

const ShowImage = ({ images, removeImage }) => {
  const show = (image) => {
    return (
      <>
        <ItemImage image={image} imagesArr={images} removeImage={removeImage} />
      </>
    );
  };
  return <Container>{images.map(show)}</Container>;
};

export default ShowImage;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
`;
