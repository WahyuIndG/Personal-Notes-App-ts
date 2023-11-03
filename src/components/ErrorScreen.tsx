import React from 'react';
import Button from './Button';

interface ErrorScreenProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, resetErrorBoundary }) => {
  return (
    <main className="error-screen">
      <div>
        <p>Something went Error ☠️</p>
        <pre>{error.message}</pre>
        <Button Icon={null} onSubmitHandler={resetErrorBoundary}>
          try again
        </Button>
      </div>
    </main>
  );
};

export default ErrorScreen;
