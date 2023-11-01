import { useState } from 'react';
import ListItem from '../components/ListItem';
import SearchBox from '../components/SearchBox';
import { useSearchParams } from 'react-router-dom';
import { getActiveNotes } from '../utils/api';
import { searchNotes } from '../utils/helper';
import LoadingScreen from '../components/LoadingScreen';
import { useQuery } from '@tanstack/react-query';
import Alert from '../components/Alert';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const titleParam = searchParams.get('title');
  const [query, setQuery] = useState(titleParam || '');
  const {
    data: notes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['notes', { archived: false }],
    queryFn: getActiveNotes,
    staleTime: 300000,
  });

  function onSearchHandler(newKeyword: string) {
    setQuery(newKeyword);
    setSearchParams({ title: newKeyword });
  }

  return (
    <main>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <ListItem notes={searchNotes(query, notes)} isHome={true} />
          <SearchBox onSearchHandler={onSearchHandler} keyword={query} />
        </>
      )}
      <Alert message={error?.message} show={isError} />
    </main>
  );
}

export default HomePage;
