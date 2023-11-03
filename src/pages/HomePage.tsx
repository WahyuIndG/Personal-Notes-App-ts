import { useState } from 'react';
import ListItem from '../components/ListItem';
import SearchBox from '../components/SearchBox';
import { useSearchParams } from 'react-router-dom';
import { getActiveNotes } from '../utils/api';
import { searchNotes } from '../utils/helper';
import { useSuspenseQuery } from '@tanstack/react-query';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const titleParam = searchParams.get('title');
  const [query, setQuery] = useState(titleParam || '');
  const { data: notes = [] } = useSuspenseQuery({
    queryKey: ['notes', { archived: false }],
    queryFn: getActiveNotes,
    staleTime: 300000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  function onSearchHandler(newKeyword: string) {
    setQuery(newKeyword);
    setSearchParams({ title: newKeyword });
  }
  return (
    <main>
      <ListItem notes={searchNotes(query, notes)} isHome={true} />
      <SearchBox onSearch={onSearchHandler} keyword={query} />
    </main>
  );
}

export default HomePage;
