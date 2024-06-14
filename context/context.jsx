import React, { createContext, useContext, useState } from 'react';

// Labels Context
const LabelContext = createContext();
export const useLabels = () => useContext(LabelContext);

export const LabelProvider = ({ children }) => {
  const [labels, setLabels] = useState([]);
  const addLabel = (label) => setLabels((prevLabels) => [...prevLabels, label]);
  const updateLabel = (updatedLabel) => {
    setLabels((prevLabels) =>
      prevLabels.map((label) => (label.id === updatedLabel.id ? updatedLabel : label))
    );
  };
  const deleteLabel = (labelId) => setLabels((prevLabels) => prevLabels.filter((label) => label.id !== labelId));

  return (
    <LabelContext.Provider value={{ labels, addLabel, updateLabel, deleteLabel }}>
      {children}
    </LabelContext.Provider>
  );
};

// Notes Context
const NotesContext = createContext();
export const useNotes = () => useContext(NotesContext);

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
