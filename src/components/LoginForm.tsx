import React, { FC, useContext } from 'react';
import useInput from '../Hooks/useInput';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import LocaleContext from '../contexts/LocaleContext';

interface LoginFormProps {
  onSubmitHandler: (e: React.FormEvent, credentials: { email: string; password: string }) => void;
}

const LoginForm: FC<LoginFormProps> = ({ onSubmitHandler }) => {
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();
  const { locale } = useContext(LocaleContext);

  return (
    <form onSubmit={(e) => onSubmitHandler(e, { email, password })}>
      <label htmlFor="email">
        <i>
          <HiOutlineMail />
        </i>
        <input
          type="email"
          id="email"
          value={email}
          onChange={setEmail}
          placeholder={locale === 'en' ? 'sarah@example.com' : 'jokowi@.sampel.com'}
        />
      </label>
      <label htmlFor="password">
        <i>
          <HiOutlineLockClosed />
        </i>
        <input
          type="password"
          id="password"
          value={password}
          onChange={setPassword}
          placeholder={locale === 'en' ? 'At least 6 characters' : 'Minimal 6 karakter'}
        />
      </label>
      <button>{locale === 'en' ? 'Login' : 'Masuk'}</button>
    </form>
  );
};

export default LoginForm;
