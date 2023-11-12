import React from 'react';

import LoginForm from './LoginForm';
import { Heading, SubHeading } from '../atoms';
import FootNote from '../molecules/FootNote';

import { descLogin } from '../../utils/transcript-data';

type Credentials = {
  email: string;
  password: string;
};

type Props = {
  onSubmitHandler: (e: React.FormEvent, credentials: Credentials) => void;
};

const LoginBox = ({ onSubmitHandler }: Props) => {
  return (
    <div className="form-wrapper">
      <Heading desc={descLogin.heading} />
      <SubHeading desc={descLogin.subHeading} />
      <LoginForm onSubmitHandler={onSubmitHandler} />
      <FootNote desc={descLogin.footNote} to="/register" descLink={descLogin.footNoteLink} />
    </div>
  );
};

export default LoginBox;
