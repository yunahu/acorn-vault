import 'styled-components';
import colors from './colors';

export type Theme = typeof theme;

const theme = {
  colors,
};

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export default theme;
