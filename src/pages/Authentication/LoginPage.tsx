import { useMutation } from '@tanstack/react-query';
import { login } from '../../utils/api';
import React from 'react';
import AuthenticationTemplate from '../../components/templates/AuthenticationTemplate';
import LoginBox from '../../components/organisms/LoginBox';

type Props = {
  onLoginSuccess: (token: string) => void;
};

const LoginPage = ({ onLoginSuccess }: Props) => {
  const { mutate, isError, error } = useMutation({
    mutationFn: login,
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
