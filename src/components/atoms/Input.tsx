import React, { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';

type Props = {
  type: string;
  id: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  placeholder: { en: string; id: string };
};

const Input = ({ type, id, value, onChange, placeholder }: Props) => {
  const { locale } = useContext(LocaleContext);

  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={locale === 'en' ? placeholder.en : placeholder.id}
    />
  );
};

export default Input;
