import React, { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';

type Props = {
  desc: { en: string; id: string };
};

const SubHeading = ({ desc }: Props) => {
  const { locale } = useContext(LocaleContext);

  return <p>{locale === 'en' ? desc.en : desc.id}</p>;
};

export default SubHeading;
