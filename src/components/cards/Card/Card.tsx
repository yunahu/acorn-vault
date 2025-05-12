import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import Spin from 'src/components/Spin/Spin';

// #region Styles

const Container = styled.div<{ $loading?: boolean }>`
  min-width: 170px;
  min-height: 95px;
  width: fit-content;
  border-radius: 8px;
  border: solid 0.5px ${({ theme }) => theme.colors.border};
  background-color: ${({ $loading }) => ($loading ? '#fefefe' : 'white')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

// #endregion

interface CardProps extends PropsWithChildren {
  title?: string;
  $loading?: boolean;
}

const Card = ({ children, title, $loading, ...props }: CardProps) => {
  return (
    <Container {...props} $loading={$loading}>
      {$loading ? (
        <Spin />
      ) : (
        <Wrapper>
          {title && <Title>{title}</Title>}
          {children}
        </Wrapper>
      )}
    </Container>
  );
};

export default Card;
