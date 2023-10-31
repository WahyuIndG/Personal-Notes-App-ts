import { useContext } from 'react';
import Item from './Item';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import LocaleContext from '../contexts/LocaleContext';
/**
 *       "id": "notes-jT-jjsyz61J8XKiI",
      "title": "Welcome to Notes, Dimas!",
      "body": "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
      "createdAt": "2022-07-28T10:03:12.594Z",
      "archived": false,
      "owner": "user-l-wposXQYGosf0ZA"
 */
interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
  owner: string;
}

interface ListItemProps {
  notes: Note[];
  isHome: boolean;
}

const ListItem = ({ notes, isHome }: ListItemProps) => {
  const { locale } = useContext(LocaleContext);

  if (!notes.length) {
    return (
      <>
        {isHome ? (
          <>
            <div className="add-item" style={{ margin: '40px 50px' }}>
              <Link to={'/add'}>
                <FiPlus />
                <span>{locale === 'en' ? 'New Note' : 'Buat Baru'}</span>
              </Link>
            </div>
            <p className="not-found">{locale === 'en' ? 'Notes is Empty 🤔' : 'Catatan Kosong 🤔'}</p>
          </>
        ) : (
          <p className="not-found">{locale === 'en' ? 'Notes is Empty 🤔' : 'Catatan Kosong 🤔'}</p>
        )}
      </>
    );
  }

  return (
    <div className="list">
      {isHome && (
        <div className="add-item">
          <Link to={'/add'}>
            <FiPlus />
            <span>{locale === 'en' ? 'New Note' : 'Buat Baru'}</span>
          </Link>
        </div>
      )}
      {notes.map((note) => {
        return (
          <Link to={`/detail-page/${note.id}`} key={note.id}>
            <Item {...note} />
          </Link>
        );
      })}
    </div>
  );
};

export default ListItem;
