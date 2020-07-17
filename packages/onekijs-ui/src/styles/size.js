import { cssProperty } from '../utils/style';

// spacing or fraction or auto or full or screen
export const width = (value, variants = {}) => {
  return cssProperty('width', widthFormatter, value, variants);
};

const sizeFormatter = (type, value, theme) => {
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
      .map(x => parseInt(x));
    return `${(100 * time) / div}%`;
  }
  return value;
};

const widthFormatter = (value, theme) => {
  return sizeFormatter('width', value, theme);
};

const heightFormatter = (value, theme) => {
  return sizeFormatter('height', value, theme);
};

// spacing or fraction or auto or full or screen
export const minWidth = (value, variants = {}) => {
  return cssProperty('min-width', widthFormatter, value, variants);
};

export const maxWidth = (value, variants = {}) => {
  return cssProperty('max-width', widthFormatter, value, variants);
};

export const height = (value, variants = {}) => {
  return cssProperty('height', heightFormatter, value, variants);
};

export const minHeight = (value, variants = {}) => {
  return cssProperty('minHeight', heightFormatter, value, variants);
};

export const maxHeight = (value, variants = {}) => {
  return cssProperty('maxHeight', heightFormatter, value, variants);
};
