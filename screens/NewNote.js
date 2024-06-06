// NewNoteScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NOTES } from '../data/dummy-data'; // Assuming NOTES is an array that holds the notes
import Note from '../models/note'; // 

const NewNote = ({ navigation }) => {
  const [noteContent, setNoteContent] = useState('');

  const saveNoteHandler = () => {
    if (noteContent.trim().length === 0) {
      Alert.alert('Invalid input', 'Note content cannot be empty', [{ text: 'Okay' }]);
      return;
    }

    const newNote = new Note(
      `n${NOTES.length + 1}`, // Generate a new id
      null, // Default color
      [], // Default empty labels
      noteContent,
      new Date(), // Current date
      false // Not bookmarked
    );

    NOTES.push(newNote);
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Note</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter note content"
        value={noteContent}
        onChangeText={setNoteContent}
      />
      <Button title="Save Note" onPress={saveNoteHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
  },
});

export default NewNote;
