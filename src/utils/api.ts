import axios from 'axios';

interface Note {
  id: string;
  title: string;
  body: string;
  owner: string;
  archived: boolean;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const BASE_URL = 'https://notes-api.dicoding.dev/v1';

function getAccessToken(): string | null {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken: string) {
  localStorage.setItem('accessToken', accessToken);
}

async function login(credentials: { email: string; password: string }): Promise<string> {
  try {
    const response = await axios.post(`${BASE_URL}/login`, JSON.stringify(credentials), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data.data.accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        console.error('HTTP error occured: ', error.response.status, error.response.data);
        throw new Error(error.response?.data?.message);
      } else {
        console.error('Another error occurred: ', error);
        throw error;
      }
    }
    throw error;
  }
}

async function register(credentials: { name: string; email: string; password: string }): Promise<void> {
  try {
    await axios.post(`${BASE_URL}/register`, JSON.stringify(credentials), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        console.error('HTTP error occured: ', error.response.status, error.response.data);
        throw new Error(error.response?.data?.message);
      } else {
        console.error('Another error occurred: ', error);
        throw error;
      }
    }
  }
}

async function getUserLogged(): Promise<User> {
  try {
    const response = await axios.get(`${BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        console.error('HTTP error occured: ', error.response.status, error.response.data);
      } else {
        console.error('Another error occurred: ', error);
      }
    }
    throw error;
  }
}

async function addNote(data: { title: string; body: string }): Promise<Note> {
  try {
    const response = await axios.post(`${BASE_URL}/notes`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        console.error('HTTP error occured: ', error.response.status, error.response.data);
      } else {
        console.error('Another error occurred: ', error);
      }
    }
    throw error;
  }
}

async function getActiveNotes(): Promise<Note[]> {
  try {
    const response = await axios.get(`${BASE_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        console.error('HTTP error occured: ', error.response.status, error.response.data);
      } else {
        console.error('Another error occurred: ', error);
      }
    }

    throw error;
  }
}

async function getArchivedNotes(): Promise<Note[]> {
  try {
    const response = await axios.get(`${BASE_URL}/notes/archived`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        console.error('HTTP error occured: ', error.response.status, error.response.data);
      } else {
        console.error('Another error occurred: ', error);
      }
    }
    throw error;
  }
}

async function getNote(id: string): Promise<Note> {
  try {
    const response = await axios.get(`${BASE_URL}/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        console.error('HTTP error occured: ', error.response.status, error.response.data);
      } else {
        console.error('Another error occurred: ', error);
      }
    }
    throw error;
  }
}

async function archiveNote(id: string) {
  try {
    await axios.post(`${BASE_URL}/notes/${id}/archive`, null, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        console.error('HTTP error occured: ', error.response.status, error.response.data);
        throw new Error(error.response?.data?.message);
      } else {
        console.error('Another error occurred: ', error);
        throw error;
      }
    }
    throw error;
  }
}

async function unarchiveNote(id: string) {
  try {
    await axios.post(`${BASE_URL}/notes/${id}/unarchive`, null, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        console.error('HTTP error occured: ', error.response.status, error.response.data);
        throw new Error(error.response?.data?.message);
      } else {
        console.error('Another error occurred: ', error);
        throw error;
      }
    }
    throw error;
  }
}

async function deleteNote(id: string) {
  try {
    await axios.delete(`${BASE_URL}/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        console.error('HTTP error occured: ', error.response.status, error.response.data);
        throw new Error(error.response?.data?.message);
      } else {
        console.error('Another error occurred: ', error);
        throw error;
      }
    }
    throw error;
  }
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  getActiveNotes,
  getArchivedNotes,
  archiveNote,
  unarchiveNote,
  getNote,
  addNote,
  deleteNote,
};
