import {
  BottomProperty,
  BoxSizingProperty,
  ClearProperty,
  DisplayProperty,
  FloatProperty,
  LeftProperty,
  ObjectFitProperty,
  ObjectPositionProperty,
  OverflowProperty,
  OverflowXProperty,
  OverflowYProperty,
  PositionProperty,
  RightProperty,
  TopProperty,
} from 'csstype';
import { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { cssProperty } from '../utils/style';
import { CssProperty, Formatter, TLength } from './typings';

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

// border-box; content-box;
export const boxSizing = cssProperty<BoxSizingProperty>('box-sizing');

// none; block; flow-root; inline-block; inline; flex; inline-flex; grid;
// inline-grid; table; table-caption; table-cell; table-column;
// table-column-group; table-footer-group; table-header-group; table-row;
export const display = cssProperty<DisplayProperty>('display');

// right; left; none;
export const float = cssProperty<FloatProperty>('float');

// left; right; both; none;
export const clear = cssProperty<ClearProperty>('clear');

// contain; cover; fill; none; scale-down;
export const objectFit = cssProperty<ObjectFitProperty>('object-fit');

// bottom; center; left; right; top; left-bottom; right-bottom; left-top; right-top;
export const objectPosition = cssProperty<ObjectPositionProperty<TLength>>('object-position');

// auto; hidden; visible; scroll;
export const overflow = cssProperty<OverflowProperty>('overflow');

// auto; hidden; visible; scroll;
export const overflowX = cssProperty<OverflowXProperty>('overflow-x');

// auto; hidden; visible; scroll;
export const overflowY = cssProperty<OverflowYProperty>('overflow-y');

// static; fixed; absolute; relative; sticky;
export const position = cssProperty<PositionProperty>('position');

// integer
export const top = cssProperty<TopProperty<TLength>>('top');

// integer
export const bottom = cssProperty<BottomProperty<TLength>>('bottom');

// integer
export const right = cssProperty<RightProperty<TLength>>('right');

// integer
export const left = cssProperty<LeftProperty<TLength>>('left');

// boolean
const visibleFormatter: Formatter<boolean> = (value) => (value ? 'visible' : 'hidden');
export const visibility = cssProperty<boolean>('visibility', visibleFormatter);

// auto or integer
export const zIndex = cssProperty('z-index');
