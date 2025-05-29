import { ComponentProps } from 'react';
import styled from 'styled-components';

// #region Styles

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  min-width: fit-content;
  padding-left: calc(
    (100vw - ${({ theme }) => theme.sizes.pageWidth}) / 2 -
      (${({ theme }) => theme.sizes.sidebarWidth})
  );
`;

const Content = styled.div`
  max-width: ${({ theme }) => theme.sizes.breakpoint};
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 40px 40px 60px 40px;
  width: 100%;

  @media only screen and (max-width: ${({ theme }) => theme.sizes.breakpoint}) {
    padding: 25px 15px;
  }
`;

// #endregion

const PageWrapper = ({ children, ...rest }: ComponentProps<'div'>) => (
  <Container {...rest}>
    <Content>{children}</Content>
  </Container>
);

export default PageWrapper;
