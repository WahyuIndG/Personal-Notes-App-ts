import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AddItemNav from './AddItemNav';
import Item from './Item';
import LocaleContext from '../../contexts/LocaleContext';

interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
  owner: string;
}

type Props = {
  notes: Note[];
  isNotesActive: boolean;
};

const ItemList = ({ notes, isNotesActive }: Props) => {
  const { locale } = useContext(LocaleContext);

  if (notes.length === 0) {
    return (
      <>
        {isNotesActive && (
          <div style={{ margin: '40px 50px' }}>
            <AddItemNav />
          </div>
        )}
        <p className="not-found">{locale === 'en' ? 'Notes is Empty 🤔' : 'Catatan Kosong 🤔'}</p>
      </>
    );
  }

  return (
    <div className="list">
      {isNotesActive && <AddItemNav />}
      {notes.map((note) => (
        <Link to={`/notes/${note.id}`} key={note.id}>
          <Item {...note} />
        </Link>
      ))}
    </div>
  );
};

export default ItemList;
