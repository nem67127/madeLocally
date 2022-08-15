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
    acceptedFiles,
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

  //does not work for some reason
  const removeImage = (image) => {
    if (acceptedFiles.includes(image)) {
      const newImages = [...acceptedFiles];
      newImages.splice(newImages.indexOf(image, 1));
      setImages(newImages);
    }
  };

  return (
    <>
      <Container {...getRootProps({ isDragAccept, isFocused, isDragReject })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here</p>
        <button type="button" className="btn" onClick={open}>
          Click to select file
        </button>
      </Container>
      <Box>
        {images &&
          images.map((image) => (
            <Div>
              <Image
                cloudName="dqvrktiam"
                publicId={image.public_id}
                width="300"
                crop="fill"
                key={image.public_id}
              />
            </Div>
          ))}
      </Box>
    </>
  );
};
export default ItemsDropZone;

const Container = styled.div`
  width: 100%;
  border: 1px solid green;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;
const Div = styled.div`
  width: 40%;
  margin: 10px;
`;
const Box = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
