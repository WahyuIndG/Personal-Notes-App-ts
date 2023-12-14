import * as API from '../utils/api';

export const loginApp = () => ({
  mutationKey: ['login'],
  mutationFn: API.login,
});

export const registerApp = () => ({
  mutattionKey: ['register'],
  mutationFn: API.register,
});

export const getAuthUser = () => ({
  queryKey: ['authUser'],
  queryFn: API.getUserLogged,
});

export const getActiveNotes = () => ({
  queryKey: ['notes', { archived: false }],
  queryFn: API.getActiveNotes,
});

export const getArchivedNotes = () => ({
  queryKey: ['notes', { archived: true }],
  queryFn: API.getArchivedNotes,
});

export const getNote = (id: string) => ({
  queryKey: ['note', id],
  queryFn: () => API.getNote(id),
});

export const createNote = () => ({
  mutationKey: ['note'],
  mutataionFn: API.addNote,
});

export const archiveNote = (id: string) => ({
  mutationKey: ['note', id, 'archive'],
  mutataionFn: (id: string) => API.archiveNote(id),
});

export const unarchiveNote = (id: string) => ({
  mutationKey: ['note', id, 'unarchive'],
  mutataionFn: (id: string) => API.unarchiveNote(id),
});

export const deleteNote = (id: string) => ({
  mutationKey: ['note', id, 'delete'],
  mutataionFn: (id: string) => API.deleteNote(id),
});
