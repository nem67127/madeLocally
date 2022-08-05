import styled from "styled-components";

const HomePage = () => {
  //not sure how to implement search bar function
  //popup for address
  return (
    <Wrapper>
      <Map>Map</Map>
    </Wrapper>
  );
};

export default HomePage;
const Wrapper = styled.div`
  height: calc(100vh - 50px);
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Map = styled.div`
  height: 70%;
  width: 80%;
  border: 2px solid blue;
`;
