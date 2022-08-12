import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color={`var(--dark-blue)`}
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
    </Wrapper>
  );
};
export default Loading;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
