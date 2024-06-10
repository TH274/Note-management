// EditNote.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NOTES } from '../data/dummy-data';

const EditNote = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { noteId } = route.params;
  const note = NOTES.find(note => note.id === noteId);

  // Initialize note.labels if undefined
  if (!note.labels) {
    note.labels = [];
  }

  const [content, setContent] = useState(note.content);
  const [isBookmarked, setIsBookmarked] = useState(note.isBookmarked);

  const handleSave = () => {
    note.content = content;
    note.isBookmarked = isBookmarked;
    Alert.alert('Note updated!');
    navigation.goBack();
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={content}
          onChangeText={setContent}
          multiline
        />
        <View style={styles.bottomTab}>
          <Icon
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            onPress={handleBookmarkToggle}
          />
          <Button title="Save" onPress={handleSave} />
          <Button
            title="Manage Labels"
            onPress={() => navigation.navigate('ManageLabels', { noteId })}
          />
          <Button
            title="Delete"
            onPress={() => {
              NOTES.splice(NOTES.indexOf(note), 1);
              Alert.alert('Note deleted!');
              navigation.goBack();
            }}
          />
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default EditNote;
