import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNotes } from '../context/context';

const NoteSelector = ({ route }) => {
  const { folderId } = route.params;
  const { notes, updateNote } = useNotes();
  const navigation = useNavigation();
  const [selectedNotes, setSelectedNotes] = useState([]);

  const availableNotes = notes.filter(note => note.folderId !== folderId);

  const handleSelectNote = (noteId) => {
    if (selectedNotes.includes(noteId)) {
      setSelectedNotes(selectedNotes.filter(id => id !== noteId));
    } else {
      setSelectedNotes([...selectedNotes, noteId]);
    }
  };

  const handleAddNotesToFolder = () => {
    selectedNotes.forEach(noteId => {
      const note = notes.find(n => n.id === noteId);
      updateNote({ ...note, folderId });
    });
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.noteItem, selectedNotes.includes(item.id) && styles.selectedNote]}
      onPress={() => handleSelectNote(item.id)}
    >
      <Text>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={availableNotes}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddNotesToFolder}>
        <Text style={styles.addButtonText}>Add to Folder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  selectedNote: {
    backgroundColor: '#74c1fa',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#74c1fa',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default NoteSelector;
