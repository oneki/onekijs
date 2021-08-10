import {
  AlignContentProperty,
  AlignItemsProperty,
  AlignSelfProperty,
  ColumnGapProperty,
  GapProperty,
  JustifyContentProperty,
  JustifySelfProperty,
  PlaceContentProperty,
  PlaceItemsProperty,
  PlaceSelfProperty,
  RowGapProperty,
} from 'csstype';
import { themeFormatter } from '../utils/formatter';
import { cssProperty, toCss } from '../utils/style';
import { CssProperty, SpacingPropertyTheme, TLength } from './typings';

// flex-start; center; flex-end; space-between; space-around;
export const alignContent = cssProperty<AlignContentProperty>('align-content');

// stretch; flex-start; center; flex-end; baseline;
export const alignItems = cssProperty<AlignItemsProperty>('align-items');

// auto; flex-start; center; flex-end; stretch;
export const alignSelf = cssProperty<AlignSelfProperty>('align-self');

// theme.spacings
export const columnGap: CssProperty<SpacingPropertyTheme | ColumnGapProperty<TLength>> = (value, variants = {}) => {
  return toCss('column-gap', themeFormatter('spacings'), value, variants).concat(
    toCss('grid-column-gap', themeFormatter('spacings'), value, variants),
  );
};

// theme.spacings
export const gap: CssProperty<SpacingPropertyTheme | GapProperty<TLength>> = (value, variants = {}) => {
  return toCss('gap', themeFormatter('spacings'), value, variants).concat(
    toCss('grid-gap', themeFormatter('spacings'), value, variants),
  );
};

// flex-start; center; flex-end; space-between; space-around;
export const justifyContent = cssProperty<JustifyContentProperty>('justify-content');

export const justifySelf = cssProperty<JustifySelfProperty>('justify-self');

export const placeContent = cssProperty<PlaceContentProperty>('place-content');

export const placeItems = cssProperty<PlaceItemsProperty>('place-items');

export const placeSelf = cssProperty<PlaceSelfProperty>('place-self');

// theme.spacings
export const rowGap: CssProperty<SpacingPropertyTheme | RowGapProperty<TLength>> = (value, variants = {}) => {
  return toCss('row-gap', themeFormatter('spacings'), value, variants).concat(
    toCss('grid-row-gap', themeFormatter('spacings'), value, variants),
  );
};
