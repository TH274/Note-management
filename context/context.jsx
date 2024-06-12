import React, { createContext, useContext, useState } from 'react';

const LabelContext = createContext();

export const useLabels = () => useContext(LabelContext);

export const LabelProvider = ({ children }) => {
  const [labels, setLabels] = useState([]);
  const [folders, setFolders] = useState([]);

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

  const addFolder = (folder) => {
    setFolders((prevFolders) => [...prevFolders, folder]);
  };

  const updateFolder = (updatedFolder) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === updatedFolder.id ? updatedFolder : folder
      )
    );
  };

  const deleteFolder = (folderId) => {
    setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== folderId));
  };

  return (
    <LabelContext.Provider
      value={{ labels, addLabel, updateLabel, deleteLabel, folders, addFolder, updateFolder, deleteFolder }}
    >
      {children}
    </LabelContext.Provider>
  );
};

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);

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

  const addFolder = (folder) => {
    setFolders((prevFolders) => [...prevFolders, folder]);
  };

  const updateFolder = (updatedFolder) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === updatedFolder.id ? updatedFolder : folder
      )
    );
  };

  const deleteFolder = (folderId) => {
    setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== folderId));
  };

  return (
    <NotesContext.Provider
      value={{ notes, addNote,setNotes, updateNote, deleteNote, folders, addFolder, updateFolder, deleteFolder }}
    >
      {children}
    </NotesContext.Provider>
  );
};
