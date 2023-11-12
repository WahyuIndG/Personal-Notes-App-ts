import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ItemList } from '../organisms';
import SearchBar from '../organisms/SearchBar';
import NavBar from '../organisms/NavBar';

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

const NotesPageTemplate = ({ notes, isNotesActive }: Props) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const defaultKeyword = searchParam.get('title');

  const [keyword, setKeyword] = useState(defaultKeyword || '');

  function handleKeywordChange(newKeyword: string) {
    setSearchParam({ title: newKeyword });
    setKeyword(newKeyword);
  }

  const filteredNotes = notes.filter((note) => note.title.toLocaleLowerCase().includes(keyword));

  return (
    <>
      <main>
        <ItemList notes={filteredNotes} isNotesActive={isNotesActive} />
        <SearchBar keyword={keyword} onKeywordChange={handleKeywordChange} />
      </main>
    </>
  );
};

export default NotesPageTemplate;
