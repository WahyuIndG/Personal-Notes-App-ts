import { useState } from 'react';
import { searchNotes } from '../utils/helper';
import { getArchivedNotes } from '../utils/api';
import ListItem from '../components/ListItem';
import { useSearchParams } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import LoadingScreen from '../components/LoadingScreen';
import { useQuery } from '@tanstack/react-query';
import Alert from '../components/Alert';

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const titleParams = searchParams.get('title');
  const [query, setQuery] = useState(titleParams || '');
  const {
    data: notes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
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
      {isLoading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <>
          <ListItem notes={searchNotes(query, notes)} isHome={false} />
          <SearchBox onSearchHandler={onSearchHandler} keyword={query} />
        </>
      )}
      <Alert message={error?.message} show={isError} />
    </main>
  );
}

export default ArchivePage;
