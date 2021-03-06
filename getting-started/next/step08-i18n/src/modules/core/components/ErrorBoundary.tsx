import { ErrorBoundaryComponentProps, useTranslation } from 'onekijs-next';
import React, { FC } from 'react';

const ErrorBoundary: FC<ErrorBoundaryComponentProps> = ({ error, errorInfo }) => {
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
