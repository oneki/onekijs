/* eslint-disable react/prop-types */
import { withLayout, secure, useSetting, useOnekiRouter } from 'onekijs-next';
import React, { useEffect } from 'react';
import MainLayout from '../layout/mainLayout/MainLayout';
import PropTypes from 'prop-types'


const AdminPage = () => {
  return (
    <div>This is the (protected) admin page. Only logged-in users with the role <b>ADMIN</b> can view it</div>
  );
}

const AdminPageWithLayout = withLayout(AdminPage, MainLayout);

const validator = (securityContext) => {
  return securityContext &&
         securityContext.roles &&
         securityContext.roles.includes('ADMIN');
}

const ErrorComponent = ({error}) => {
  const router = useOnekiRouter();
  const loginRoute = useSetting('routes.login', '/login');

  useEffect(() => {
    if (error.code === 401) {
      router.push(loginRoute);
    }
  }, [error.code, router, loginRoute])
  
  if (error.code === 401) {
    return null;
  }

  return (
    <div className="text-red-500">You are not authorized to view this page</div>
  )
}

ErrorComponent.PropTypes = {
  error: PropTypes.object,
}

export default secure(AdminPageWithLayout, validator, { ErrorComponent });
