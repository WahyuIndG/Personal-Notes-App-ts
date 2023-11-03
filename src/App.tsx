import { useMemo, useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import Header from './components/Header';
import Alert from './components/Alert';

import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import ArchivePage from './pages/ArchivePage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import ThemeContext from './contexts/ThemeContext';
import LocaleContext from './contexts/LocaleContext';

import { putAccessToken, getUserLogged } from './utils/api';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'en');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const localContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  const {
    data: user,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['auth'],
    queryFn: getUserLogged,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError: false,
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleLocale() {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'en' ? 'id' : 'en';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  }

  function toggleTheme() {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }

  function loginSuccessHandler(accessToken: string) {
    putAccessToken(accessToken);
    refetch();
  }

  function logout() {
    putAccessToken('');
    queryClient.removeQueries();
    navigate('/');
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <>
        <ThemeContext.Provider value={themeContextValue}>
          <LocaleContext.Provider value={localContextValue}>
            <Routes>
              <Route path="/*" element={<LoginPage loginSuccessHandler={loginSuccessHandler} />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
            <Alert />
          </LocaleContext.Provider>
        </ThemeContext.Provider>
      </>
    );
  }

  return (
    <>
      <ThemeContext.Provider value={themeContextValue}>
        <LocaleContext.Provider value={localContextValue}>
          <Header onLogout={logout} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/detail-page/:id" element={<DetailPage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
