import styled from "styled-components";
import ItemImage from "./itemImages";

const ShowImage = ({ images, removeImage }) => {
  const show = (image) => {
    return (
      <>
        <ItemImage image={image} imagesArr={images} removeImage={removeImage} />
        {/* <Button onClick={removeImage(image)}>x</Button> */}
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
  border: 1px solid red;
  height: 100%;
`;
const Button = styled.button``;
