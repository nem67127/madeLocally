import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import styled from "styled-components";
import ShowImage from "./ShowItems";

const ItemsDropZone = () => {
  //for drag and drop of item images
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file, index) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          { id: index, src: e.target.result },
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

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

  const onSubmit = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
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
      <button onClick={(ev) => onSubmit(ev)}>Save</button>
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
