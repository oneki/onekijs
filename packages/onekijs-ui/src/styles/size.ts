import { cssProperty } from '../utils/style';
import { SizeProperty, Theme, Formatter } from './typings';

const sizeFormatter = (type: 'width' | 'height', value: SizeProperty, theme: Theme) => {
  if (theme.sizes[value] !== undefined) {
    return theme.sizes[value];
  }
  if (value === 'auto') return 'auto';
  if (value === 'none') return 'none';
  if (value === 'full') return '100%';
  if (value === 'screen') return type === 'height' ? '100vh' : '100vw';

  if (value.toString().includes('/')) {
    const [time, div] = value
      .toString()
      .split('/')
      .map((x) => parseInt(x));
    return `${(100 * time) / div}%`;
  }
  return String(value);
};

const widthFormatter: Formatter<SizeProperty> = (value, theme) => {
  return sizeFormatter('width', value, theme);
};

const heightFormatter: Formatter<SizeProperty> = (value, theme) => {
  return sizeFormatter('height', value, theme);
};

// spacing or fraction or auto or full or screen
export const width = cssProperty<SizeProperty>('width', widthFormatter);

// spacing or fraction or auto or full or screen
export const minWidth = cssProperty<SizeProperty>('min-width', widthFormatter);

export const maxWidth = cssProperty<SizeProperty>('max-width', widthFormatter);

export const height = cssProperty<SizeProperty>('height', heightFormatter);

export const minHeight = cssProperty<SizeProperty>('minHeight', heightFormatter);

export const maxHeight = cssProperty<SizeProperty>('maxHeight', heightFormatter);
