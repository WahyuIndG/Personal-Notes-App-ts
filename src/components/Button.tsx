import React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
  Icon: IconType | null;
  children?: React.ReactNode | null;
  onSubmitHandler: (...args: any[]) => void;
  title?: string;
}

const Button = ({ Icon, onSubmitHandler, children, title }: ButtonProps) => {
  if (Icon === null) {
    return (
      <button className="button" onClick={onSubmitHandler} title={title}>
        {children}
      </button>
    );
  } else if (children === null) {
    return (
      <button className="button" onClick={onSubmitHandler} title={title}>
        <Icon />
      </button>
    );
  } else {
    return (
      <button className="button" onClick={onSubmitHandler} title={title}>
        <Icon /> <span>{children}</span>
      </button>
    );
  }
};

export default Button;
