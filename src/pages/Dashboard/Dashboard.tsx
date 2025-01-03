import styled from "styled-components";

// #region Styles

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

// #endregion

const Dashboard = () => {
  return <Container></Container>;
};

export default Dashboard;
