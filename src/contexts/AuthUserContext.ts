import { createContext } from 'react';

type AutUser = {
  id: string;
  name: string;
  email: string;
};

const AuthUserContext = createContext<AutUser | undefined>(undefined);

export default AuthUserContext;
