import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import ProfileDetails from "./ProfileDetails";
import Loading from "../Loading";
import { VscCircleFilled } from "react-icons/vsc";

const Profile = () => {
  const { profileId } = useParams();
  const [profiles, setProfiles] = useState(null);
  const [status, setStatus] = useState("loading");

  const navigate = useNavigate();
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
    return <Loading />;
  }

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
            ) : null}
          </ProfilePic>

          <Div>
            <Name>{profiles.businessName}</Name>
            <Description>{profiles.businessDescrip}</Description>
            <Market>
              <div>Upcoming Events:</div>
              {profiles && profiles.vending && profiles.vending.length > 0 ? (
                profiles.vending.map((market) => {
                  // check if upcoming
                  return (
                    <MDetails
                      key={market.eventId}
                      onClick={(ev) => {
                        ev.stopPropagation();
                        navigate(`/event/${market.eventId}`);
                      }}
                    >
                      {market.ev.name}
                    </MDetails>
                  );
                })
              ) : (
                <div>No upcoming events</div>
              )}
            </Market>
          </Div>
        </Container>
        <Container2>
          <Info>
            <ProfileDetails profiles={profiles} />
            <div>Categories</div>
            {profiles.categories
              ? profiles.categories.length > 0
                ? profiles.categories.map((category) => (
                    <Market key={category}>
                      <VscCircleFilled />
                      <span>{category}</span>
                    </Market>
                  ))
                : null
              : null}
          </Info>
          <Items>
            {profiles.images
              ? profiles.images.length > 0
                ? profiles.images.map((image) => (
                    <>
                      <img alt="showcase" src={image.src} key={image.src} />
                    </>
                  ))
                : null
              : null}
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
  min-height: calc(100vh - 80px);
  background-color: var(--main-background-color);
`;
const Main = styled.div`
  height: 100%;
  width: 80%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
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
const Market = styled.div`
  display: flex;
  align-items: center;
`;

const MDetails = styled.div`
  margin-left: 5px;
`;
