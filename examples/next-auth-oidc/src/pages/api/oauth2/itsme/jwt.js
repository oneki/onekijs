import { JWK } from 'jose';
import JWT from '../util/jwt';

/**
 *
 * Build a specific JWT class to hold the correct keys:
 * Encryption of the assertion sent to Itsme is done via the Itsme encryption public key
 * Signature of the assertion sent to Itsme is done via our private signing key
 * Decryption of the token received from Itsme is done via our private encryption key
 * Verification of the signature of the token received from Itsme is done via the Itsme public signing key
 *
 */

// Itsme public encryption key (test environment). Taken from https://e2emerchant.itsme.be/oidc/jwkSet
const encryptKeyItsme = JWK.asKey({
  kty: 'RSA',
  e: 'AQAB',
  use: 'enc',
  kid: 'e1',
  n:
    'vVm75k4dzUw_iuG8NvIvGS8o3dMvlpXwBX44ZcGgBzCnzHKjY37T8newmRcfmFkpvTR0qgYqtPeev5RwOZXXDO9S-eg6Zkc_6sZjfSpeiOBebwW1DeZlEiYCTWSg6Ri5H26S3j6R8H_b3BCrtcd3gcmD7OwY280QvJ8eDmbJaj4aAaXf_Ef9RTYz1qJHnehbNRlmRr-OJuuYpsH497Is-c7OvUSLfMkItj9mtRKuk4DQ0LY5c5MYiyx1NidCuQTSK4VZSA3l6zMq-WN1pRb61hjfI74OO7gT256vQZZSq0DrzMPxA0mGeNDBlj6J5cBcdwnTAhF9mojs-ZwcAAvbgQ',
});

// Itsme public signing key (test environment). Taken from https://e2emerchant.itsme.be/oidc/jwkSet
const signKeyItsme = JWK.asKey({
  kty: 'RSA',
  e: 'AQAB',
  use: 'sig',
  kid: 's1',
  n:
    'ww1tBAXonaQPQ-Xu08iDDRDhjJbeywRaNCP_Bp9uS06rEk8jXyqJCqLczdKOtfbnT7FdAUn-OQn_2QQTcUrk-CrMVNFv_squZA6bxExHkYc1Dq-gCXClP6imJErYIMpzfzR6o8I0UeWylP8dp9V5JzDX7tm3BySBGvU5v0i8bBQA9VmTLzXWyXrZUu4saT8bJutjl82qyP_SFbXo036wRL_wMJXok_GD-WDYFBxmV62XzYKOQ1t-6jcPfZCTDKAzTHjIF1zdE5O-IL1HgDf95DeBY-lPTUnA2PZSSqGdcYPjoml0ExDs2QdSEjxCHSe1YKPW8CGQT0L3BqxKzlfPRQ',
});

export default new JWT(encryptKeyItsme, null, null, signKeyItsme); // null mean: use our own key
