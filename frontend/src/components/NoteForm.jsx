import React, { useState } from "react";

const NoteForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("All fields are required");
      return;
    }

    onAdd({ title, content });

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Enter Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;