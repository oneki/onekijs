import { ErrorBoundaryComponentProps } from 'onekijs';
import React, { FC } from 'react';

const ErrorBoundary: FC<ErrorBoundaryComponentProps> = ({ error, errorInfo }) => {
  return (
    <div className="error-boundary-container">
      <div>
        <div className="error">An error occured: {error?.message}</div>
        <div>
          stacktrace: <pre>{errorInfo?.componentStack}</pre>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
