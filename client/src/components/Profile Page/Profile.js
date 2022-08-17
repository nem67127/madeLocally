import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import ProfileDetails from "./ProfileDetails";
import Loading from "../Loading";
import { VscCircleFilled } from "react-icons/vsc";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import moment from "moment";
import { BsStar, BsStarFill } from "react-icons/bs";

const Profile = () => {
  const { profileId } = useParams();
  const [profiles, setProfiles] = useState(null);
  const [status, setStatus] = useState("loading");

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      fetch(`/api/users/${currentUser._id}`)
        .then((res) => res.json())
        .then((data) => {
          setCurrentUser(data.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  //config cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dqvrktiam",
    },
  });
  //turning images to cloudinary
  const usersProfilePic = profiles && cld.image(`${profiles.profilePic}`);
  usersProfilePic && usersProfilePic.resize(fill().width(300).height(300));

  const showcaseImgArr =
    profiles &&
    profiles.images &&
    profiles.images.map((image) => {
      return cld.image(`${image}`);
    });
  showcaseImgArr &&
    showcaseImgArr.map((image) => {
      return image.resize(fill().width(250).height(250));
    });

  const navigate = useNavigate();
  //need to create a patch to update user when clicking fav
  //then fetch
  const [favourite, setFavourite] = useState(
    currentUser &&
      currentUser.favArtisan &&
      currentUser.favArtisan.some((art) => {
        if (art.artisanId === profileId) {
          return true;
        }
        return false;
      })
  );
  //get user based on _id === profileId
  useEffect(() => {
    fetch(`/api/users/${profileId}`)
      .then((res) => res.json())
      .then((data) => {
        setProfiles(data.data);
        setStatus("idle");
      });
  }, [profileId]);
  //users are able to favourite them - goes to their favourited artisans page

  const handleFav = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();

    fetch(`/api/fav-artisan/${currentUser._id}`, {
      method: "PATCH",
      body: JSON.stringify({ artisan: profileId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200 && data.message === "removed") {
          setFavourite(false);
          console.log("remove");
        } else {
          setFavourite(true);
          console.log("set");
        }
      })
      .catch((err) => console.log(err));
  };

  //for upcoming events
  const dayBefore = moment().subtract(1, "days");

  if (status === "loading") {
    return <Loading />;
  }
  // users can rate them ?
  return (
    <Wrapper>
      <Main>
        <Container>
          <ProfilePic>
            {profiles.profilePic ? (
              <AdvancedImage
                cldImg={usersProfilePic}
                style={{
                  borderRadius: "50%",
                  border: "10px solid var(--water-blue)",
                }}
              />
            ) : null}
          </ProfilePic>

          <Div>
            <Fav>
              <Name>{profiles.businessName}</Name>
              {currentUser &&
              currentUser._id === profileId ? null : currentUser &&
                currentUser._id !== profileId ? (
                <Button
                  style={{ marginLeft: "50px" }}
                  onClick={(ev) => handleFav(ev)}
                >
                  {favourite ? (
                    <BsStarFill
                      style={{
                        width: "30px",
                        height: "30px",
                        color: "#ffdb7a",
                      }}
                    />
                  ) : (
                    <BsStar
                      style={{
                        width: "30px",
                        height: "30px",
                        color: "#ffdb7a",
                      }}
                    />
                  )}
                </Button>
              ) : null}
            </Fav>
            <Description>{profiles.businessDescrip}</Description>
            <Market>
              <div>Upcoming Events:</div>
              {profiles && profiles.vending && profiles.vending.length > 0 ? (
                profiles.vending.map((market) => {
                  if (
                    moment(market.ev.startDate).isSameOrAfter(dayBefore) ||
                    (market.ev.endDate &&
                      moment(market.ev.endDate).isSameOrAfter(dayBefore))
                  ) {
                    return (
                      <MDetails
                        key={market.eventId}
                        onClick={(ev) => {
                          ev.stopPropagation();
                          navigate(`/event/${market.eventId}`);
                        }}
                      >
                        | {market.ev.name} |
                      </MDetails>
                    );
                  }
                })
              ) : (
                <div style={{ marginLeft: "5px" }}>No upcoming events</div>
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
                ? showcaseImgArr.map((image) => (
                    <>
                      <AdvancedImage
                        cldImg={image}
                        style={{
                          margin: "10px",
                          border: "3px solid var(--water-blue)",
                          borderRadius: "10px",
                        }}
                        key={image}
                      />
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
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  padding-bottom: 20px;
  border-bottom: 5px solid var(--water-blue);
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 15vw;
`;
const Items = styled.div`
  margin-left: 20px;
  width: 70%;
  align-self: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  background-color: #e3f1ff;
  padding: 20px;
  border-radius: 10px;
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
  margin-top: 20px;
`;

const MDetails = styled.div`
  margin-left: 5px;
  &:hover {
    color: var(--dark-blue);
  }
`;

const Fav = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
`;
