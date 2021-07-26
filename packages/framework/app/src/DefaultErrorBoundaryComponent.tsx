import React, { FC } from 'react';
import { ErrorBoundaryComponentProps } from './typings';

const DefaultErrorBoundaryComponent: FC<ErrorBoundaryComponentProps> = ({ error }) => (
  <div>
    <pre>{JSON.stringify(error, null, 2)}</pre>
  </div>
);

export default DefaultErrorBoundaryComponent;
