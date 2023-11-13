import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import RegistrationBox from '../../components/organisms/RegistrationBox';
import AuthenticationTemplate from '../../components/templates/AuthenticationTemplate';
import { registerApp } from '../../services/notes';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { mutate, isError, error } = useMutation({
    mutationKey: registerApp().mutattionKey,
    mutationFn: registerApp().mutationFn,
    onSuccess: () => {
      navigate('/');
    },
  });

  type Credentials = {
    name: string;
    email: string;
    password: string;
  };

  function onSubmitHandler(e: React.FormEvent, credentials: Credentials): void {
    e.preventDefault();

    mutate(credentials);
  }

  return (
    <AuthenticationTemplate message={error?.message} show={isError}>
      <RegistrationBox onSubmitHandler={onSubmitHandler} />
    </AuthenticationTemplate>
  );
};

export default RegisterPage;
