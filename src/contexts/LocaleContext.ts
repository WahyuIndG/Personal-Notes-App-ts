import { createContext } from 'react';

const DefaultValue = {
  locale: '',
  toggleLocale: () => {
    null;
  },
};

const LocaleContext = createContext(DefaultValue);

export default LocaleContext;
