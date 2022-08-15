import styled from "styled-components";
// import { useCallback } from "react";
// import { useDropzone } from "react-dropzone";

const ProfilePicture = ({ profilePic, setProfilePic }) => {
  // const onDrop = useCallback(
  //   (acceptedFiles) => {
  //     acceptedFiles.map((file, index) => {
  //       const reader = new FileReader();
  //       reader.onload = function (e) {
  //         setProfilePic({ id: index, src: e.target.result });
  //       };
  //       reader.readAsDataURL(file);
  //       return file;
  //     });
  //   },
  //   [setProfilePic]
  // );
  // const {
  //   getRootProps,
  //   getInputProps,
  //   open,
  //   isDragAccept,
  //   isFocused,
  //   isDragReject,
  // } = useDropzone({
  //   accept: "image/*",
  //   onDrop,
  //   noClick: true,
  //   noKeyboard: true,
  // });
  return (
    // <ProfilePic {...getRootProps({ isDragAccept, isFocused, isDragReject })}>
    //   <input {...getInputProps()} />
    //   <p style={{ width: "70%" }}>Drag 'n' drop some files here</p>
    //   <button type="button" className="btn" onClick={open}>
    //     Click to select file
    //   </button>
    //   {profilePic && <Img alt="" src={`${profilePic.src}`} />}
    // </ProfilePic>
    <ProfilePic>
      <input type="file" />
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

const Img = styled.img`
  position: absolute;
  min-height: 30px;
  min-width: 30px;
  height: 15vw;
  width: 15vw;
  border-radius: 50%;
`;
