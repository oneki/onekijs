import { useLoginCallbackService } from 'onekijs-next';
import React from 'react';

const CognitoCallbackPage = React.memo(() => {
  useLoginCallbackService('cognito');
  return null;
});

CognitoCallbackPage.displayName = 'CognitoCallbackPage';

export default CognitoCallbackPage;
