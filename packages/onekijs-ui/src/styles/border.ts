import {
  Property
} from 'csstype';
import { colorFormatter, pxFormatter, themeFormatter } from '../utils/formatter';
import { cssProperty } from '../utils/style';
import { ColorPropertyTheme, RadiusPropertyTheme, ShadowPropertyTheme, TLength } from './typings';

export const border = cssProperty<Property.Border<TLength>>('border');
export const borderTop = cssProperty<Property.BorderTop<TLength>>('border-top');
export const borderBottom = cssProperty<Property.BorderBottom<TLength>>('border-bottom');
export const borderLeft = cssProperty<Property.BorderLeft<TLength>>('border-left');
export const borderRight = cssProperty<Property.BorderRight<TLength>>('border-right');

export const borderColor = cssProperty<ColorPropertyTheme | Property.BorderColor>(
  null,
  colorFormatter('border-color', 'border-opacity'),
);
export const borderTopColor = cssProperty<ColorPropertyTheme | Property.BorderTopColor>(
  null,
  colorFormatter('border-top-color', 'border-top-opacity'),
);
export const borderBottomColor = cssProperty<ColorPropertyTheme | Property.BorderBottomColor>(
  null,
  colorFormatter('border-bottom-color', 'border-bottom-opacity'),
);
export const borderLeftColor = cssProperty<ColorPropertyTheme | Property.BorderLeftColor>(
  null,
  colorFormatter('border-left-color', 'border-left-opacity'),
);
export const borderRightColor = cssProperty<ColorPropertyTheme | Property.BorderRightColor>(
  null,
  colorFormatter('border-right-color', 'border-right-opacity'),
);

export const borderImage = cssProperty<Property.BorderImage>('border-image');
export const borderImageOutset = cssProperty<Property.BorderImageOutset<TLength>>('border-image-outset');
export const borderImageRepeat = cssProperty<Property.BorderImageRepeat>('border-image-repeat');
export const borderImageSlice = cssProperty<Property.BorderImageSlice>('border-image-slice');
export const borderImageSource = cssProperty<Property.BorderImageSource>('border-image-source');
export const borderImageWidth = cssProperty<Property.BorderImageWidth<TLength>>('border-image-width');

export const borderOpacity = cssProperty<Property.Opacity>('--border-opacity');
export const borderTopOpacity = cssProperty<Property.Opacity>('--border-top-opacity');
export const borderBottomOpacity = cssProperty<Property.Opacity>('-border-bottom-opacity');
export const borderLeftOpacity = cssProperty<Property.Opacity>('--border-left-opacity');
export const borderRightOpacity = cssProperty<Property.Opacity>('--border-right-opacity');

export const borderRadius = cssProperty<RadiusPropertyTheme | Property.BorderRadius<TLength>>(
  'border-radius',
  themeFormatter('radius'),
);
export const borderTopLeftRadius = cssProperty<Property.BorderTopLeftRadius<TLength>>(
  'border-top-left-radius',
  themeFormatter('radius'),
);

export const borderBottomLeftRadius = cssProperty<Property.BorderBottomLeftRadius<TLength>>(
  'border-bottom-left-radius',
  themeFormatter('radius'),
);
export const borderTopRightRadius = cssProperty<Property.BorderTopRightRadius<TLength>>(
  'border-top-right-radius',
  themeFormatter('radius'),
);
export const borderBottomRightRadius = cssProperty<Property.BorderBottomRightRadius<TLength>>(
  'border-bottom-right-radius',
  themeFormatter('radius'),
);

export const borderStyle = cssProperty<Property.BorderStyle>('border-style');
export const borderTopStyle = cssProperty<Property.BorderStyle>('border-top-style');
export const borderBottomStyle = cssProperty<Property.BorderStyle>('border-bottom-style');
export const borderLeftStyle = cssProperty<Property.BorderStyle>('border-left-style');
export const borderRightStyle = cssProperty<Property.BorderStyle>('border-right-style');

export const borderWidth = cssProperty<number | Property.BorderWidth<TLength>>('border-width', pxFormatter);
export const borderTopWidth = cssProperty<number | Property.BorderTopWidth<TLength>>('border-top-width', pxFormatter);
export const borderBottomWidth = cssProperty<number | Property.BorderBottomWidth<TLength>>(
  'border-bottom-width',
  pxFormatter,
);
export const borderLeftWidth = cssProperty<number | Property.BorderLeftWidth<TLength>>('border-left-width', pxFormatter);
export const borderRightWidth = cssProperty<number | Property.BorderRightWidth<TLength>>(
  'border-right-width',
  pxFormatter,
);

export const boxShadow = cssProperty<ShadowPropertyTheme | Property.BoxShadow>('box-shadow', themeFormatter('shadow'));
