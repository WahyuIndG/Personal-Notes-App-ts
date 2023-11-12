import React, { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';

const ButtonLocale = () => {
  const { locale, toggleLocale } = useContext(LocaleContext);

  return (
    <button type="button" onClick={toggleLocale} title={locale === 'en' ? 'Languange' : 'Bahasa'}>
      {locale === 'en' ? 'ID' : 'EN'}
    </button>
  );
};

export default ButtonLocale;
