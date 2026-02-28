import React from "react";
import { exportNotes } from "../services/noteService";

const ExportButton = () => {
  const handleExport = async () => {
    try {
      const response = await exportNotes();

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "notes.txt");
      document.body.appendChild(link);
      link.click();

      link.remove();
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  return (
    <button onClick={handleExport}>
      Export Notes
    </button>
  );
};

export default ExportButton;