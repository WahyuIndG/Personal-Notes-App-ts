import React, { useRef } from 'react';
import useInput from '../../hooks/useInput';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import FormInput from '../molecules/FormInput';
import { descLogin } from '../../utils/transcript-data';
import { Button } from '../atoms';

type Credentials = { email: string; password: string };

type Props = {
  onSubmitHandler: (e: React.FormEvent, credentials: Credentials) => void;
};

const LoginForm = ({ onSubmitHandler }: Props) => {
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();

  return (
    <form
      onSubmit={(e) => {
        onSubmitHandler(e, { email, password });
      }}
    >
      <FormInput
        htmlFor="email"
        id="email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder={descLogin.placeholder.email}
        icon={HiOutlineMail}
      />
      <FormInput
        htmlFor="password"
        id="password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder={descLogin.placeholder.password}
        icon={HiOutlineLockClosed}
      />

      <Button type="submit">{descLogin.button}</Button>
    </form>
  );
};

export default LoginForm;
