import { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Loading from "../Loading";
import MiniEvent from "./MiniEvent";

const IntEvents = () => {
  //get current user and show events in interested events array
  const { currentUser } = useContext(CurrentUserContext);

  if (!currentUser) {
    return <Loading />;
  }
  return (
    <Wrapper>
      {currentUser.interestEvents ? (
        currentUser.interestEvents.map((market) => {
          return (
            <MiniEvent
              market={market}
              currentUser={currentUser}
              key={market._id}
            />
          );
        })
      ) : (
        <div>You have no Events that you're interested in.</div>
      )}
    </Wrapper>
  );
};

export default IntEvents;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 80px);
  background-color: var(--main-background-color);
`;
