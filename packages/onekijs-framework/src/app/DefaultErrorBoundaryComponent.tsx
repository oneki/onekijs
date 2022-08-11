import React from 'react';
import { FCC } from '../types/core';
import { ErrorBoundaryComponentProps } from './typings';

const DefaultErrorBoundaryComponent: FCC<ErrorBoundaryComponentProps> = ({ error }) => (
  <div>
    <pre>{JSON.stringify(error, null, 2)}</pre>
  </div>
);

export default DefaultErrorBoundaryComponent;
