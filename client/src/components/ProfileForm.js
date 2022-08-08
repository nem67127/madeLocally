import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

const ProfileForm = () => {
  //This is where artisans are directed to if they are new to the site to set up their profile
  const { profileId } = useParams();
  const { currentUser } = useContext(CurrentUserContext);
  //need to create a patch that will update made on profileid = objectId
  return <Wrapper></Wrapper>;
};

export default ProfileForm;

const Wrapper = styled.div`
  height: calc(100vh - 50px);
`;
