import { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';

type Props = {
  children: { en: string; id: string };
};

const BriefText = ({ children }: Props) => {
  const { locale } = useContext(LocaleContext);
  return <span>{locale === 'en' ? children.en : children.id}</span>;
};

export default BriefText;
