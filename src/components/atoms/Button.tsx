import { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';

type Props = {
  onClick?: () => void;
  children: { en: string; id: string };
  type?: 'button' | 'submit' | 'reset';
};

function Button({ onClick, children, type = 'button' }: Props) {
  const { locale } = useContext(LocaleContext);
  return (
    <button type={type} onClick={onClick}>
      {locale === 'en' ? children.en : children.id}
    </button>
  );
}

export default Button;
