const b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const b64pad="=";

// Copyright (c) 2010-2018 Kenji Urushima - jsrsasign
export function hex2b64(h) {
  let i;
  let c;
  let ret = "";
  for(i = 0; i+3 <= h.length; i+=3) {
    c = parseInt(h.substring(i,i+3),16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if(i+1 === h.length) {
    c = parseInt(h.substring(i,i+1),16);
    ret += b64map.charAt(c << 2);
  }
  else if(i+2 === h.length) {
    c = parseInt(h.substring(i,i+2),16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while((ret.length & 3) > 0) ret += b64pad;
  return ret;
}

export function generateRandomString(
  length,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_"
) {
  const result = [];
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}

export function trimStart(string, charToRemove) {
  while (string.charAt(0) === charToRemove) {
    string = string.substring(1);
  }

  return string;
}

export function trimEnd(string, charToRemove) {
  while (string.charAt(string.length - 1) === charToRemove) {
    string = string.substring(0, string.length - 1);
  }

  return string;
}

export function trim(string, charToRemove) {
  string = trimStart(string, charToRemove);
  return trimEnd(string, charToRemove);
}
