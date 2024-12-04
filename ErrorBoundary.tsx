import React, { Component, ReactNode } from 'react';
import { View, Text } from 'react-native';

interface ErrorBoundaryProps {
  children: ReactNode; // Define the children prop type
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    // Update state to render a fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: any) {
    // You can also log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI here, e.g. a blank screen or an error message
      return null; // Simply return nothing to suppress the UI from showing the error
    }

    return this.props.children; // Render the children if no error occurs
  }
}

export default ErrorBoundary;
