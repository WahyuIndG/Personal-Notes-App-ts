import { createRoot } from 'react-dom/client';

import App from './App';
import './styles/style.css';
import React, { Suspense } from 'react';
import { LoadingScreen } from './components/organisms';
import {
  QueryClient,
  QueryClientContext,
  QueryClientProvider,
  QueryErrorResetBoundary,
  useQueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

const FallbackRender = ({ error, resetErrorBoundary }: Props) => {
  return <ErrorPage error={error} resetErrorBoundary={resetErrorBoundary} />;
};

const root = createRoot(document.getElementById('root') as Element);
root.render(
  <QueryClientProvider client={queryClient}>
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={FallbackRender}>
          <Suspense fallback={<LoadingScreen />}>
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
