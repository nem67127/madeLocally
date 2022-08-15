import styled from "styled-components";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Image } from "cloudinary-react";

const ProfilePicture = ({ profilePic, setProfilePic }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const url = `https://api.cloudinary.com/v1_1/dqvrktiam/upload`;

    acceptedFiles.forEach(async (acceptedFile) => {
      const formData = new FormData();
      formData.append("file", acceptedFile);
      formData.append("upload_preset", "gx7mguox");
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setProfilePic(data);
      console.log(data);
    });
  }, []);
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
    multiple: false,
    noClick: true,
    noKeyboard: true,
  });
  console.log(profilePic);
  return (
    <ProfilePic {...getRootProps({ isDragAccept, isFocused, isDragReject })}>
      <input {...getInputProps()} />
      <p style={{ width: "70%" }}>Drag 'n' drop some files here</p>
      <button type="button" className="btn" onClick={open}>
        Click to select file
      </button>
      {profilePic && (
        <Image
          cloudName="dqvrktiam"
          publicId={profilePic.public_id}
          width="300"
          crop="fill"
        />
      )}
    </ProfilePic>
  );
};

export default ProfilePicture;
// add styling to p and button
const ProfilePic = styled.div`
  min-height: 30px;
  min-width: 30px;
  height: 15vw;
  width: 15vw;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.div`
  position: absolute;
  min-height: 30px;
  min-width: 30px;
  height: 15vw;
  width: 15vw;
  border-radius: 50%;
`;
