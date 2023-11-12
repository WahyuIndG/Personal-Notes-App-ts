import React, { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';
import { IconType } from 'react-icons/lib';

type Props = {
  icon: IconType;
  children?: { en: string; id: string };
  onClick?: () => void;
  title: { en: string; id: string };
  type?: 'button' | 'submit' | 'reset';
};

const ButtonIcon = ({ icon: Icon, children, onClick, title, type = 'button' }: Props) => {
  const { locale } = useContext(LocaleContext);

  return (
    <button type={type} onClick={onClick} title={locale === 'en' ? title.en : title.id}>
      <Icon />
      {children && (locale === 'en' ? children.en : children.id)}
    </button>
  );
};

export default ButtonIcon;
