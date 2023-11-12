import React from 'react';
import Button from '../../components/atoms/Button';
import BriefText from '../../components/atoms/BriefText';
import { descRetryButton, descErrorBriefText } from '../../utils/transcript-data';

interface ErrorPageProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, resetErrorBoundary }) => {
  return (
    <main className="error-screen">
      <div>
        <BriefText>{descErrorBriefText}</BriefText>
        <pre>{error.message}</pre>
        <Button onClick={resetErrorBoundary}>{descRetryButton}</Button>
      </div>
    </main>
  );
};

export default ErrorPage;
