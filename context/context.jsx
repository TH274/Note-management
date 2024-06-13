import React, { createContext, useContext, useState } from 'react';

// Create LabelContext
const LabelContext = createContext();

// Custom hook to use LabelContext
export const useLabels = () => useContext(LabelContext);

// Provider component for LabelContext
export const LabelProvider = ({ children }) => {
  const [labels, setLabels] = useState([]);

  const addLabel = (label) => {
    setLabels((prevLabels) => [...prevLabels, label]);
  };

  const updateLabel = (updatedLabel) => {
    setLabels((prevLabels) =>
      prevLabels.map((label) =>
        label.id === updatedLabel.id ? updatedLabel : label
      )
    );
  };

  const deleteLabel = (labelId) => {
    setLabels((prevLabels) => prevLabels.filter((label) => label.id !== labelId));
  };

  return (
    <LabelContext.Provider
      value={{ labels, addLabel, updateLabel, deleteLabel }}
    >
      {children}
    </LabelContext.Provider>
  );
};

// Create NotesContext
const NotesContext = createContext();

// Custom hook to use NotesContext
export const useNotes = () => useContext(NotesContext);

// Provider component for NotesContext
export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const updateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      )
    );
  };

  const deleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  return (
    <NotesContext.Provider
      value={{ notes, addNote, updateNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};
