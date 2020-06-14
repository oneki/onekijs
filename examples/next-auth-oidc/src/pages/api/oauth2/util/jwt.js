/* eslint-disable no-undef */
import { JWE, JWS, JWK } from 'jose';
import fs from 'fs';
import path from 'path';

export default class {
  constructor(encryptKey, decryptKey, signKey, verifyKey) {
    this.encryptKey =
      encryptKey ||
      JWK.asKey(
        // Our private encryption key
        {
          key: fs.readFileSync(path.join(process.cwd(), 'encryption.pem')),
          passphrase: process.env.NEXT_ENCRYPT_KEY_PASSPHRASE,
        },
        {
          alg: 'RSA-OAEP',
          kid: 'e1',
          use: 'enc',
        }
      );

    this.decryptKey =
      decryptKey ||
      JWK.asKey(
        // Our private encryption key
        {
          key: fs.readFileSync(path.join(process.cwd(), 'encryption.pem')),
          passphrase: process.env.NEXT_ENCRYPT_KEY_PASSPHRASE,
        },
        {
          alg: 'RSA-OAEP',
          kid: 'e1',
          use: 'enc',
        }
      );

    this.signKey =
      signKey ||
      JWK.asKey(
        // Our private signing key
        {
          key: fs.readFileSync(path.join(process.cwd(), 'signing.pem')),
          passphrase: process.env.NEXT_SIGN_KEY_PASSPHRASE,
        },
        {
          alg: 'RS256',
          kid: 's1',
          use: 'sig',
          typ: 'JWT',
        }
      );

    this.verifyKey =
      verifyKey ||
      JWK.asKey(
        // Our private signing key
        {
          key: fs.readFileSync(path.join(process.cwd(), 'signing.pem')),
          passphrase: process.env.NEXT_SIGN_KEY_PASSPHRASE,
        },
        {
          alg: 'RS256',
          kid: 's1',
          use: 'sig',
          typ: 'JWT',
        }
      );
  }

  jti() {
    const hrTime = process.hrtime();
    return 'Oneki-' + (hrTime[0] * 1000000000 + hrTime[1]);
  }

  exp(seconds) {
    return Math.floor(new Date() / 1000) + seconds;
  }

  // encrypt with the public encryption key
  encrypt(payload) {
    return JWE.encrypt(payload, this.encryptKey, {
      alg: 'RSA-OAEP',
      enc: 'A128CBC-HS256',
      cty: 'JWT',
      kid: 'e1',
    });
  }

  // decrypt with the private encryption key
  decrypt(jwe) {
    const decrypted = JWE.decrypt(jwe, this.decryptKey); // Return a Buffer
    const decrypted_str = decrypted.toString('utf-8'); // Convert the Buffer into a base64 string
    return decrypted_str;
  }

  // sign with the pviate signing key
  sign(payload) {
    return JWS.sign(payload, this.signKey, {
      alg: 'RS256',
      kid: 's1',
    });
  }

  // verify signature with the public signing key
  verify(jws) {
    return JWS.verify(jws, this.verifyKey);
  }

  createAccessToken(seconds) {
    const claims = {
      iss: 'https://oneki.net/onekijs-next-example/next/auth-oidc',
      exp: this.exp(seconds),
    };
    return this.encrypt(this.sign(claims));
  }

  isValidAccessToken(access_token) {
    const claims = this.verify(this.decrypt(access_token));
    if (claims.exp > this.exp(0)) return true;
    return false;
  }
}
