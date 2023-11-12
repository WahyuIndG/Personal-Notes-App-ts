import { useState, useMemo } from 'react';

const useLocale = () => {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'en');

  function toggleLocale() {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'en' ? 'id' : 'en';
      localStorage.setItem('locale', newLocale);

      return newLocale;
    });
  }

  const localContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  return localContextValue;
};

export default useLocale;

// useEffect(() => {
//   document.documentElement.setAttribute('data-theme', theme);
// }, [theme]);
