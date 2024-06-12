import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard } from 'react-native';
import { useNotes } from '../context/context.jsx';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';

const NewNote = ({ navigation }) => {
  const [noteContent, setNoteContent] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { addNote } = useNotes();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const saveNoteHandler = () => {
    if (noteContent.trim().length === 0) {
      Alert.alert('Invalid input', 'Note content cannot be empty', [{ text: 'OK' }]);
      return;
    }

    const newNote = {
      id: uuid.v4(),
      time: new Date().toLocaleString(),
      title: 'New Note',
      content: noteContent,
      color: 'gray',
      bookmarked: false,
    };

    addNote(newNote);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter note content"
        value={noteContent}
        onChangeText={setNoteContent}
        multiline={true}
      />
      {isKeyboardVisible && (
        <TouchableOpacity style={styles.roundButton} onPress={saveNoteHandler}>
          <Icon name="check" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 18,
  },
  roundButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#74c1fa',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});

export default NewNote;
