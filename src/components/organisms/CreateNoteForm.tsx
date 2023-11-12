import React, { useContext } from 'react';
import { ButtonIcon } from '../atoms';
import { LuSend } from 'react-icons/lu';
import useInput from '../../hooks/useInput';
import LocaleContext from '../../contexts/LocaleContext';
import { descCreateNote } from '../../utils/transcript-data';

type NewNote = {
  title: string;
  body: string;
};

type Props = {
  onSubmit: (e: React.FormEvent, newNote: NewNote) => void;
};

const CreateNoteForm = ({ onSubmit }: Props) => {
  const [title, setTitle] = useInput();
  const [body, setBody] = useInput();
  const { locale } = useContext(LocaleContext);

  function handleSubmit(e: React.FormEvent) {
    onSubmit(e, { title, body });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="title">
          {locale === 'en' ? descCreateNote.title.label.en : descCreateNote.title.label.id}
        </label>
        <input
          type="text"
          placeholder={
            locale === 'en'
              ? descCreateNote.title.placeholder.en
              : descCreateNote.title.placeholder.id
          }
          onChange={setTitle}
          value={title}
        />
      </div>
      <div className="input-group">
        <label htmlFor="desc">
          {locale === 'en' ? descCreateNote.body.label.en : descCreateNote.body.placeholder.id}
        </label>
        <textarea
          name="desc"
          cols={30}
          rows={10}
          placeholder={
            locale === 'en'
              ? descCreateNote.body.placeholder.en
              : descCreateNote.body.placeholder.id
          }
          onChange={setBody}
          value={body}
        ></textarea>
      </div>
      <div className="button-group">
        <ButtonIcon type="submit" icon={LuSend} title={descCreateNote.button}>
          {descCreateNote.button}
        </ButtonIcon>
      </div>
    </form>
  );
};

export default CreateNoteForm;
