import React from 'react';
import Alert from '../../components/organisms/Alert';
import CreateNoteForm from '../../components/organisms/CreateNoteForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../../utils/api';

type NewNote = {
  title: string;
  body: string;
};

const CreateNotePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  type Note = {
    id: string;
    title: string;
    body: string;
    createdAt: string;
    archived: boolean;
    owner: string;
  };

  const { isError, error, mutate } = useMutation({
    mutationFn: addNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['notes', { archived: false }],
        refetchType: 'inactive',
      });
      queryClient.setQueryData(
        ['notes', { archived: false }],
        (oldActiveNotes: Note[] | undefined) => {
          if (oldActiveNotes !== undefined) {
            return [...oldActiveNotes, data];
          }
          return undefined;
        }
      );
      navigate('/');
    },
  });

  function handleSubmit(e: React.FormEvent, newNote: NewNote) {
    e.preventDefault();
    mutate(newNote);
  }

  return (
    <main>
      <CreateNoteForm onSubmit={handleSubmit} />
      <Alert message={error?.message} show={isError} />
    </main>
  );
};

export default CreateNotePage;
