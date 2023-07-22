import { Theme } from 'onekijs-ui';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
