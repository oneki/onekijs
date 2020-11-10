import React, { ErrorInfo } from 'react';
import { ErrorBoundaryComponentProps } from './typings';

type AppErrorBoundaryProps = {
  ErrorBoundaryComponent: React.ComponentType<ErrorBoundaryComponentProps>;
};

type AppErrorBoundaryState = {
  hasError: boolean;
} & ErrorBoundaryComponentProps;

export default class AppErrorBoundary extends React.Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  constructor(props: AppErrorBoundaryProps) {
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
        <ErrorBoundaryComponent error={this.state.error} errorInfo={this.state.errorInfo}>
          {this.props.children}
        </ErrorBoundaryComponent>
      );
    }

    return this.props.children;
  }
}
