import React from "react";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, onDelete }) => {
  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <p>No Notes Available</p>
      ) : (
        notes.map((note) => (
          <NoteItem key={note._id} note={note} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};

export default NoteList;