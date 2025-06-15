import styled from 'styled-components';
import { useAccount, useDisconnect, useEnsName } from 'wagmi';
import cryptoWallet from 'src/assets/images/cryptoWallet.jpg';
import RoundButton from 'src/components/buttons/RoundButton/RoundButton';
import Card from 'src/components/cards/Card/Card';

// #region Styles

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledCard = styled(Card)`
  flex-direction: row;
  gap: 30px;

  @media only screen and (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
`;

const Address = styled.div`
  font-size: 13px;
`;

const StyledImg = styled.img`
  width: 170px;
  border-radius: 8px;

  @media only screen and (max-width: 640px) {
    width: 300px;
  }
`;

// #endregion

const CryptoProfile = () => {
  const { address } = useAccount();
  const { data, error, isLoading, isError } = useEnsName({ address });
  const { disconnect } = useDisconnect();

  if (isError) console.error(error.message);

  return (
    <StyledCard $isLoading={isLoading}>
      <StyledImg src={cryptoWallet} />
      <Container>
        <List>
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
        </List>
        <RoundButton $small onClick={() => disconnect()}>
          Disconnect the wallet
        </RoundButton>
      </Container>
    </StyledCard>
  );
};

export default CryptoProfile;
