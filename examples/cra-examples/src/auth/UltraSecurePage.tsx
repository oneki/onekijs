import { secure, useSecurityContext } from 'onekijs';
import React from 'react';

const UltraSecuredPage: React.FC = () => {
  const securityContext = useSecurityContext();
  return (
    <div>
      <p>Congratulations ! You have access to the ultra secured page (reserved to admin users)</p>
      <p>Content of the security context</p>
      <pre>
        {JSON.stringify(securityContext, null, 2)}
      </pre>
    </div>
  )
};

export default secure(UltraSecuredPage, (securityContext) => securityContext.roles?.includes('admin'));
