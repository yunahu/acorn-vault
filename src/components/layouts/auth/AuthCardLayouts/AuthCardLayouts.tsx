import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const InputHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledLabel = styled.label`
  height: 27px;
`;

export const StyledInput = styled.input`
  width: calc(100vw - 90px);
  max-width: 480px;
  min-width: 305px;
  height: 56px;
  border-radius: 12px;
  padding: 0px 15px;
  font-size: 17px;

  &::placeholder {
    color: #b1b2b0;
  }
`;

export const PasswordToggle = styled.div`
  width: 70px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ForgotPasswordLink = styled.div`
  text-decoration: underline;
  cursor: pointer;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const SignUpLink = styled(Link)`
  text-decoration: underline;
`;

export const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin: 5px 0px;
`;
