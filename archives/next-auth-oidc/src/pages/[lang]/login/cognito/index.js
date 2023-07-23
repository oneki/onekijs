import { useLoginService } from 'onekijs-next';
import React from 'react';

const CognitoLoginPage = React.memo(() => {
  useLoginService('cognito');
  return null;
});

CognitoLoginPage.displayName = 'CognitoLoginPage';

export default CognitoLoginPage;
