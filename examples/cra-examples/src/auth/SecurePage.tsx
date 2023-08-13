import { Link, secure, useSecurityContext, useSetting } from 'onekijs';
import React from 'react';

const SecuredPage: React.FC = () => {
  const securityContext = useSecurityContext();
  const logoutUrl = useSetting<string>('routes.logout') || '#';
  return (
    <div>
      <p>Congratulations ! You have access to the secured page | <Link href={logoutUrl}>Sign out</Link></p>
      <p>Content of the security context</p>
      <pre>
        {JSON.stringify(securityContext, null, 2)}
      </pre>
    </div>
  )
};

export default secure(SecuredPage);
