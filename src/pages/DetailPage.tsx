/* eslint-disable indent */
import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RxArchive } from 'react-icons/rx';
import { FiTrash2 } from 'react-icons/fi';
import { getNote, archiveNote, deleteNote, unarchiveNote } from '../utils/api';
import { getRandomColor, getLetter } from '../utils/helper';
import Button from '../components/Button';
import LocaleContext from '../contexts/LocaleContext';
import { useMutation, useSuspenseQuery, useQueryClient } from '@tanstack/react-query';

function DetailPage() {
  const queryClient = useQueryClient();
  const { id = '' } = useParams();
  const { locale } = useContext(LocaleContext);
  const navigate = useNavigate();

  const { data: note } = useSuspenseQuery({
    queryKey: ['note', id],
    queryFn: () => getNote(id),
  });

  interface Note {
    id: string;
    title: string;
    body: string;
    owner: string;
    archived: boolean;
    createdAt: string;
  }

  const { mutate: onArchiveHandler } = useMutation({
    mutationFn: archiveNote,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['notes', { archived: false }],
        refetchType: 'inactive',
      });
      queryClient.invalidateQueries({
        queryKey: ['notes', { archived: true }],
        refetchType: 'inactive',
      });
      queryClient.setQueryData(['notes', { archived: false }], (oldActiveNotes: Note[] | undefined) => {
        if (oldActiveNotes !== undefined) {
          const newActiveNotes = oldActiveNotes.filter((note) => note.id !== variables);

          return newActiveNotes;
        }
        return undefined;
      });
      queryClient.setQueryData(['notes', { archived: true }], (oldActiveNotes: Note[] | undefined) => {
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
      queryClient.invalidateQueries({
        queryKey: ['notes', { archived: false }],
        refetchType: 'inactive',
      });
      queryClient.invalidateQueries({
        queryKey: ['notes', { archived: true }],
        refetchType: 'inactive',
      });

      queryClient.setQueryData(['notes', { archived: false }], (oldActiveNotes: Note[] | undefined) => {
        if (oldActiveNotes !== undefined) {
          const cachedNote: Note | undefined = queryClient.getQueryData(['note', variables]);

          if (cachedNote !== undefined) {
            return [...oldActiveNotes, { ...cachedNote, archived: false }];
          }
        }
        return undefined;
      });

      queryClient.setQueryData(['notes', { archived: true }], (oldActiveNotes: Note[] | undefined) => {
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
      queryClient.invalidateQueries({
        queryKey: ['notes', { archived: false }],
        refetchType: 'inactive',
      });
      queryClient.invalidateQueries({
        queryKey: ['notes', { archived: true }],
        refetchType: 'inactive',
      });

      queryClient.setQueryData(['notes', { archived: false }], (oldActiveNotes: Note[] | undefined) => {
        if (oldActiveNotes !== undefined) {
          return oldActiveNotes.filter((note) => note.id !== variables);
        }
        return undefined;
      });
      queryClient.setQueryData(['notes', { archived: true }], (oldArchivedNotes: Note[] | undefined) => {
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
    </main>
  );
}

export default DetailPage;
