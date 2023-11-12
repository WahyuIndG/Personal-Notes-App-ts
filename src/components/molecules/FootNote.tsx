import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LocaleContext from '../../contexts/LocaleContext';

type Props = {
  desc: { en: string; id: string };
  descLink: { en: string; id: string };
  to: string;
};

const FootNote = ({ desc, descLink, to }: Props) => {
  const { locale } = useContext(LocaleContext);

  return (
    <p>
      {locale === 'en' ? desc.en : desc.id}
      {'  '}
      <Link to={to}>{locale === 'en' ? descLink.en : descLink.id}</Link>
    </p>
  );
};

export default FootNote;
