import { DisplayProperty, ZoomProperty } from 'csstype';
import { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { cssProperty } from '../utils/style';
import { CssProperty, Formatter } from './typings';

// row; row-reverse; column; column-reverse
export const container: CssProperty<never> = () => {
  let result: FlattenInterpolation<ThemeProps<any>> = css`width: 100%'`;
  ['sm', 'md', 'lg', 'xl'].forEach((media) => {
    result = result.concat(css`
      ${(props) => `@media (min-width: ${props.theme.breakpoints[media]}) {
        max-width: ${props.theme.breakpoints[media]};
      }`}
    `);
  });
  return result;
};

// none; block; flow-root; inline-block; inline; flex; inline-flex; grid;
// inline-grid; table; table-caption; table-cell; table-column;
// table-column-group; table-footer-group; table-header-group; table-row;
export const display = cssProperty<DisplayProperty>('display');

// boolean
const visibleFormatter: Formatter<boolean> = (value) => (value ? 'visible' : 'hidden');
export const visibility = cssProperty<boolean>('visibility', visibleFormatter);

export const zoom = cssProperty<ZoomProperty>('zoom');
