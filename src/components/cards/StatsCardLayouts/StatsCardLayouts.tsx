import styled from 'styled-components';

export const Body = styled.div`
  display: flex;
  gap: 25px;

  @media only screen and (max-width: 555px) {
    flex-direction: column;
  }
`;

export const ChartContainer = styled.div`
  width: 200px;
  height: 200px;
`;

export const List = styled.div`
  display: flex;
  gap: 25px;
  flex-direction: column;
`;

export const RowContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

export const AmountContainer = styled.div`
  font-size: 20px;
  display: flex;
  align-items: end;
  gap: 15px;
`;

export const Unassigned = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 14px;
  display: flex;
  align-items: end;
  gap: 18px;
`;

export const Amount = styled.div<{ $negative?: boolean }>`
  min-width: fit-content;
  color: ${({ theme, $negative }) =>
    $negative ? theme.colors.negative : theme.colors.positive};
`;

export const Conversion = styled.div`
  color: #615d5d;
  display: flex;
  font-size: 14px;
`;

export const Total = styled.div`
  font-size: 16px;
  margin: 15px 0px 10px 0px;
  color: ${({ theme }) => theme.colors.secondary};
`;
