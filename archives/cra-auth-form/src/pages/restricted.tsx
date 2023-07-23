import { secure } from 'onekijs';
import React from 'react';

const Page: React.FC = () => {
  return <div>This page is reserved for the connected users</div>;
};

// Any logged-in user can access this page (no additionnal check)
export const RestrictedPage = secure(Page);
