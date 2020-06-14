export default {
  idp: {
    default: {
      type: 'form',
      loginEndpoint: '/api/login',
      logoutEndpoint: '/api/logout',
      userinfoEndpoint: '/api/whoami',
    },
  },
};
