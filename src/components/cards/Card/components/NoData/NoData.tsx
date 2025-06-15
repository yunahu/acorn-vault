import { faChartColumn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  padding-left: 5px;
  gap: 10px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const StyledIcon = styled(FontAwesomeIcon)`
  width: 18px;
  height: 18px;
`;

const NoDataMessage = () => (
  <Container>
    <StyledIcon icon={faChartColumn} />
    No Data
  </Container>
);

export default NoDataMessage;
