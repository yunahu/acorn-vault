import styled from 'styled-components';
import { useAccount } from 'wagmi';
import PageWrapper from 'src/components/layouts/PageWrapper/PageWrapper';
import CryptoProfile from './components/CryptoProfile/CryptoProfile';
import CryptoDetails from './components/CryptoDetails/CryptoDetails';
import ConnectWallet from './components/ConnectWallet/ConnectWallet';

// #region Styles

const StyledPageWrapper = styled(PageWrapper)`
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

// #endregion

const CryptoCurrency = () => {
  const { isConnected } = useAccount();

  return isConnected ? (
    <StyledPageWrapper>
      <CryptoProfile />
      <CryptoDetails />
    </StyledPageWrapper>
  ) : (
    <ConnectWallet />
  );
};

export default CryptoCurrency;
