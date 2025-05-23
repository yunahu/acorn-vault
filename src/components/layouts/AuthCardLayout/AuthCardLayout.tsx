import styled from 'styled-components';
import { ComponentProps } from 'react';
import Card from 'src/components/cards/Card/Card';

// #region Styles

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex: 1;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Title = styled.div`
  text-align: center;
  font-size: 40px;
`;

const SidePhoto = styled.div<{ $image: string }>`
  background-image: url(${(props) => props.$image});
  background-size: cover;
  width: 40%;
`;

// #endregion

interface AuthCardLayoutProps extends ComponentProps<'div'> {
  image: string;
  title?: string;
}

const AuthCardLayout = ({ image, title, children }: AuthCardLayoutProps) => {
  return (
    <Container>
      <Main>
        <Card $fullWidth $round>
          <Title>{title}</Title>
          {children}
        </Card>
      </Main>
      <SidePhoto $image={image} />
    </Container>
  );
};

export default AuthCardLayout;
