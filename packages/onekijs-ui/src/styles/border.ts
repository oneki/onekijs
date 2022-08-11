import {
  BorderBottomColorProperty,
  BorderBottomLeftRadiusProperty,
  BorderBottomProperty,
  BorderBottomRightRadiusProperty,
  BorderBottomWidthProperty,
  BorderColorProperty,
  BorderImageOutsetProperty,
  BorderImageProperty,
  BorderImageRepeatProperty,
  BorderImageSliceProperty,
  BorderImageSourceProperty,
  BorderImageWidthProperty,
  BorderLeftColorProperty,
  BorderLeftProperty,
  BorderLeftWidthProperty,
  BorderProperty,
  BorderRadiusProperty,
  BorderRightColorProperty,
  BorderRightProperty,
  BorderRightWidthProperty,
  BorderStyleProperty,
  BorderTopColorProperty,
  BorderTopLeftRadiusProperty,
  BorderTopProperty,
  BorderTopRightRadiusProperty,
  BorderTopWidthProperty,
  BorderWidthProperty,
  BoxShadowProperty,
  OpacityProperty,
} from 'csstype';
import { colorFormatter, pxFormatter, themeFormatter } from '../utils/formatter';
import { cssProperty } from '../utils/style';
import { ColorPropertyTheme, RadiusPropertyTheme, ShadowPropertyTheme, TLength } from './typings';

export const border = cssProperty<BorderProperty<TLength>>('border');
export const borderTop = cssProperty<BorderTopProperty<TLength>>('border-top');
export const borderBottom = cssProperty<BorderBottomProperty<TLength>>('border-bottom');
export const borderLeft = cssProperty<BorderLeftProperty<TLength>>('border-left');
export const borderRight = cssProperty<BorderRightProperty<TLength>>('border-right');

export const borderColor = cssProperty<ColorPropertyTheme | BorderColorProperty>(
  null,
  colorFormatter('border-color', 'border-opacity'),
);
export const borderTopColor = cssProperty<ColorPropertyTheme | BorderTopColorProperty>(
  null,
  colorFormatter('border-top-color', 'border-top-opacity'),
);
export const borderBottomColor = cssProperty<ColorPropertyTheme | BorderBottomColorProperty>(
  null,
  colorFormatter('border-bottom-color', 'border-bottom-opacity'),
);
export const borderLeftColor = cssProperty<ColorPropertyTheme | BorderLeftColorProperty>(
  null,
  colorFormatter('border-left-color', 'border-left-opacity'),
);
export const borderRightColor = cssProperty<ColorPropertyTheme | BorderRightColorProperty>(
  null,
  colorFormatter('border-right-color', 'border-right-opacity'),
);

export const borderImage = cssProperty<BorderImageProperty>('border-image');
export const borderImageOutset = cssProperty<BorderImageOutsetProperty<TLength>>('border-image-outset');
export const borderImageRepeat = cssProperty<BorderImageRepeatProperty>('border-image-repeat');
export const borderImageSlice = cssProperty<BorderImageSliceProperty>('border-image-slice');
export const borderImageSource = cssProperty<BorderImageSourceProperty>('border-image-source');
export const borderImageWidth = cssProperty<BorderImageWidthProperty<TLength>>('border-image-width');

export const borderOpacity = cssProperty<OpacityProperty>('--border-opacity');
export const borderTopOpacity = cssProperty<OpacityProperty>('--border-top-opacity');
export const borderBottomOpacity = cssProperty<OpacityProperty>('-border-bottom-opacity');
export const borderLeftOpacity = cssProperty<OpacityProperty>('--border-left-opacity');
export const borderRightOpacity = cssProperty<OpacityProperty>('--border-right-opacity');

export const borderRadius = cssProperty<RadiusPropertyTheme | BorderRadiusProperty<TLength>>(
  'border-radius',
  themeFormatter('radius'),
);
export const borderTopLeftRadius = cssProperty<BorderTopLeftRadiusProperty<TLength>>(
  'border-top-left-radius',
  themeFormatter('radius'),
);

export const borderBottomLeftRadius = cssProperty<BorderBottomLeftRadiusProperty<TLength>>(
  'border-bottom-left-radius',
  themeFormatter('radius'),
);
export const borderTopRightRadius = cssProperty<BorderTopRightRadiusProperty<TLength>>(
  'border-top-right-radius',
  themeFormatter('radius'),
);
export const borderBottomRightRadius = cssProperty<BorderBottomRightRadiusProperty<TLength>>(
  'border-bottom-right-radius',
  themeFormatter('radius'),
);

export const borderStyle = cssProperty<BorderStyleProperty>('border-style');
export const borderTopStyle = cssProperty<BorderStyleProperty>('border-top-style');
export const borderBottomStyle = cssProperty<BorderStyleProperty>('border-bottom-style');
export const borderLeftStyle = cssProperty<BorderStyleProperty>('border-left-style');
export const borderRightStyle = cssProperty<BorderStyleProperty>('border-right-style');

export const borderWidth = cssProperty<number | BorderWidthProperty<TLength>>('border-width', pxFormatter);
export const borderTopWidth = cssProperty<number | BorderTopWidthProperty<TLength>>('border-top-width', pxFormatter);
export const borderBottomWidth = cssProperty<number | BorderBottomWidthProperty<TLength>>(
  'border-bottom-width',
  pxFormatter,
);
export const borderLeftWidth = cssProperty<number | BorderLeftWidthProperty<TLength>>('border-left-width', pxFormatter);
export const borderRightWidth = cssProperty<number | BorderRightWidthProperty<TLength>>(
  'border-right-width',
  pxFormatter,
);

export const boxShadow = cssProperty<ShadowPropertyTheme | BoxShadowProperty>('box-shadow', themeFormatter('shadow'));
