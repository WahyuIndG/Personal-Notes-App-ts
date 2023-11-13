import { useMutation } from '@tanstack/react-query';
import React from 'react';
import AuthenticationTemplate from '../../components/templates/AuthenticationTemplate';
import LoginBox from '../../components/organisms/LoginBox';
import { loginApp } from '../../services/notes';

type Props = {
  onLoginSuccess: (token: string) => void;
};

const LoginPage = ({ onLoginSuccess }: Props) => {
  const { mutate, isError, error } = useMutation({
    mutationKey: loginApp().mutationKey,
    mutationFn: loginApp().mutationFn,
    onSuccess(token) {
      onLoginSuccess(token);
    },
  });

  type Credentials = {
    email: string;
    password: string;
  };

  function onSubmitHandler(e: React.FormEvent, credentials: Credentials) {
    e.preventDefault();
    mutate(credentials);
  }

  return (
    <AuthenticationTemplate message={error?.message} show={isError}>
      <LoginBox onSubmitHandler={onSubmitHandler} />
    </AuthenticationTemplate>
  );
};

export default LoginPage;
