import { Component, type ErrorInfo, type ReactNode } from "react";
import Button from "./Button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Keep detailed error information out of the production UI.
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main
          role="alert"
          className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-12 text-center"
        >
          <h1 className="text-2xl font-bold text-gray-900">
            Something went wrong
          </h1>

          <p className="mt-3 max-w-md text-sm text-gray-600">
            An unexpected error occurred while displaying this page. Please try
            again.
          </p>

          <Button variant="primary" onClick={this.handleRetry} className="mt-6">
            Try Again
          </Button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
