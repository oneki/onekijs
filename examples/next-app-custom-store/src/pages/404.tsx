import React, { FC } from 'react';
import { withNotFound } from 'onekijs-next';

const NotFoundPage: FC = () => {
  return <div>404 not found !</div>;
};

export default withNotFound(NotFoundPage);
