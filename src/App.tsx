import { Route, Routes, useNavigate } from 'react-router-dom';
import {
  ActiveNotesPage,
  ArchivedNotesPage,
  CreateNotePage,
  DetailNotePage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  Frame,
  RequireAuth,
} from './pages';
import useLocale from './hooks/useLocale';
import useTheme from './hooks/useTheme';
import LocaleContext from './contexts/LocaleContext';
import ThemeContext from './contexts/ThemeContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { putAccessToken } from './utils/api';
import { LoadingScreen } from './components/organisms';
import AuthUserContext from './contexts/AuthUserContext';
import { getAuthUser } from './services/notes';

const App = () => {
  const localeContextValue = useLocale();
  const themeContextValue = useTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: authUser,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: getAuthUser().queryKey,
    queryFn: getAuthUser().queryFn,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError: false,
  });

  function handleLoginSuccess(token: string) {
    putAccessToken(token);
    refetch();
    navigate('/');
  }

  function handleLogout() {
    putAccessToken('');
    queryClient.removeQueries();
    navigate('/');
  }

  if (isFetching) return <LoadingScreen />;

  return (
    <LocaleContext.Provider value={localeContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <AuthUserContext.Provider value={authUser}>
          <Routes>
            <Route path="/" element={<Frame />}>
              <Route path="login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
              <Route path="register" element={<RegisterPage />} />
              <Route element={<RequireAuth onLogout={handleLogout} />}>
                <Route index element={<ActiveNotesPage />} />
                <Route path="archive" element={<ArchivedNotesPage />} />
                <Route path="add" element={<CreateNotePage />} />
                <Route path="notes/:id" element={<DetailNotePage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthUserContext.Provider>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
};

export default App;
