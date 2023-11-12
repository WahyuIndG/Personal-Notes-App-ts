import React, { useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';
import LocaleContext from '../../contexts/LocaleContext';
import { PiMoonStars } from 'react-icons/pi';
import { RiSunFill } from 'react-icons/ri';

const ButtonTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale } = useContext(LocaleContext);

  return (
    <button type="button" onClick={toggleTheme} title={locale === 'en' ? 'Theme' : 'Tema'}>
      {theme === 'light' ? <PiMoonStars /> : <RiSunFill />}
    </button>
  );
};

export default ButtonTheme;
