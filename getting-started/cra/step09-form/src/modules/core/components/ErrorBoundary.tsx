import { ErrorBoundaryComponentProps, useTranslation } from 'onekijs';
import React from 'react';

const ErrorBoundary: React.FC<ErrorBoundaryComponentProps> = ({ error, errorInfo }) => {
  const [T] = useTranslation();
  return (
    <div className="error-boundary-container">
      <div>
        <div className="error">
          <T>An error occured</T>: {error?.message}
        </div>
        <div>
          <T>stacktrace</T>: <pre>{errorInfo?.componentStack}</pre>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
