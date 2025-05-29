import { ComponentProps } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.darkGray};
  border: solid 1px ${({ theme }) => theme.colors.darkGray};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    border: solid 1px ${({ theme }) => theme.colors.secondary};
  }

  &:focus-visible {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 8px #2c4c3b99;
  }
`;

const BasicButton = (props: ComponentProps<'button'>) => (
  <StyledButton {...props}>{props.children}</StyledButton>
);

export default BasicButton;
