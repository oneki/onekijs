import type { Theme } from 'onekijs-ui';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
