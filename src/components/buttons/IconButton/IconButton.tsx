import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentProps } from 'react';
import styled from 'styled-components';

interface Props extends ComponentProps<'button'> {
  icon: IconDefinition;
  $iconSize?: number;
  $containerSize?: number;
  $color?: string;
}

// #region Styles

const Container = styled.button<{ $containerSize?: number; $color?: string }>`
  width: ${({ $containerSize }) =>
    $containerSize ? `${$containerSize}px` : '40px'};
  height: ${({ $containerSize }) =>
    $containerSize ? `${$containerSize}px` : '40px'};
  background-color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $color, theme }) => ($color ? $color : theme.colors.gray)};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Icon = styled(FontAwesomeIcon)<{ $iconSize?: number }>`
  font-size: ${({ $iconSize }) => ($iconSize ? `${$iconSize}px` : '26px')};
`;

// #endregion

const IconButton = ({ icon, $iconSize, ...rest }: Props) => {
  return (
    <Container {...rest}>
      <Icon icon={icon} $iconSize={$iconSize} />
    </Container>
  );
};

export default IconButton;
