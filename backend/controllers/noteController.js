const Note = require("../models/Note");
const path = require("path");
const fs = require("fs");
const logAction = require("../utils/logger");

// CREATE NOTE
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({ title, content });

    logAction(`Note Created: ${note._id}`);

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Create failed" });
  }
};

// GET NOTES
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

// DELETE NOTE
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) return res.status(404).json({ message: "Not found" });

    logAction(`Note Deleted: ${note._id}`);

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// EXPORT NOTES
exports.exportNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    let fileData = "All Notes\n\n";

    notes.forEach((note, index) => {
      fileData += `Note ${index + 1}\n`;
      fileData += `Title: ${note.title}\n`;
      fileData += `Content: ${note.content}\n`;
      fileData += "----------------------\n";
    });

    const filePath = path.join(__dirname, "../exports/notes.txt");

    fs.writeFileSync(filePath, fileData);

    logAction("Notes Exported");

    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: "Export failed" });
  }
};