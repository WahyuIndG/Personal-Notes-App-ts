import React, { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';

type Props = {
  desc: { en: string; id: string };
};

const Heading = ({ desc }: Props) => {
  const { locale } = useContext(LocaleContext);

  return <h1>{locale === 'en' ? desc.en : desc.id}</h1>;
};

export default Heading;
