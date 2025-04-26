import styled from 'styled-components';
import { ComponentProps } from 'react';

const StyledButton = styled.button`
  border: none;
  background-color: inherit;
  color: ${({ theme }) => theme.colors.blue};

  &:focus-visible {
    outline: 2px solid green;
    outline-offset: 2px;
  }
`;

const TextButton = (props: ComponentProps<'button'>) => (
  <StyledButton {...props}>{props.children}</StyledButton>
);

export default TextButton;
