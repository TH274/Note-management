import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useNotes, useLabels } from '../context/context';
import Icon from 'react-native-vector-icons/Ionicons';

const TrashScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { notes, updateNote, deleteNote } = useNotes();
  const { labels } = useLabels();
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
    const noteIndex = notes.findIndex(note => note.id === noteId);
    if (noteIndex !== -1) {
      deleteNote(noteId);
      Alert.alert('Note deleted permanently!');
    }
  };

  const handleNoteAction = (noteId) => {
    Alert.alert(
      "Trash",
      "What would you like to do with this note?",
      [
        {
          text: "Restore",
          onPress: () => restoreNote(noteId),
        },
        {
          text: "Delete Permanently",
          onPress: () => deleteNotePermanently(noteId),
          style: "destructive"
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  const renderLabels = (noteLabels) => {
    if (!noteLabels) return null;

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.labelsContainer}>
        {noteLabels.map((labelId) => {
          const label = labels.find(label => label.id === labelId);
          return (
            <View key={labelId} style={styles.label}>
              <Text style={styles.labelText}>{label ? label.text : ''}</Text>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.notesCount}>{filteredNotes.length} notes in trash</Text>
        <View style={styles.buttonsRight}>
          <TouchableOpacity style={styles.restoreButton} onPress={() => filteredNotes.forEach(note => restoreNote(note.id))}>
            <Text style={styles.restoreButtonText}>Restore All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.emptyButton} onPress={() => filteredNotes.forEach(note => deleteNotePermanently(note.id))}>
            <Text style={styles.emptyButtonText}>Empty All</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.textAlert}>No notes found</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNoteAction(item.id)}>
            <View style={styles.noteContainer}>
              <View style={styles.noteInfo}>
                <Text style={styles.noteTime}>{item.time}</Text>
              </View>
              {renderLabels(item.labels)}
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.noteContent}>{item.content}</Text>
              {item.bookmarked && <Icon style={styles.bookmark} name={'bookmark'} size={20} />}
            </View>
          </TouchableOpacity>
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
    padding: 20,
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
    marginBottom: 10,
  },
  noteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  noteTime: {
    fontSize: 13,
    color: 'gray',
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 20,
    marginBottom: 5,
  },
  bookmark: {
    position: 'absolute',
    top: 10,
    right: 10,
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
  labelsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    backgroundColor: '#A7E6FF',
    padding: 5,
    borderRadius: 2,
    marginRight: 5,
  },
  labelText: {
    fontSize: 13,
    color: '#333',
  },
});

export default TrashScreen;
