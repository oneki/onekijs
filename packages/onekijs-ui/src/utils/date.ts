export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const isValidDate = (value: string | null | undefined) => {
  if (!value) return false;
  return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{4})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/.test(value);
}

export const isValidTime = (value: string | null | undefined) => {
  if (!value) return false;
  return /^(2[0-3]|[0-1][0-9]):([0-5][0-9])$/.test(value);
}

export const isValidMinuteOrSecond = (value: string | null | undefined) => {
  if (!value) return false;
  return /^(0?|[1-5])[0-9]$/.test(value);
}

export const isValidHour = (value: string | null | undefined) => {
  if (!value) return false;
  return /^(2[0-3]|0?[0-9]|1[0-9])$/.test(value);
}
