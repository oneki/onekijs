import React, { ErrorInfo, useEffect } from 'react';
import useNotificationService from '../notification/useNotificationService';
import { AppContext } from '../types/app';
import { FCC } from '../types/core';
import { ErrorBoundaryComponentProps } from './typings';

export type AppErrorBoundaryProps = {
  ErrorBoundaryComponent?: React.ComponentType<ErrorBoundaryComponentProps>;
  context: AppContext;
  children?: React.ReactNode;
};

export type AppRenderErrorBoundaryProps = AppErrorBoundaryProps & {
  ErrorBoundaryComponent: React.ComponentType<ErrorBoundaryComponentProps>;
};

type AppRenderErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
};

class AppRenderErrorBoundary extends React.Component<AppRenderErrorBoundaryProps, AppRenderErrorBoundaryState> {
  constructor(props: AppRenderErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      const ErrorBoundaryComponent = this.props.ErrorBoundaryComponent;
      return (
        <ErrorBoundaryComponent
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          context={this.props.context}
        />
      );
    }

    return this.props.children;
  }
}

const AppErrorBoundary: FCC<AppErrorBoundaryProps> = (props) => {
  const notificationService = useNotificationService();
  const ErrorBoundaryComponent = props.ErrorBoundaryComponent;

  useEffect(() => {
    const unhandledRejectionEventListener = (e: WindowEventMap['unhandledrejection']) => {
      notificationService.error(e.reason);
    };

    if (window) {
      window.addEventListener('unhandledrejection', unhandledRejectionEventListener);
    }

    return () => {
      window.removeEventListener('unhandledrejection', unhandledRejectionEventListener);
    };
  }, [notificationService]);

  if (ErrorBoundaryComponent) {
    return <AppRenderErrorBoundary {...props} ErrorBoundaryComponent={ErrorBoundaryComponent} />;
  }

  return <>{props.children}</>;
};

export default AppErrorBoundary;
