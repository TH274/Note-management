import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, TextInput, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useNotes } from '../context/context';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import BottomSheet from '@gorhom/bottom-sheet';
import NoteOptionsActionSheet from '../components/NoteOptionsActionSheet';
import ManageLabelsScreen from './ManageLabelsScreen';

const EditNote = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { noteId } = route.params;
  const { notes, updateNote } = useNotes();

  const note = notes.find(note => note.id === noteId);

  if (!note.labels) {
    note.labels = [];
  }

  const [content, setContent] = useState(note.content);
  const [isBookmarked, setIsBookmarked] = useState(note.bookmarked);
  const [noteColor, setNoteColor] = useState(note.color);
  const [selectedLabels, setSelectedLabels] = useState(note.labels);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const bottomSheetRef = useRef(null);
  const inputRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  useEffect(() => {
    const saveNote = () => {
      updateNote({
        ...note,
        content,
        bookmarked: isBookmarked,
        color: noteColor,
        labels: selectedLabels,
      });
    };
    saveNote();
  }, [content, isBookmarked, noteColor, selectedLabels]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleDelete = () => {
    updateNote({
      ...note,
      trash: true,
    });
    navigation.goBack();
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleOpenBottomSheet = () => {
    dismissKeyboard();
    inputRef.current.blur();
    bottomSheetRef.current.expand();
  };

  const handleChangeColor = (color) => {
    setNoteColor(color);
    bottomSheetRef.current.close();
  };

  const handleManageLabels = () => {
    navigation.navigate('ManageLabelsScreen', {
      noteId: note.id,
      updateLabels: setSelectedLabels, // Pass the setSelectedLabels function to update the labels
    });
  };

  const saveNoteHandler = () => {
    dismissKeyboard();
    if (content.trim().length === 0) {
      Alert.alert('Invalid input', 'Note content cannot be empty', [{ text: 'Okay' }]);
    } else {
      console.log('Note content:', content);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={[styles.container, { backgroundColor: noteColor || '#FFFFFF' }]}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={content}
          onChangeText={setContent}
          multiline
        />
        {isKeyboardVisible && (
          <View style={styles.checkButtonContainer}>
            <TouchableOpacity style={styles.roundButton} onPress={saveNoteHandler}>
              <Icon2 name="check" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.bottomTab}>
          <Icon
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            onPress={handleBookmarkToggle}
          />
          <TouchableOpacity onPress={handleOpenBottomSheet}>
            <Icon name="ellipsis-vertical" size={24} />
          </TouchableOpacity>
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={(index) => {
            if (index >= 0) {
              dismissKeyboard();
              inputRef.current.blur();
            }
          }}
        >
          <NoteOptionsActionSheet 
            handleChangeColor={handleChangeColor}
            handleDelete={handleDelete}
            handleManageLabels={handleManageLabels}
          />
        </BottomSheet>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 18,
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  roundButton: {
    backgroundColor: '#74c1fa',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButtonContainer: {
    position: 'absolute',
    bottom: 70,
    right: 20,
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
});

export default EditNote;

