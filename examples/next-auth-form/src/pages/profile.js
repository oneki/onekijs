import { withLayout, secure } from 'onekijs-next';
import React from 'react';
import MainLayout from '../layout/mainLayout/MainLayout';

const ProfilPage = () => {
  return (
    <div>
      This is the (protected) profile page. Only logged-in users can view it
    </div>
  );
};

export default secure(withLayout(ProfilPage, MainLayout));
