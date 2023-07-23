import { useLoginCallbackService } from 'onekijs';
import React from 'react';

const LoginCallbackPage: React.FC = () => {
  const [error] = useLoginCallbackService();

  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  return null;
};

export default LoginCallbackPage;
