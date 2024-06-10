import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { TRASH, NOTES } from '../data/dummy-data';

const TrashScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [trashNotes, setTrashNotes] = useState(TRASH);

  useEffect(() => {
    setTrashNotes(TRASH);
  }, [isFocused]);

  const restoreNote = (noteId) => {
    const noteIndex = TRASH.findIndex(note => note.id === noteId);
    if (noteIndex !== -1) {
      const note = TRASH.splice(noteIndex, 1)[0];
      NOTES.push(note); // Restore note to main notes list
      setTrashNotes([...TRASH]);
      navigation.navigate('Home', { refresh: true }); // Navigate back to the Home screen
    }
  };

  const deleteNotePermanently = (noteId) => {
    const noteIndex = TRASH.findIndex(note => note.id === noteId);
    if (noteIndex !== -1) {
      TRASH.splice(noteIndex, 1);
      setTrashNotes([...TRASH]);
      Alert.alert('Note deleted permanently!');
    }
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
