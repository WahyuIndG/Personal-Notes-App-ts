import React from 'react';

import RegistrationForm from './RegistrationForm';
import { Heading, SubHeading } from '../atoms';
import FootNote from '../molecules/FootNote';
import { descRegister } from '../../utils/transcript-data';

type Credentials = {
  name: string;
  email: string;
  password: string;
};

type Props = {
  onSubmitHandler: (e: React.FormEvent, credentials: Credentials) => void;
};

const RegistrationBox = ({ onSubmitHandler }: Props) => {
  return (
    <div className="form-wrapper">
      <Heading desc={descRegister.heading} />
      <SubHeading desc={descRegister.subHeading} />
      <RegistrationForm onSubmitHandler={onSubmitHandler} />
      <FootNote desc={descRegister.footNote} to="/" descLink={descRegister.footNoteLink} />
    </div>
  );
};

export default RegistrationBox;
