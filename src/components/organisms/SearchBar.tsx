import React, { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';
import { BiSearchAlt } from 'react-icons/bi';

type Props = {
  keyword: string;
  onKeywordChange: (newKeyword: string) => void;
};

const SearchBar = ({ keyword, onKeywordChange }: Props) => {
  const { locale } = useContext(LocaleContext);

  return (
    <div className="search-box">
      <BiSearchAlt />
      <input
        type="text"
        placeholder={locale === 'en' ? 'Search here ...' : 'Cari disini ...'}
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
