export const deriveColor = (color, gap, dark, newColorValue) => {
  const [colorValue, weight] = color.split('-');
  newColorValue = newColorValue || colorValue;
  if (weight === undefined) {
    return newColorValue;
  }
  return `${newColorValue}-${parseInt(weight) + (dark ? -gap : gap)}`;
};
