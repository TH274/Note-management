import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useNotes } from '../context/context';

const TrashScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { notes, deleteNote } = useNotes();
  const trashNotes = notes.filter(note => note.trash);

  useEffect(() => {
  }, [isFocused]);

  const restoreNote = (noteId) => {
    const note = notes.find(note => note.id === noteId);
    if (note) {
      note.trash = false;
      deleteNote(noteId);
      navigation.navigate('Home', { refresh: true });
    }
  };

  const deleteNotePermanently = (noteId) => {
    deleteNote(noteId);
    Alert.alert('Note deleted permanently!');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={trashNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <Text>{item.content}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Restore" onPress={() => restoreNote(item.id)} />
              <Button title="Delete" color="red" onPress={() => deleteNotePermanently(item.id)} />
            </View>
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
  noteContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default TrashScreen;
