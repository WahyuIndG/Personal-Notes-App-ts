import React from 'react';
import { Input } from '../atoms';
import { IconType } from 'react-icons';

type Props = {
  icon: IconType;
  type: string;
  id: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  placeholder: { en: string; id: string };
  htmlFor: string;
};

const FormInput = ({ icon: Icon, type, id, value, htmlFor, onChange, placeholder }: Props) => {
  return (
    <label htmlFor={htmlFor}>
      <i>
        <Icon />
      </i>
      <Input type={type} id={id} value={value} onChange={onChange} placeholder={placeholder} />
    </label>
  );
};

export default FormInput;
