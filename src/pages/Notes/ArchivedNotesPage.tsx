import { getArchivedNotes } from '../../utils/api';
import { NotesPageTemplate } from '../../components/templates';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function ArchivedNotesPage() {
  const { data: notes = [] } = useSuspenseQuery({
    queryKey: ['notes', { archived: true }],
    queryFn: getArchivedNotes,
    staleTime: 300000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return <NotesPageTemplate notes={notes} isNotesActive={false} />;
}
