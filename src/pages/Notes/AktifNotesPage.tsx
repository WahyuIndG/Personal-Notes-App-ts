import { getActiveNotes } from '../../utils/api';
import { NotesPageTemplate } from '../../components/templates';
import { useSuspenseQuery } from '@tanstack/react-query';

const AktifNotesPage = () => {
  const { data: notes = [] } = useSuspenseQuery({
    queryKey: ['notes', { archived: false }],
    queryFn: getActiveNotes,
    staleTime: 300000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return <NotesPageTemplate notes={notes} isNotesActive={true} />;
};

export default AktifNotesPage;
