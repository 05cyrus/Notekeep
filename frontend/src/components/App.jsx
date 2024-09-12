import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";


function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/notes")
      .then(response => setNotes(response.data))
      .catch(error => console.error(error));
  }, []);

  function addNote(newNote) {
    axios.post("http://localhost:5000/api/notes", newNote)
      .then(response => {
        setNotes(prevNotes => [...prevNotes, response.data]);
      })
      .catch(error => console.error(error));
  }

  function deleteNote(id) {
    axios.delete(`http://localhost:5000/api/notes/${id}`)
      .then(() => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      })
      .catch(error => console.error(error));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note, index) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
