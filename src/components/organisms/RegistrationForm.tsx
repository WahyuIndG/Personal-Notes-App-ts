import React from 'react';
import useInput from '../../hooks/useInput';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlinePencil } from 'react-icons/hi';
import FormInput from '../molecules/FormInput';
import { descRegister } from '../../utils/transcript-data';
import { Button } from '../atoms';

type Credentials = { name: string; email: string; password: string };

type Props = {
  onSubmitHandler: (e: React.FormEvent, credentials: Credentials) => void;
};

const RegistrationForm = ({ onSubmitHandler }: Props) => {
  const [name, setName] = useInput();
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();

  return (
    <form onSubmit={(e) => onSubmitHandler(e, { name, email, password })}>
      <FormInput
        htmlFor="name"
        id="name"
        type="text"
        value={name}
        onChange={setName}
        placeholder={descRegister.placeholder.name}
        icon={HiOutlinePencil}
      />
      <FormInput
        htmlFor="email"
        id="email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder={descRegister.placeholder.email}
        icon={HiOutlineMail}
      />
      <FormInput
        htmlFor="password"
        id="password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder={descRegister.placeholder.password}
        icon={HiOutlineLockClosed}
      />

      <Button type="submit">{descRegister.button}</Button>
    </form>
  );
};

export default RegistrationForm;
