import { secure, useSecurityContext } from 'onekijs';
import React from 'react';

const SecuredPage: React.FC = () => {
  const securityContext = useSecurityContext();
  return (
    <div>
      <p>Congratulations ! You have access to the secured page</p>
      <p>Content of the security context</p>
      <pre>
        {JSON.stringify(securityContext, null, 2)}
      </pre>
    </div>
  )
};

export default secure(SecuredPage);
