import React, { createContext, useContext, useState } from 'react';

// Labels Context
const LabelContext = createContext();
export const useLabels = () => useContext(LabelContext);

// Notes Context
const NotesContext = createContext();
export const useNotes = () => useContext(NotesContext);

export const LabelProvider = ({ children }) => {
  const { notes, updateNote } = useNotes(); // Get notes and updateNote from NotesContext
  const [labels, setLabels] = useState([]);

  const addLabel = (label) => setLabels((prevLabels) => [...prevLabels, label]);

  const updateLabel = (updatedLabel) => {
    setLabels((prevLabels) =>
      prevLabels.map((label) => (label.id === updatedLabel.id ? updatedLabel : label))
    );
  };

  const deleteLabel = (labelId) => {
    setLabels((prevLabels) => prevLabels.filter((label) => label.id !== labelId));

    notes.forEach(note => {
      if (note.labels.includes(labelId)) {
        const updatedLabels = note.labels.filter(id => id !== labelId);
        updateNote({ ...note, labels: updatedLabels });
      }
    });
  };

  return (
    <LabelContext.Provider value={{ labels, addLabel, updateLabel, deleteLabel }}>
      {children}
    </LabelContext.Provider>
  );
};

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => setNotes((prevNotes) => [...prevNotes, note]);

  const updateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const deleteNote = (noteId) => setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

// Folders Context
const FolderContext = createContext();
export const useFolders = () => useContext(FolderContext);

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);

  const addFolder = (folder) => setFolders((prevFolders) => [...prevFolders, folder]);

  const updateFolder = (updatedFolder) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) => (folder.id === updatedFolder.id ? updatedFolder : folder))
    );
  };

  const deleteFolder = (folderId) => setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== folderId));

  return (
    <FolderContext.Provider value={{ folders, addFolder, updateFolder, deleteFolder }}>
      {children}
    </FolderContext.Provider>
  );
};
