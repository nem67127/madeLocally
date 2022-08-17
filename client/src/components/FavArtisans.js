import { useContext, useEffect } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import Loading from "./Loading";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const FavArtisans = () => {
  //get cyrrent user and show favourited artisans in array
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  //config cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dqvrktiam",
    },
  });

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

  const navigate = useNavigate();

  return (
    <Wrapper>
      {currentUser && currentUser.favArtisan ? (
        currentUser.favArtisan.map((art) => {
          const usersProfilePic = cld
            .image(`${art.artisan.profilePic}`)
            .resize(fill().width(150).height(150));

          return (
            <Container key={art.artisanId}>
              <ProfilePic>
                <AdvancedImage
                  cldImg={usersProfilePic}
                  style={{
                    borderRadius: "50%",
                  }}
                />
              </ProfilePic>

              <Box>
                <Name
                  onClick={(ev) => {
                    ev.stopPropagation();
                    ev.preventDefault();
                    navigate(`/profile/${art.artisanId}`);
                  }}
                >
                  {art.artisan.businessName}
                </Name>
                <h3>{art.artisan.businessDescrip}</h3>
              </Box>
            </Container>
          );
        })
      ) : (
        <div>Looks like you haven't favourited any artisans</div>
      )}
    </Wrapper>
  );
};

export default FavArtisans;

const Wrapper = styled.div`
  height: calc(100vh - 80px);
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--main-background-color);
`;

const Container = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  padding: 20px;
  border-radius: 10px;
  width: 60%;
  margin-bottom: 20px;
  background-color: white;
  margin: 20px;
  height: 25vh;
  display: flex;
  align-items: center;
  padding: 20px 50px;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  justify-content: center;
  height: 80%;
`;

const ProfilePic = styled.div``;

const Name = styled.h1`
  &:hover {
    cursor: pointer;
    color: var(--dark-blue);
  }
`;
