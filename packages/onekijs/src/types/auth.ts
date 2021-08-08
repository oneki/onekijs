export interface Auth {
  token?: Token;
  basic?: BasicAuth;
}

export interface OidcToken {
  access_token: string;
  id_token?: string;
  refresh_token?: string;
  token_type: string;
  expires_in: string;
  expires_at?: string;
}

export type Token = string | OidcToken;

export interface BasicAuth {
  user: string;
  password: string;
}
