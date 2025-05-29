import styled from 'styled-components';
import { useAccount } from 'wagmi';
import PageWrapper from 'src/components/layouts/PageWrapper/PageWrapper';
import CoinGeckoAttritution from './components/CoinGeckoAttritution/CoinGeckoAttritution';
import ConnectWallet from './components/ConnectWallet/ConnectWallet';
import CryptoDetails from './components/CryptoDetails/CryptoDetails';
import CryptoProfile from './components/CryptoProfile/CryptoProfile';

// #region Styles

const StyledPageWrapper = styled(PageWrapper)`
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  gap: 20px;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: start;
  }
`;

// #endregion

const Cryptocurrency = () => {
  const { isConnected } = useAccount();

  return isConnected ? (
    <StyledPageWrapper>
      <Container>
        <CryptoProfile />
        <CoinGeckoAttritution />
      </Container>
      <CryptoDetails />
    </StyledPageWrapper>
  ) : (
    <ConnectWallet />
  );
};

export default Cryptocurrency;
