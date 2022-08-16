import styled from "styled-components";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Image } from "cloudinary-react";
import { BiUpload } from "react-icons/bi";
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

  return (
    <ProfilePic {...getRootProps({ isDragAccept, isFocused, isDragReject })}>
      <input {...getInputProps()} />
      <p style={{ width: "70%" }}>Drag 'n' drop some files here</p>
      <Button type="button" className="btn" onClick={open}>
        <BiUpload style={{ width: "20px", height: "20px", color: "white" }} />
      </Button>
      {profilePic && (
        <Image
          cloudName="dqvrktiam"
          publicId={profilePic.public_id}
          width="300"
          height="300"
          crop="fill"
          style={{ borderRadius: "50%", position: "absolute" }}
        />
      )}
    </ProfilePic>
  );
};

export default ProfilePicture;

const ProfilePic = styled.div`
  min-height: 30px;
  min-width: 30px;
  height: 15vw;
  width: 15vw;
  background-color: var(--water-blue);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  position: relative;
  z-index: 5;
  top: 120px;
  left: 80px;
  padding: 10px;
  border-radius: 50%;
  border: none;
  background-color: var(--dark-blue);
  &:hover {
    cursor: pointer;
  }
`;
