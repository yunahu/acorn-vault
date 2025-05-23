import styled from 'styled-components';
import { ComponentProps } from 'react';

// #region Styles

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  padding: 5%;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

// #endregion

const PageWrapper = (props: ComponentProps<'div'>) => <Container {...props} />;

export default PageWrapper;
