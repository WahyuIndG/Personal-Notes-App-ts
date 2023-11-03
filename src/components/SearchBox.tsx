import { useContext } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import LocaleContext from '../contexts/LocaleContext';

interface SearchBoxProps {
  keyword: string;
  onSearch: (data: string) => void;
}

const SearchBox = ({ keyword, onSearch }: SearchBoxProps) => {
  const { locale } = useContext(LocaleContext);

  return (
    <div className="search-box">
      <BiSearchAlt />
      <input
        type="text"
        placeholder={locale === 'en' ? 'Search here ...' : 'Cari disini ...'}
        value={keyword}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
