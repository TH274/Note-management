import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useNotes } from '../context/context';

const TrashScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { notes, updateNote } = useNotes();
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    const trashNotes = notes.filter(note => note.trash);
    setFilteredNotes(trashNotes);
  }, [isFocused, notes]);

  const restoreNote = (noteId) => {
    updateNote({
      ...notes.find(note => note.id === noteId),
      trash: false,
    });
    navigation.navigate('Home', { refresh: true });
  };

  const deleteNotePermanently = (noteId) => {
    updateNote({
      ...notes.find(note => note.id === noteId),
      trash: false,
      deleted: true, // Or however you handle permanent deletion
    });
    Alert.alert('Note deleted permanently!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.notesCount}>{filteredNotes.length} notes in trash</Text>
        <View style={styles.buttonsRight}>
          <TouchableOpacity style={styles.restoreButton} onPress={() => filteredNotes.forEach(note => restoreNote(note.id))}>
            <Text style={styles.restoreButtonText}>Restore</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.emptyButton} onPress={() => filteredNotes.forEach(note => deleteNotePermanently(note.id))}>
            <Text style={styles.emptyButtonText}>Empty</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.textAlert}>No notes found</Text>}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.noteTime}>{item.time}</Text>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteContent}>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  notesCount: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#74c1fa',
  },
  textAlert: {
    textAlign: 'center',
    marginTop: 40,
    color: 'gray',
  },
  noteContainer: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  noteTime: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5,
  },
  noteTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteContent: {
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWrapper: {
    marginHorizontal: 4,
  },
  restoreButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  restoreButtonText: {
    color: 'black',
    fontWeight: '500',
  },
  emptyButton: {
    backgroundColor: '#FF6969',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  emptyButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default TrashScreen;
