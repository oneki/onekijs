import {
  MarginBottomProperty,
  MarginLeftProperty,
  MarginProperty,
  MarginRightProperty,
  MarginTopProperty,
  PaddingBottomProperty,
  PaddingLeftProperty,
  PaddingProperty,
  PaddingRightProperty,
  PaddingTopProperty,
} from 'csstype';
import { themeFormatter } from '../utils/formatter';
import { cssProperty, toCss } from '../utils/style';
import { SpacingPropertyTheme, TLength, CssProperty } from './typings';

export const padding = cssProperty<SpacingPropertyTheme | PaddingProperty<TLength>>(
  'padding',
  themeFormatter('spacings'),
);

export const paddingY: CssProperty<SpacingPropertyTheme | PaddingProperty<TLength>> = (value, variants = {}) => {
  return toCss('padding-top', themeFormatter('spacings'), value, variants).concat(
    toCss('padding-bottom', themeFormatter('spacings'), value, variants),
  );
};

export const paddingX: CssProperty<SpacingPropertyTheme | PaddingProperty<TLength>> = (value, variants = {}) => {
  return toCss('padding-left', themeFormatter('spacings'), value, variants).concat(
    toCss('padding-right', themeFormatter('spacings'), value, variants),
  );
};

export const paddingLeft = cssProperty<SpacingPropertyTheme | PaddingLeftProperty<TLength>>(
  'padding-left',
  themeFormatter('spacings'),
);

export const paddingRight = cssProperty<SpacingPropertyTheme | PaddingRightProperty<TLength>>(
  'padding-right',
  themeFormatter('spacings'),
);

export const paddingTop = cssProperty<SpacingPropertyTheme | PaddingTopProperty<TLength>>(
  'padding-top',
  themeFormatter('spacings'),
);

export const paddingBottom = cssProperty<SpacingPropertyTheme | PaddingBottomProperty<TLength>>(
  'padding-bottom',
  themeFormatter('spacings'),
);

export const margin = cssProperty<SpacingPropertyTheme | MarginProperty<TLength>>('margin', themeFormatter('spacings'));

export const marginY: CssProperty<SpacingPropertyTheme | MarginProperty<TLength>> = (value, variants = {}) => {
  return toCss('margin-top', themeFormatter('spacings'), value, variants).concat(
    toCss('margin-bottom', themeFormatter('spacings'), value, variants),
  );
};

export const marginX: CssProperty<SpacingPropertyTheme | MarginProperty<TLength>> = (value, variants = {}) => {
  return toCss('margin-left', themeFormatter('spacings'), value, variants).concat(
    toCss('margin-right', themeFormatter('spacings'), value, variants),
  );
};

export const marginLeft = cssProperty<SpacingPropertyTheme | MarginLeftProperty<TLength>>(
  'margin-left',
  themeFormatter('spacings'),
);

export const marginRight = cssProperty<SpacingPropertyTheme | MarginRightProperty<TLength>>(
  'margin-right',
  themeFormatter('spacings'),
);

export const marginTop = cssProperty<SpacingPropertyTheme | MarginTopProperty<TLength>>(
  'margin-top',
  themeFormatter('spacings'),
);

export const marginBottom = cssProperty<SpacingPropertyTheme | MarginBottomProperty<TLength>>(
  'margin-bottom',
  themeFormatter('spacings'),
);
