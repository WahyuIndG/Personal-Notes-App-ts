import React, { useContext } from 'react';
import Button from '../components/Button';
import { addNote } from '../utils/api';
import { LuSend } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import useInput from '../Hooks/useInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Alert from '../components/Alert';

function AddPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);
  const [title, setTitle] = useInput();
  const [body, setBody] = useInput();

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
      queryClient.invalidateQueries({ queryKey: ['notes', { archived: false }], refetchType: 'inactive' });
      queryClient.setQueryData(['notes', { archived: false }], (oldActiveNotes: Note[] | undefined) => {
        if (oldActiveNotes !== undefined) {
          return [...oldActiveNotes, data];
        }
        return undefined;
      });
      navigate('/');
    },
  });

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({ title, body });
  };

  return (
    <main>
      <form className="form">
        <div className="input-group">
          <label htmlFor="title">{locale === 'en' ? 'Title' : 'Judul'}</label>
          <input
            type="text"
            placeholder={locale === 'en' ? 'Take Care of Cute Shiba . . .' : 'Menjaga Shiba Yang Lucu . . . '}
            onChange={setTitle}
            value={title}
          />
        </div>
        <div className="input-group">
          <label htmlFor="desc">{locale === 'en' ? 'Description' : 'Deskripsi'}</label>
          <textarea
            name="desc"
            cols={30}
            rows={10}
            placeholder={
              locale === 'en' ? 'Something About Your Beloved Shiba . . .' : 'Hal Apa pun Tentang Shiba Tercinta . . .'
            }
            onChange={setBody}
            value={body}
          ></textarea>
        </div>
        <div className="button-group">
          <Button onSubmitHandler={onSubmitHandler} Icon={LuSend}>
            Add It !
          </Button>
        </div>
      </form>
      <Alert message={error?.message} show={isError} />
    </main>
  );
}

export default AddPage;
