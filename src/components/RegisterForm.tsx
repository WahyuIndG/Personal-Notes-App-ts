import React, { useContext, FC } from 'react';
import useInput from '../Hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';

import { HiOutlineMail, HiOutlineLockClosed, HiOutlinePencil } from 'react-icons/hi';

interface RegisterFormProps {
  onSubmitHandler: (e: React.FormEvent, credentials: { name: string; email: string; password: string }) => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ onSubmitHandler }) => {
  const [name, setName] = useInput();
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();
  const { locale } = useContext(LocaleContext);

  return (
    <form onSubmit={(e) => onSubmitHandler(e, { name, email, password })}>
      <label htmlFor="name">
        <i>
          <HiOutlinePencil />
        </i>
        <input
          type="text"
          id="name"
          value={name}
          onChange={setName}
          placeholder={locale === 'en' ? 'Sarah Cute' : 'Jokowi Dodo'}
        />
      </label>
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
      <button>{locale === 'en' ? 'Register' : 'Daftar'}</button>
    </form>
  );
};

export default RegisterForm;
