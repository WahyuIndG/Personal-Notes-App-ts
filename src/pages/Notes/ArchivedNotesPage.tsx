import { getArchivedNotes } from '../../services/notes';
import { NotesPageTemplate } from '../../components/templates';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function ArchivedNotesPage() {
  const { data: notes = [] } = useSuspenseQuery({
    queryKey: getArchivedNotes().queryKey,
    queryFn: getArchivedNotes().queryFn,
    staleTime: 300000,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return <NotesPageTemplate notes={notes} isNotesActive={false} />;
}
