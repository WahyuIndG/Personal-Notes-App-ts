import { useParams, useNavigate } from 'react-router-dom';
import { RxArchive } from 'react-icons/rx';
import { FiTrash2 } from 'react-icons/fi';
import { getNote, archiveNote, deleteNote, unarchiveNote } from '../../services/notes';
import { getRandomColor, getLetter } from '../../utils/helper';
import { useMutation, useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { ButtonIcon } from '../../components/atoms';
import { descNoteButton } from '../../utils/transcript-data';

const DetailNotePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id = '' } = useParams();

  const { data: note } = useSuspenseQuery({
    queryKey: getNote(id).queryKey,
    queryFn: getNote(id).queryFn,
  });

  type Note = {
    id: string;
    title: string;
    body: string;
    owner: string;
    archived: boolean;
    createdAt: string;
  };

  const { mutate: mutateArchive } = useMutation({
    mutationKey: archiveNote(id).mutationKey,
    mutationFn: archiveNote(id).mutataionFn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['notes', { archived: false }],
        refetchType: 'inactive',
      });
      queryClient.invalidateQueries({
        queryKey: ['notes', { archived: true }],
        refetchType: 'inactive',
      });
      queryClient.setQueryData(
        ['notes', { archived: false }],
        (oldActiveNotes: Note[] | undefined) => {
          if (oldActiveNotes !== undefined) {
            const newActiveNotes = oldActiveNotes.filter((note) => note.id !== variables);

            return newActiveNotes;
          }
          return undefined;
        }
      );
      queryClient.setQueryData(
        ['notes', { archived: true }],
        (oldActiveNotes: Note[] | undefined) => {
          if (oldActiveNotes !== undefined) {
            const cachedNote: Note | undefined = queryClient.getQueryData(['note', variables]);

            if (cachedNote !== undefined) {
              return [...oldActiveNotes, { ...cachedNote, archiveNote: true }];
            }
          }
          return undefined;
        }
      );
      navigate('/');
    },
  });

  const { mutate: mutateUnarchive } = useMutation({
    mutationKey: unarchiveNote(id).mutationKey,
    mutationFn: unarchiveNote(id).mutataionFn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['notes', { archived: false }],
        refetchType: 'inactive',
      });
      queryClient.invalidateQueries({
        queryKey: ['notes', { archived: true }],
        refetchType: 'inactive',
      });

      queryClient.setQueryData(
        ['notes', { archived: false }],
        (oldActiveNotes: Note[] | undefined) => {
          if (oldActiveNotes !== undefined) {
            const cachedNote: Note | undefined = queryClient.getQueryData(['note', variables]);

            if (cachedNote !== undefined) {
              return [...oldActiveNotes, { ...cachedNote, archived: false }];
            }
          }
          return undefined;
        }
      );

      queryClient.setQueryData(
        ['notes', { archived: true }],
        (oldActiveNotes: Note[] | undefined) => {
          if (oldActiveNotes !== undefined) {
            const newActiveNotes = oldActiveNotes.filter((note) => note.id !== variables);

            return newActiveNotes;
          }
          return undefined;
        }
      );
      navigate('/');
    },
  });

  const { mutate: mutateDelete } = useMutation({
    mutationKey: deleteNote(id).mutationKey,
    mutationFn: deleteNote(id).mutataionFn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['notes', { archived: false }],
        refetchType: 'inactive',
      });
      queryClient.invalidateQueries({
        queryKey: ['notes', { archived: true }],
        refetchType: 'inactive',
      });

      queryClient.setQueryData(
        ['notes', { archived: false }],
        (oldActiveNotes: Note[] | undefined) => {
          if (oldActiveNotes !== undefined) {
            return oldActiveNotes.filter((note) => note.id !== variables);
          }
          return undefined;
        }
      );
      queryClient.setQueryData(
        ['notes', { archived: true }],
        (oldArchivedNotes: Note[] | undefined) => {
          if (oldArchivedNotes !== undefined) {
            return oldArchivedNotes.filter((note) => note.id !== variables);
          }
          return undefined;
        }
      );
      navigate('/');
    },
  });

  function handleArchive() {
    mutateArchive(note.id);
  }

  function handleUnarchive() {
    mutateUnarchive(note.id);
  }

  function handleDelete() {
    mutateDelete(note.id);
  }

  const color = getRandomColor();
  const letter = getLetter(note?.title || '');

  return (
    <main>
      <div className="detail-container">
        <div className="input-group" style={{ backgroundColor: color }}>
          <span style={{ color }} className="mini-box">
            {letter}
          </span>
          <h1>{note?.title}</h1>
        </div>
        <div className="input-group">
          <p style={{ minHeight: '10rem' }}>{note?.body}</p>
        </div>
        <div className="button-group">
          <ButtonIcon
            onClick={note.archived ? handleUnarchive : handleArchive}
            icon={RxArchive}
            title={note.archived ? descNoteButton.archived : descNoteButton.active}
          >
            {note.archived ? descNoteButton.archived : descNoteButton.active}
          </ButtonIcon>
          <ButtonIcon onClick={handleDelete} icon={FiTrash2} title={descNoteButton.delete}>
            {descNoteButton.delete}
          </ButtonIcon>
        </div>
      </div>
    </main>
  );
};

export default DetailNotePage;
