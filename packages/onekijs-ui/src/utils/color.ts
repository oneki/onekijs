export const darken = (color: string, gap = 100, newColorValue?: string): string => {
  const [colorValue, weight] = color.split('-');
  newColorValue = newColorValue || colorValue;
  if (weight === undefined) {
    return newColorValue;
  }
  return `${newColorValue}-${Math.min(parseInt(weight) + gap, 900)}`;
};

export const deriveColor = (color: string, gap = 100, dark: boolean, newColorValue?: string): string => {
  const [colorValue, weight] = color.split('-');
  newColorValue = newColorValue || colorValue;
  if (weight === undefined) {
    return newColorValue;
  }
  return `${newColorValue}-${parseInt(weight) + (dark ? -gap : gap)}`;
};

export const lighten = (color: string, gap: number, newColorValue?: string): string => {
  const [colorValue, weight] = color.split('-');
  newColorValue = newColorValue || colorValue;
  if (weight === undefined) {
    return newColorValue;
  }
  return `${newColorValue}-${Math.max(parseInt(weight) - gap, 0)}`;
};

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (_m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
