import { Property } from 'csstype';
import { css } from 'styled-components';
import { cssProperty } from '../utils/style';
import { BreakpointKeys, CssProperty, Formatter } from './typings';

// row; row-reverse; column; column-reverse
export const container: CssProperty<never> = () => {
  let result = css`
    width: 100%';
    ${(props) => (
      (['sm', 'md', 'lg', 'xl'] as BreakpointKeys[]).map((media) => {
        return `@media (min-width: ${props.theme.breakpoints[media]}) {
          max-width: ${props.theme.breakpoints[media]};
        }`
      }).join(';')
    )}
  `;
  ;
  return result;
};

// none; block; flow-root; inline-block; inline; flex; inline-flex; grid;
// inline-grid; table; table-caption; table-cell; table-column;
// table-column-group; table-footer-group; table-header-group; table-row;
export const display = cssProperty<Property.Display>('display');

// boolean
const visibleFormatter: Formatter<boolean> = (value) => (value ? 'visible' : 'hidden');
export const visibility = cssProperty<boolean>('visibility', visibleFormatter);

export const zoom = cssProperty<Property.Zoom>('zoom');
