import styled from 'styled-components';
import SelectPrimaryCurrency from './components/SelectPrimaryCurrency/SelectPrimaryCurrency';

// #region Styles

const Container = styled.div`
  padding: 50px;
`;

// #endregion

const OtherSettings = () => {
  return (
    <Container>
      <SelectPrimaryCurrency />
    </Container>
  );
};

export default OtherSettings;
