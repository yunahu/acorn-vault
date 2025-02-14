import styled from 'styled-components';

// #region Styles

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

// #endregion

const Dashboard = () => {
  const run = async () => {
    //TODO: delete, it is for testing the api
    const msg = await fetch('http://localhost:3000/accounts');
    if (msg) {
      const json = await msg.json();
      console.log(json);
    }
  };

  run();

  return <Container></Container>;
};

export default Dashboard;
