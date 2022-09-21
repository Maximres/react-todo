import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import React, { ReactNode, useCallback, useState } from "react";

type Props = {
  children: ReactNode;
};

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const handleClick = () => {
    resetErrorBoundary();
  };

  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button type="button" onClick={handleClick}>
        Try again
      </button>
    </div>
  );
};

const AppErrorBoundary = ({ children }: Props) => {
  const [state, setState] = useState(false);
  const forceUpdate = useCallback(() => setState((x) => !x), []);

  return (
    <ErrorBoundary
      resetKeys={[state]}
      onReset={forceUpdate}
      fallbackRender={ErrorFallback}
    >
      {children}
    </ErrorBoundary>
  );
};

export { AppErrorBoundary };
