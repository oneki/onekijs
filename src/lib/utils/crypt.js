import { generateRandomString } from "./auth";
import { isNull } from "./object";

// https://medium.com/@fsjohnny/fun-times-with-webcrypto-part-2-encrypting-decrypting-dfb9fadba5bc
const hash = "SHA-256";
const salt = "salt@onekijs";
const iterations = 1000;
const keyLength = 48;
let password = null;

async function getDerivation(hash, salt, password, iterations, keyLength) {
  const textEncoder = new TextEncoder("utf-8");
  const passwordBuffer = textEncoder.encode(password);
  const importedKey = await crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const saltBuffer = textEncoder.encode(salt);
  const params = { name: "PBKDF2", hash, salt: saltBuffer, iterations };
  const derivation = await crypto.subtle.deriveBits(
    params,
    importedKey,
    keyLength * 8
  );
  return derivation;
}

async function getKey(derivation) {
  const keylen = 32;
  const derivedKey = derivation.slice(0, keylen);
  const iv = derivation.slice(keylen);
  const importedEncryptionKey = await crypto.subtle.importKey(
    "raw",
    derivedKey,
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
  return {
    key: importedEncryptionKey,
    iv: iv
  };
}

async function encryptText(text, keyObject) {
  const textEncoder = new TextEncoder("utf-8");
  const textBuffer = textEncoder.encode(text);
  const encryptedText = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: keyObject.iv },
    keyObject.key,
    textBuffer
  );
  return encryptedText;
}

async function decryptText(encryptedText, keyObject) {
  const textDecoder = new TextDecoder("utf-8");
  const decryptedText = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: keyObject.iv },
    keyObject.key,
    encryptedText
  );
  return textDecoder.decode(decryptedText);
}

export async function encrypt(text, pwd) {
  if (isNull(text)) return null;
  if (!pwd) {
    pwd = password || localStorage.getItem("onekijs.crypter");
  }

  if (!pwd) {
    password = generateRandomString(32);
    localStorage.setItem("onekijs.crypter", password);
    pwd = password;
  }
  const derivation = await getDerivation(
    hash,
    salt,
    pwd,
    iterations,
    keyLength
  );
  const keyObject = await getKey(derivation);
  const encryptedObject = await encryptText(JSON.stringify(text), keyObject);
  const encryptedByteArray = Array.from(new Uint8Array(encryptedObject));
  const encryptedString = encryptedByteArray
    .map(byte => String.fromCharCode(byte))
    .join("");
  return btoa(encryptedString);
}

export async function decrypt(encryptedB64, pwd) {
  if (isNull(encryptedB64)) return null;
  if (!pwd) {
    pwd = password || localStorage.getItem("onekijs.crypter");
  }
  const encryptedString = atob(encryptedB64);
  const encryptedByteArray = new Uint8Array(
    encryptedString.match(/[\s\S]/g).map(ch => ch.charCodeAt(0))
  );

  const derivation = await getDerivation(
    hash,
    salt,
    pwd,
    iterations,
    keyLength
  );
  const keyObject = await getKey(derivation);
  const decryptedText = await decryptText(encryptedByteArray, keyObject);
  return JSON.parse(decryptedText);
}
