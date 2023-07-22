import { Property } from 'csstype';
import { themeFormatter } from '../utils/formatter';
import { cssProperty, toCss } from '../utils/style';
import { CssProperty, SpacingPropertyTheme, TLength } from './typings';

// flex-start; center; flex-end; space-between; space-around;
export const alignContent = cssProperty<Property.AlignContent>('align-content');

// stretch; flex-start; center; flex-end; baseline;
export const alignItems = cssProperty<Property.AlignItems>('align-items');

// auto; flex-start; center; flex-end; stretch;
export const alignSelf = cssProperty<Property.AlignSelf>('align-self');

// theme.spacings
export const columnGap: CssProperty<SpacingPropertyTheme | Property.ColumnGap<TLength>> = (value, variants = {}) => {
  return toCss('column-gap', themeFormatter('spacings'), value, variants).concat(
    toCss('grid-column-gap', themeFormatter('spacings'), value, variants),
  );
};

// theme.spacings
export const gap: CssProperty<SpacingPropertyTheme | Property.Gap<TLength>> = (value, variants = {}) => {
  return toCss('gap', themeFormatter('spacings'), value, variants).concat(
    toCss('grid-gap', themeFormatter('spacings'), value, variants),
  );
};

// flex-start; center; flex-end; space-between; space-around;
export const justifyContent = cssProperty<Property.JustifyContent>('justify-content');

export const justifySelf = cssProperty<Property.JustifySelf>('justify-self');

export const placeContent = cssProperty<Property.PlaceContent>('place-content');

export const placeItems = cssProperty<Property.PlaceItems>('place-items');

export const placeSelf = cssProperty<Property.PlaceSelf>('place-self');

// theme.spacings
export const rowGap: CssProperty<SpacingPropertyTheme | Property.RowGap<TLength>> = (value, variants = {}) => {
  return toCss('row-gap', themeFormatter('spacings'), value, variants).concat(
    toCss('grid-row-gap', themeFormatter('spacings'), value, variants),
  );
};
