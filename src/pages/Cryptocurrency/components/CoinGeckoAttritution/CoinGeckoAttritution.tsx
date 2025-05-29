import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from 'src/assets/icons/coinGecko.png';

const StyledLink = styled(Link)`
  height: fit-content;
`;

const StyledImg = styled.img`
  width: 260px;
  border: solid 0.5px ${({ theme }) => theme.colors.border};
  border-radius: 8px;
`;

const CoinGeckoAttritution = () => {
  return (
    <StyledLink
      to="https://www.coingecko.com/en/api"
      target="_blank"
      rel="noopener noreferrer"
    >
      <StyledImg src={logo} />
    </StyledLink>
  );
};

export default CoinGeckoAttritution;
