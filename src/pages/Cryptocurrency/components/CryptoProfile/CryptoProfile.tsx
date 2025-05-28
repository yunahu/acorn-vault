import styled from 'styled-components';
import { useAccount, useDisconnect, useEnsName } from 'wagmi';
import RoundButton from 'src/components/buttons/RoundButton/RoundButton';
import Card from 'src/components/cards/Card/Card';
import cryptoWallet from 'src/assets/images/cryptoWallet.jpg';

// #region Styles

const StyledCard = styled(Card)`
  align-items: center;
  gap: 35px;
  min-width: fit-content;
`;

const ItemContainer = styled.div`
  width: 100%;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const Address = styled.div`
  font-size: 13px;
`;

const StyledImg = styled.img`
  width: 300px;
  border-radius: 8px;
`;

// #endregion

const CryptoProfile = () => {
  const { address } = useAccount();
  const { data, error, status } = useEnsName({ address });
  const { disconnect } = useDisconnect();

  if (status === 'error') console.error(error.message);

  return (
    <StyledCard $isLoading={status === 'pending'}>
      <StyledImg src={cryptoWallet} />
      {Boolean(data) && (
        <ItemContainer>
          <Label>ENS NAME:</Label>
          <div>{data}</div>
        </ItemContainer>
      )}
      <ItemContainer>
        <Label>ADDRESS :</Label>
        <Address>{address}</Address>
      </ItemContainer>
      <RoundButton $small onClick={() => disconnect()}>
        Disconnect the wallet
      </RoundButton>
    </StyledCard>
  );
};

export default CryptoProfile;
