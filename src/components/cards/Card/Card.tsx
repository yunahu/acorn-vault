import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import Spin from 'src/components/Spin/Spin';

// #region Styles

const Container = styled.div<CardProps>`
  border: solid 0.5px ${({ theme }) => theme.colors.border};
  background-color: ${({ $isLoading }) => ($isLoading ? '#fefefe' : 'white')};
  border-radius: ${({ $round }) => ($round ? '25px' : '8px')};
  ${({ $fullWidth }) =>
    !$fullWidth && 'min-width: 170px; min-height: 95px; width: fit-content;'}
  ${({ $fullHeight }) => !$fullHeight && 'height: fit-content;'}
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const Main = styled.div<{
  $gap?: string;
  $fullWidth?: boolean;
}>`
  display: flex;
  flex-direction: column;
  padding: ${({ $fullWidth }) => ($fullWidth ? '40px' : '20px')};
  gap: ${({ $gap, $fullWidth }) => ($gap ? $gap : $fullWidth ? '25px' : '0px')};
`;

// #endregion

interface CardProps extends PropsWithChildren {
  title?: string;
  $isLoading?: boolean;
  $gap?: string;
  $round?: boolean;
  $fullWidth?: boolean;
  $fullHeight?: boolean;
}

const Card = (props: CardProps) => {
  const { children, title, $isLoading } = props;
  return (
    <Container {...props}>
      {$isLoading ? (
        <Spin />
      ) : (
        <Main {...props}>
          {title && <Title>{title}</Title>}
          {children}
        </Main>
      )}
    </Container>
  );
};

export default Card;
