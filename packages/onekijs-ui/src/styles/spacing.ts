import { Property } from 'csstype';
import { themeFormatter } from '../utils/formatter';
import { cssProperty, toCss } from '../utils/style';
import { SpacingPropertyTheme, TLength, CssProperty } from './typings';

export const padding = cssProperty<SpacingPropertyTheme | Property.Padding<TLength>>(
  'padding',
  themeFormatter('spacings'),
);

export const paddingY: CssProperty<SpacingPropertyTheme | Property.Padding<TLength>> = (value, variants = {}) => {
  return toCss('padding-top', themeFormatter('spacings'), value, variants).concat(
    toCss('padding-bottom', themeFormatter('spacings'), value, variants),
  );
};

export const paddingX: CssProperty<SpacingPropertyTheme | Property.Padding<TLength>> = (value, variants = {}) => {
  return toCss('padding-left', themeFormatter('spacings'), value, variants).concat(
    toCss('padding-right', themeFormatter('spacings'), value, variants),
  );
};

export const paddingLeft = cssProperty<SpacingPropertyTheme | Property.PaddingLeft<TLength>>(
  'padding-left',
  themeFormatter('spacings'),
);

export const paddingRight = cssProperty<SpacingPropertyTheme | Property.PaddingRight<TLength>>(
  'padding-right',
  themeFormatter('spacings'),
);

export const paddingTop = cssProperty<SpacingPropertyTheme | Property.PaddingTop<TLength>>(
  'padding-top',
  themeFormatter('spacings'),
);

export const paddingBottom = cssProperty<SpacingPropertyTheme | Property.PaddingBottom<TLength>>(
  'padding-bottom',
  themeFormatter('spacings'),
);

export const margin = cssProperty<SpacingPropertyTheme | Property.Margin<TLength>>('margin', themeFormatter('spacings'));

export const marginY: CssProperty<SpacingPropertyTheme | Property.Margin<TLength>> = (value, variants = {}) => {
  return toCss('margin-top', themeFormatter('spacings'), value, variants).concat(
    toCss('margin-bottom', themeFormatter('spacings'), value, variants),
  );
};

export const marginX: CssProperty<SpacingPropertyTheme | Property.Margin<TLength>> = (value, variants = {}) => {
  return toCss('margin-left', themeFormatter('spacings'), value, variants).concat(
    toCss('margin-right', themeFormatter('spacings'), value, variants),
  );
};

export const marginLeft = cssProperty<SpacingPropertyTheme | Property.MarginLeft<TLength>>(
  'margin-left',
  themeFormatter('spacings'),
);

export const marginRight = cssProperty<SpacingPropertyTheme | Property.MarginRight<TLength>>(
  'margin-right',
  themeFormatter('spacings'),
);

export const marginTop = cssProperty<SpacingPropertyTheme | Property.MarginTop<TLength>>(
  'margin-top',
  themeFormatter('spacings'),
);

export const marginBottom = cssProperty<SpacingPropertyTheme | Property.MarginBottom<TLength>>(
  'margin-bottom',
  themeFormatter('spacings'),
);
