import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorPage from '../../../pages/error';
// import * as Sentry from '@sentry/browser';

type Props = {
  fallback?: ReactNode;
  children?: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    // Sentry.captureException(error);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || <ErrorPage />;
    }
    return this.props.children;
  }
}
