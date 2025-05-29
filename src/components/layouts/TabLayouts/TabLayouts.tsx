import { ComponentProps } from 'react';
import styled from 'styled-components';

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
  max-width: 300px;
`;

const StyledLabel = styled.label`
  height: 27px;
`;

// #endregion

export const TabContainer = (props: ComponentProps<'div'>) => (
  <TabWrapper {...props} />
);

export const ItemContainer = (props: ComponentProps<'div'>) => (
  <ItemWrapper {...props} />
);

export const ItemLabel = (props: ComponentProps<'label'>) => (
  <StyledLabel {...props} />
);
