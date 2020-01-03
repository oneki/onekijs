export function trimStart(string, charToRemove) {
  while(string.charAt(0) === charToRemove) {
      string = string.substring(1);
  }

  return string;
}

export function trimEnd(string, charToRemove) {
  while(string.charAt(string.length-1) === charToRemove) {
      string = string.substring(0,string.length-1);
  }

  return string;
}

export function trim(string, charToRemove) {
  string = trimStart(string, charToRemove);
  return trimEnd(string, charToRemove);
}