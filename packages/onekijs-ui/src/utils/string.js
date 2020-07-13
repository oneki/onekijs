export const lcfirst = str => {
  if (str && str.length > 0) {
    return `${str[0].toLowerCase()}${str.substring(1)}`;
  }
  return str;
};
