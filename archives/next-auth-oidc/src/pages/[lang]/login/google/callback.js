import { useLoginCallbackService } from 'onekijs-next';
import React from 'react';

const GoogleCallbackPage = React.memo(() => {
  useLoginCallbackService('google');
  return null;
});

GoogleCallbackPage.displayName = 'GoogleCallbackPage';

export default GoogleCallbackPage;
