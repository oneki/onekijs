import { Link, useLocation, useRouter } from 'onekijs';
import { FC } from 'react';

const LoginPage: FC = () => {
  const location = useLocation();
  const router = useRouter();

  // We are in a special case where we want to propose several authentication methods to the user
  // So we have built an intermediate page to allow the user to choose the authentication method
  // Be default, the user will be redirected to this page after the authentication (the last page before the actual login page)
  // But we want to redirect the user to the page that redirected the user to this intermediate login page (example: /auth/secure)
  // router.saveOrigin() stores in the router the page that triggered a redirect to this page and will use it to redirect the user
  // to the correct page once the user is authenticated (example: /auth/secure)
  router.saveOrigin(true);
  
  const basePath = location.pathname;
  return (
    <div>
      <ul>
        <li><Link href={`${basePath}/form`}>Login with username / password (Standard form based authentication)</Link></li>
        <li><Link href={`${basePath}/google`}>Login with Google (Open ID Connect authentication)</Link></li>
        <li><Link href={`${basePath}/external`}>External login (Authentication performed externally)</Link></li>
      </ul>
    </div>
  );
}

export default LoginPage;
