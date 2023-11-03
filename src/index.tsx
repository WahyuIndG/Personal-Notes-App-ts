import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';

import App from './App';
import './styles/style.css';
import ErrorScreen from './components/ErrorScreen';
import { Suspense } from 'react';
import LoadingScreen from './components/LoadingScreen';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root') as Element);
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ error, resetErrorBoundary }) => {
              return <ErrorScreen error={error} resetErrorBoundary={resetErrorBoundary} />;
            }}
          >
            <Suspense fallback={<LoadingScreen />}>
              <App />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </BrowserRouter>
);
