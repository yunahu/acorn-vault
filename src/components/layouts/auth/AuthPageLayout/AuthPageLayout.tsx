import { ComponentProps } from 'react';
import styled from 'styled-components';
import Card from 'src/components/cards/Card/Card';

// #region Styles

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex: 1;
`;

const Main = styled.div<{ $image: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 30px;

  @media only screen and (max-width: ${({ theme }) => theme.sizes.breakpoint}) {
    background-image: url(${({ $image }) => $image});
    background-size: cover;
    padding: 25px 15px;
  }

  @media only screen and (max-width: 650px) {
    background-image: none;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 40px;

  @media only screen and (max-width: ${({ theme }) => theme.sizes.breakpoint}) {
    font-size: 35px;
  }
`;

const SidePhoto = styled.div<{ $image: string }>`
  background-image: url(${(props) => props.$image});
  background-size: cover;
  width: 40%;

  @media only screen and (max-width: ${({ theme }) => theme.sizes.breakpoint}) {
    display: none;
  }
`;

// #endregion

interface AuthCardLayoutProps extends ComponentProps<'div'> {
  image: string;
  title?: string;
}

const AuthPageLayout = ({ image, title, children }: AuthCardLayoutProps) => {
  return (
    <Container>
      <Main $image={image}>
        <Card $fullWidth $round>
          <Title>{title}</Title>
          {children}
        </Card>
      </Main>
      <SidePhoto $image={image} />
    </Container>
  );
};

export default AuthPageLayout;
