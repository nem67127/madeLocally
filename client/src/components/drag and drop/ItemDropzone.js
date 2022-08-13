import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import styled from "styled-components";
import ShowImage from "./ShowItems";

const ItemsDropZone = ({ images, setImages }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.map((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          setImages((prevState) => [
            ...prevState,
            { id: index, src: e.target.result },
          ]);
        };
        reader.readAsDataURL(file);
        return <div>file</div>;
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
      <ShowImage images={images} removeImage={removeImage} />
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
