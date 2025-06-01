import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Spinner from 'src/components/spinners/Spinner/Spinners';
import NoData from './components/NoData/NoData';

export interface CardProps extends PropsWithChildren {
  $fullWidth?: boolean;
  $gap?: string;
  $isLoading?: boolean;
  $round?: boolean;
  isNoData?: boolean;
  title?: string;
}

// #region Styles

const Container = styled.div<CardProps>`
  border: solid 0.5px ${({ theme }) => theme.colors.border};
  background-color: ${({ $isLoading }) => ($isLoading ? '#fefefe' : 'white')};
  border-radius: ${({ $round }) => ($round ? '25px' : '8px')};
  ${({ $fullWidth }) =>
    !$fullWidth && 'min-width: 170px; min-height: 95px; width: fit-content;'}
  ${({ $isLoading }) =>
    $isLoading &&
    'display: flex; justify-content: center; align-items: center;'}
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const Main = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $fullWidth }) => ($fullWidth ? '25px' : '0px')};
  padding: ${({ $fullWidth }) => ($fullWidth ? '40px' : '20px')};

  @media only screen and (max-width: ${({ theme }) => theme.sizes.breakpoint}) {
    padding: 20px;
    gap: 15px;
  }
`;

// #endregion

const Card = (props: CardProps) => {
  const { $fullWidth, $isLoading, $round, children, isNoData, title, ...rest } =
    props;
  return (
    <Container
      {...rest}
      $fullWidth={$fullWidth}
      $isLoading={$isLoading}
      $round={$round}
    >
      {$isLoading ? (
        <Spinner />
      ) : (
        <Main $fullWidth={$fullWidth}>
          {title && <Title>{title}</Title>}
          {isNoData ? <NoData /> : children}
        </Main>
      )}
    </Container>
  );
};

export default Card;
