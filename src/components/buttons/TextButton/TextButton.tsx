import styled from 'styled-components';

const TextButton = styled.button`
  border: none;
  background-color: inherit;
  color: ${({ theme }) => theme.colors.blue};

  &:focus-visible {
    outline: 2px solid green;
    outline-offset: 2px;
  }
`;

export default TextButton;
