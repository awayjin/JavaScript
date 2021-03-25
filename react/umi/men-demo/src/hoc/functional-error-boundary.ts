import React from 'react';
import * as Sentry from '@sentry/browser';
import { isLocal } from '@/utils/env';

type ErrorHandler = (error: Error, info: React.ErrorInfo) => void;
type ErrorHandlingComponent<Props> = (
  props: Props,
  error?: Error,
) => React.ReactNode;

type ErrorState = { error?: Error };

export default function Catch<Props extends {}>(
  component: ErrorHandlingComponent<Props>,
  errorHandler?: ErrorHandler,
): React.ComponentType<Props> {
  return class extends React.Component<Props, ErrorState> {
    // eslint-disable-next-line react/state-in-constructor
    state: ErrorState = {
      error: undefined,
    };

    static getDerivedStateFromError(error: Error) {
      return { error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
      if (errorHandler) {
        errorHandler(error, info);
        if (!isLocal) {
          Sentry.captureException({ error, info });
        }
      }
    }

    render() {
      // eslint-disable-next-line react/destructuring-assignment
      return component(this.props, this.state.error);
    }
  };
}
