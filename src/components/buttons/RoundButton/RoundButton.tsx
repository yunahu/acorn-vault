import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentProps } from 'react';
import styled from 'styled-components';

// #region Styles

const StyledButton = styled.button<RoundButtonProps>`
  width: 100%;
  height: ${({ $small }) => ($small ? '44px' : '56px')};
  font-size: ${({ $small }) => ($small ? '18px' : '20px')};
  background-color: ${({ $bg }) => $bg ?? 'white'};
  border: ${(props) =>
    props.$bg ? 'none' : `solid 1px ${props.theme.colors.secondary}`};
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${({ $color }) => $color ?? 'black'};
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const StyledFrontAwesomeIcon = styled(FontAwesomeIcon)`
  width: 24px;
  height: 24px;
`;

// #endregion

interface RoundButtonProps extends ComponentProps<'button'> {
  iconSrc?: string;
  FWicon?: IconDefinition;
  $bg?: string;
  $color?: string;
  $small?: boolean;
}

const RoundButton = ({
  children,
  iconSrc,
  FWicon,
  ...rest
}: RoundButtonProps) => (
  <StyledButton {...rest}>
    {iconSrc !== undefined && <Icon src={iconSrc} />}
    {FWicon !== undefined && <StyledFrontAwesomeIcon icon={FWicon} />}
    {children}
  </StyledButton>
);

export default RoundButton;
