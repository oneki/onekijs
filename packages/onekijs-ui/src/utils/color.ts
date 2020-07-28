export const deriveColor = (color: string, gap: number, dark: boolean, newColorValue?: string): string => {
  const [colorValue, weight] = color.split('-');
  newColorValue = newColorValue || colorValue;
  if (weight === undefined) {
    return newColorValue;
  }
  return `${newColorValue}-${parseInt(weight) + (dark ? -gap : gap)}`;
};
