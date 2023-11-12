import React from 'react';
import Alert from '../organisms/Alert';
import { ButtonLocale, ButtonTheme } from '../atoms';

type Props = {
  children: React.ReactNode;
  message?: string;
  show?: boolean;
};

const AuthenticationTemplate = ({ children, message, show }: Props) => {
  return (
    <main className="register-page login-page">
      <header className="register-page__header login-page__header">
        <ButtonLocale />
        <ButtonTheme />
      </header>
      {children}
      <Alert show={show} message={message} />
    </main>
  );
};

export default AuthenticationTemplate;
