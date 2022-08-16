import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import styled from "styled-components";
import { Image } from "cloudinary-react";

const ItemsDropZone = ({ images, setImages }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const url = `https://api.cloudinary.com/v1_1/dqvrktiam/upload`;

      acceptedFiles.map(async (acceptedFile) => {
        const formData = new FormData();
        formData.append("file", acceptedFile);
        formData.append("upload_preset", "gx7mguox");
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setImages((old) => [...old, data]);
        console.log(data);
      });
    },
    [setImages]
  );

  const {
    getRootProps,
    getInputProps,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    onDrop,
    multiple: true,
    noClick: true,
    noKeyboard: true,
  });

  const removeImage = (image, ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    if (images.includes(image)) {
      const newImages = [...images];
      newImages.splice(newImages.indexOf(image, 1));
      setImages(newImages);
    }
  };

  return (
    <>
      <Container {...getRootProps({ isDragAccept, isFocused, isDragReject })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some images here</p>
        <Button type="button" className="btn" onClick={open}>
          Click to select images
        </Button>
      </Container>
      <Box>
        {images &&
          images.map((image) => (
            <div key={image.public_id}>
              <Image
                cloudName="dqvrktiam"
                publicId={image.public_id}
                width="250"
                height="250"
                crop="fill"
                key={image.public_id}
                style={{ margin: "10px" }}
              />
              <Remove onClick={(ev) => removeImage(image, ev)}>x</Remove>
            </div>
          ))}
      </Box>
    </>
  );
};
export default ItemsDropZone;

const Container = styled.div`
  width: 100%;
  background-color: var(--water-blue);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  z-index: 2;
`;

const Button = styled.button`
  border: none;
  background-color: var(--dark-blue);
  color: white;
  padding: 10px;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
  z-index: 2;
`;
const Box = styled.div`
  width: 100%;
  min-height: 450px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  z-index: 2;
  position: relative;
  background-color: #e3f1ff;
`;

const Remove = styled.button`
  border: none;
  background-color: var(--dark-blue);
  color: white;
  position: relative;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  top: -30px;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;
