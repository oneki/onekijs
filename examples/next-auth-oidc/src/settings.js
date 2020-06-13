/* eslint-disable no-undef */
export default {
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: null,
    url: "/locales"
  },
  idp: {
    google: {
      type: 'oidc_server', 
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID,  // id given by the IDP. Example: 1eb5cq6p7d8dm8g4q9jk6qdvd8                
      authorizeEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth', // a redirect is done to this relative URL, a absolute URL or a function returning a URL ((idp, context) => 'https://example.com/oauth2/authorize?.....'). If it's a relative URL, it's prefixed by the server.baseUrl. Example: https://auth.oneki.net/oauth2/authorize  
      tokenEndpoint: process.env.NEXT_GOOGLE_TOKEN_ENDPOINT, 
      userinfoEndpoint: process.env.NEXT_GOOGLE_USERINFO_ENDPOINT, // can be token://<token_prop> or an URL or a function (idp, context) => { return {email: 'foo@example.com', roles: ['ADMIN']}}) returning the securityContext (can be a Promise). If not set, defaults to token://id_token if response_type contains id_token or token://access_token if repsonse_type contains only token
      logoutEndpoint: process.env.NEXT_GOOGLE_LOGOUT_ENDPOINT, // a redirect is done to this relative URL, a absolute URL or a function returning a URL ((idp, context) => 'https://example.com/oauth2/logout?.....'). If it's a relative URL, it's prefixed by the server.baseUrl . Example: https://auth.oneki.net/logout
      scope: 'openid email profile'
    },   
    cognito: {
      type: 'oidc_browser', 
      clientId: process.env.NEXT_COGNITO_CLIENT_ID,
      authorizeEndpoint: process.env.NEXT_COGNITO_AUTHORIZE_ENDPOINT,
      tokenEndpoint: process.env.NEXT_COGNITO_TOKEN_ENDPOINT,  
      userinfoEndpoint: process.env.NEXT_COGNITO_USERINFO_ENDPOINT,
      logoutEndpoint: process.env.NEXT_COGNITO_LOGOUT_ENDPOINT, 
      jwksEndpoint: process.env.NEXT_COGNITO_JWKS_ENDPOINT,
      postLogoutRedirectKey: 'logout_uri', // the key used by the external provider to know which is the callback URL after a successfull logout (defaults to post_logout_redirect_uri which is the oidc standard)
    },
    facebook: {
      type: 'oidc_server', 
      clientId: process.env.NEXT_FACEBOOK_CLIENT_ID,                
      authorizeEndpoint: process.env.NEXT_FACEBOOK_AUTHORIZE_ENDPOINT, 
      tokenEndpoint: process.env.NEXT_FACEBOOK_TOKEN_ENDPOINT,  
      userinfoEndpoint: process.env.NEXT_FACEBOOK_USERINFO_ENDPOINT,
      logoutEndpoint: process.env.NEXT_FACEBOOK_LOGOUT_ENDPOINT,
      scope: 'openid email profile'
    },
    itsme: {
      type: 'oidc_server', 
      clientId: process.env.NEXT_ITSME_CLIENT_ID,                
      // eslint-disable-next-line no-unused-vars
      authorizeEndpoint: (params, { idp, router, store, settings, i18n }) => {
        // Here is a an example when the authorization endpoint is not fixed
        // Indeed, we want to add the current locale as a parameter of the URL
        if (i18n.locale) {
          params.ui_locales = i18n.locale
        }
        
        // Build the URL
        const search = Object.keys(params).reduce((accumulator, key) => {
          accumulator += accumulator.length > 1 ? '&' : '';
          return `${accumulator}${key}=${params[key]}`;
        }, "?");
        return `${idp.authorizeUrl}${search}`;
      }, 
      tokenEndpoint: process.env.NEXT_ITSME_TOKEN_ENDPOINT,  
      userinfoEndpoint: process.env.NEXT_ITSME_USERINFO_ENDPOINT,
      logoutEndpoint: process.env.NEXT_ITSME_LOGOUT_ENDPOINT,
      scope: process.env.NEXT_ITSME_SCOPE,
      authorizeUrl: process.env.NEXT_ITSME_AUTHORIZE_ENDPOINT
    }     
  },
      
};