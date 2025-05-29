import 'styled-components';
import colors from './colors';
import sizes from './sizes';

export type Theme = typeof theme;

const theme = {
  colors,
  sizes,
};

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export default theme;
