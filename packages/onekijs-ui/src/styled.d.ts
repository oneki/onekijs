import 'styled-components';
import { Theme } from './styles/typings';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
