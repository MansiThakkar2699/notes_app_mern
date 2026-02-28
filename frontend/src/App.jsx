import { useEffect, useState } from 'react'
import NoteForm from './components/NoteForm';
import ExportButton from './components/ExportButton';
import NoteList from './components/NoteList';
import { getNotes, createNote, deleteNote } from "./services/noteService";
import './App.css'

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const response = await getNotes();
    setNotes(response.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async (note) => {
    await createNote(note);
    fetchNotes();
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };
  return (
   <div className="container">
      <h1>Notes Management App</h1>

      <NoteForm onAdd={handleAddNote} />
      <ExportButton />
      <NoteList notes={notes} onDelete={handleDeleteNote} />
    </div>
  )
}

export default App
