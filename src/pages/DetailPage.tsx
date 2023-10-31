/* eslint-disable indent */
import { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RxArchive } from 'react-icons/rx';
import { FiTrash2 } from 'react-icons/fi';
import { getNote, archiveNote, deleteNote, unarchiveNote } from '../utils/api';
import { getRandomColor, getLetter } from '../utils/helper';
import Button from '../components/Button';
import LocaleContext from '../contexts/LocaleContext';
import LoadingScreen from '../components/LoadingScreen';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function DetailPage() {
  const queryClient = useQueryClient();
  const { id = '' } = useParams();
  const { locale } = useContext(LocaleContext);
  const navigate = useNavigate();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNote(id),
  });

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError]);

  interface Note {
    id: string;
    title: string;
    body: string;
    owner: string;
    archived: boolean;
    createdAt: string;
  }

  function isNote(value: unknown): value is Note {
    if (typeof value === 'object' && value !== null) {
      return (
        'id' in value &&
        'title' in value &&
        'body' in value &&
        'owner' in value &&
        'archived' in value &&
        'created' in value
      );
    }
    return false;
  }

  function isArrayOfNote(value: unknown): value is Note[] {
    if (Array.isArray(value)) {
      value.every((item) => isNote(item));
    }
    return false;
  }

  const { mutate: onArchiveHandler } = useMutation({
    mutationFn: archiveNote,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(['activeNotes'], (oldActiveNotes: Note[] | undefined) => {
        if (isArrayOfNote(oldActiveNotes)) {
          const newActiveNotes = oldActiveNotes.filter((note) => note.id !== variables);

          return newActiveNotes;
        }
        return undefined;
      });
      queryClient.setQueryData(['archivedNotes'], (oldActiveNotes: Note[] | undefined) => {
        if (oldActiveNotes !== undefined) {
          const cachedNote: Note | undefined = queryClient.getQueryData(['note', variables]);

          if (cachedNote !== undefined) {
            return [...oldActiveNotes, { ...cachedNote, archiveNote: true }];
          }
        }
        return undefined;
      });
      navigate('/');
    },
  });

  const { mutate: onUnarchiveHandler } = useMutation({
    mutationFn: unarchiveNote,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(['activeNotes'], (oldActiveNotes: Note[] | undefined) => {
        if (oldActiveNotes !== undefined) {
          const cachedNote: Note | undefined = queryClient.getQueryData(['note', variables]);

          if (cachedNote !== undefined) {
            return [...oldActiveNotes, { ...cachedNote, archived: false }];
          }
        }
        return undefined;
      });

      queryClient.setQueryData(['archivedNotes'], (oldActiveNotes: Note[] | undefined) => {
        if (oldActiveNotes !== undefined) {
          const newActiveNotes = oldActiveNotes.filter((note) => note.id !== variables);

          return newActiveNotes;
        }
        return undefined;
      });
      navigate('/');
    },
  });

  const { mutate: onDeleteHandler } = useMutation({
    mutationFn: deleteNote,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(['activeNotes'], (oldActiveNotes: Note[] | undefined) => {
        if (oldActiveNotes !== undefined) {
          return oldActiveNotes.filter((note) => note.id !== variables);
        }
        return undefined;
      });
      queryClient.setQueryData(['archivedNotes'], (oldArchivedNotes: Note[] | undefined) => {
        if (oldArchivedNotes !== undefined) {
          return oldArchivedNotes.filter((note) => note.id !== variables);
        }
        return undefined;
      });
      navigate('/');
    },
  });

  const color = getRandomColor();
  const letter = getLetter(note?.title || '');

  return (
    <main>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
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
              <Button
                onSubmitHandler={note?.archived ? () => onUnarchiveHandler(id) : () => onArchiveHandler(id)}
                Icon={RxArchive}
              >
                {locale === 'en'
                  ? note?.archived
                    ? 'Unarchive It'
                    : 'Archive It'
                  : note?.archived
                  ? 'Batal Arsip'
                  : 'Arsipkan'}
              </Button>
              <Button onSubmitHandler={() => onDeleteHandler(id)} Icon={FiTrash2}>
                {locale === 'en' ? 'Delete !' : 'Hapus !'}
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default DetailPage;
