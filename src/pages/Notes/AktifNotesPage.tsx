import { NotesPageTemplate } from '../../components/templates';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getActiveNotes } from '../../services/notes';

const AktifNotesPage = () => {
  const { data: notes = [] } = useSuspenseQuery({
    queryKey: getActiveNotes().queryKey,
    queryFn: getActiveNotes().queryFn,
    staleTime: 300000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return <NotesPageTemplate notes={notes} isNotesActive={true} />;
};

export default AktifNotesPage;
