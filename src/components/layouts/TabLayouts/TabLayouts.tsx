import styled from 'styled-components';
import { ComponentProps } from 'react';

// #region Styles

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 50px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

const StyledLabel = styled.label`
  height: 27px;
`;

// #endregion

export const TabContainer = ({ children }: ComponentProps<'div'>) => (
  <TabWrapper>{children}</TabWrapper>
);

export const ItemContainer = ({ children }: ComponentProps<'div'>) => (
  <ItemWrapper>{children}</ItemWrapper>
);

export const ItemLabel = ({ children }: ComponentProps<'label'>) => (
  <StyledLabel>{children}</StyledLabel>
);
