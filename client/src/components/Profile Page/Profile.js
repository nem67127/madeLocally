import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import ProfileDetails from "./ProfileDetails";

const Profile = () => {
  const { profileId } = useParams();
  const [profiles, setProfiles] = useState(null);
  const [status, setStatus] = useState("loading");
  //get user based on _id === profileId
  useEffect(() => {
    fetch(`/api/users/${profileId}`)
      .then((res) => res.json())
      .then((data) => {
        setProfiles(data.data);
        setStatus("idle");
      });
  }, [profileId]);

  if (status === "loading") {
    return <div>Loading</div>;
  }

  console.log(profiles);

  //where user will get linked to if they click on an artisan on the event page, event details, map
  //users are able to favourite them - goes to their favourited artisans page - toDo
  // users can rate them ?
  return (
    <Wrapper>
      <Main>
        <Container>
          <ProfilePic>
            {profiles.profilePic ? (
              <Img alt="profile picture" src={profiles.profilePic.src} />
            ) : (
              <></>
            )}
          </ProfilePic>

          <Div>
            <Name>{profiles.businessName}</Name>
            <Description>{profiles.businessDescrip}</Description>
            <div>Upcoming Events:</div>
          </Div>
        </Container>
        <Container2>
          <Info>
            <ProfileDetails profiles={profiles} />

            {profiles.categories ? (
              profiles.categories.length > 0 ? (
                profiles.categories.map((category) => (
                  <>
                    <div>Categories</div>
                    <div key={`${category}`}>{category}</div>
                  </>
                ))
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </Info>
          <Items>
            {profiles.images ? (
              profiles.images.length > 0 ? (
                profiles.images.map((image) => (
                  <>
                    <img alt="showcase" src={image.src} />
                  </>
                ))
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </Items>
        </Container2>
      </Main>
    </Wrapper>
  );
};
export default Profile;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Main = styled.form`
  height: 100%;
  width: 80%;
  padding: 20px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
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

const Name = styled.div`
  font-size: 5vh;
`;
const Description = styled.div`
  margin: 10px 0;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  width: 70%;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const Items = styled.div`
  margin-left: 20px;
  height: 45vh;
  width: 70%;
  align-self: flex-start;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 20vh;
  margin-left: 50px;
`;

const Container2 = styled.div`
  display: flex;
  margin-bottom: 30px;
  width: 70%;
`;
