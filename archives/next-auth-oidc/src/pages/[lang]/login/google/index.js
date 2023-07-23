import { useLoginService } from 'onekijs-next';
import React from 'react';

const GoogleLoginPage = React.memo(() => {
  useLoginService('google');
  return null;
});

GoogleLoginPage.displayName = 'GoogleLoginPage';

export default GoogleLoginPage;
