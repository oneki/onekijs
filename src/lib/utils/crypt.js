import { base64url } from "rfc4648";
import { isNull } from "./object";
import { generateRandomString } from "./string";

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

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
export async function sha256(message) {
  const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

export async function verify(token, jwKey, alg) {
  try {
    switch (alg) {
      case "HS256":
        alg = { name: "HMAC", hash: { name: "SHA-256" } };
        break;
      case "HS384":
        alg = { name: "HMAC", hash: { name: "SHA-384" } };
        break;
      case "HS512":
        alg = { name: "HMAC", hash: { name: "SHA-384" } };
        break;
      case "RS384":
        alg = { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-384" } };
        break;
      case "RS512":
        alg = { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-512" } };
        break;
      case "PS256":
        alg = { name: "RSA-PSS", hash: { name: "SHA-256" } };
        break;
      case "PS384":
        alg = { name: "RSA-PSS", hash: { name: "SHA-384" } };
        break;
      case "PS512":
        alg = { name: "RSA-PSS", hash: { name: "SHA-512" } };
        break;
      case "ES256":
        alg = { name: "ECDSA", hash: { name: "SHA-256" }, namedCurve: "P-256" };
        break;
      case "ES384":
        alg = { name: "ECDSA", hash: { name: "SHA-384" }, namedCurve: "P-384" };
        break;
      case "ES512":
        alg = { name: "ECDSA", hash: { name: "SHA-512" }, namedCurve: "P-512" };
        break;
      case "A256CMAC":
        alg = { name: "AES-CMAC", length: 256 };
        break;
      case "A384CMAC":
        alg = { name: "AES-CMAC", length: 384 };
        break;
      case "A512CMAC":
        alg = { name: "AES-CMAC", length: 512 };
        break;
      default:
        alg = { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
        break;
    }

    const jwsSigningInput = token
      .split(".")
      .slice(0, 2)
      .join(".");
    const jwsSignature = token.split(".")[2];
    const key = await window.crypto.subtle.importKey("jwk", jwKey, alg, false, [
      "verify"
    ]);
    return await window.crypto.subtle.verify(
      alg,
      key,
      base64url.parse(jwsSignature, { loose: true }),
      new TextEncoder().encode(jwsSigningInput)
    );
  } catch (e) {
    throw e;
  }
}
