import { useState } from 'react';
import { searchNotes } from '../utils/helper';
import { getArchivedNotes } from '../utils/api';
import ListItem from '../components/ListItem';
import { useSearchParams } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import { useSuspenseQuery } from '@tanstack/react-query';

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const titleParams = searchParams.get('title');
  const [query, setQuery] = useState(titleParams || '');
  const { data: notes = [] } = useSuspenseQuery({
    queryKey: ['notes', { archived: true }],
    queryFn: getArchivedNotes,
    staleTime: 300000,
  });

  function onSearchHandler(newKeyword: string) {
    setQuery(newKeyword);
    setSearchParams({ title: newKeyword });
  }

  return (
    <main>
      <ListItem notes={searchNotes(query, notes)} isHome={false} />
      <SearchBox onSearch={onSearchHandler} keyword={query} />
    </main>
  );
}

export default ArchivePage;
