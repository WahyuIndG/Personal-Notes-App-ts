import { createContext } from 'react';

const defaultValue = {
  theme: '',
  toggleTheme: () => {
    null;
  },
};

const ThemeContext = createContext(defaultValue);

export default ThemeContext;
