import React from 'react';
import { useLogoutService } from 'onekijs-next';

const LogoutPage = React.memo(() => {
  useLogoutService();
  return null;
});
LogoutPage.displayName = 'Logout';

export default LogoutPage;
