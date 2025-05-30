import styled from 'styled-components';
import { useConnect } from 'wagmi';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import AuthPageLayout from 'src/components/layouts/auth/AuthPageLayout/AuthPageLayout';
import RoundButton from 'src/components/buttons/RoundButton/RoundButton';
import metamask from 'src/assets/icons/metamask.svg';
import coastline from 'src/assets/images/coastline.webp';

// #region Styles

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 400px;
`;

// #endregion

const ConnectWallet = () => {
  const { connectors, connect } = useConnect();

  return (
    <AuthPageLayout image={coastline} title="Connect a wallet">
      <Options>
        {connectors.map((connector) => {
          const imageProp =
            connector.name === 'MetaMask'
              ? { iconSrc: metamask }
              : { FWicon: faWallet };
          return (
            <RoundButton
              key={connector.uid}
              onClick={() => connect({ connector })}
              {...imageProp}
            >
              Connect with {connector.name}
            </RoundButton>
          );
        })}
      </Options>
    </AuthPageLayout>
  );
};

export default ConnectWallet;
