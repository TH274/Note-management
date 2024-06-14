import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNotes, useLabels } from '../context/context';
import { useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ManageNoteFolder = ({ route }) => {
  const { folderId } = route.params;
  const { notes } = useNotes();
  const { labels } = useLabels();
  const navigation = useNavigation();
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);

  useEffect(() => {
    const folderNotes = notes.filter(note => note.folderId === folderId && !note.trash);
    setFilteredNotes(folderNotes);
  }, [notes, folderId]);


  const handleLongPress = (noteId) => {
    if (selectedNotes.includes(noteId)) {
      setSelectedNotes(selectedNotes.filter(id => id !== noteId));
    } else {
      setSelectedNotes([...selectedNotes, noteId]);
    }
  };

  const handlePress = (noteId) => {
    if (selectedNotes.length > 0) {
      handleLongPress(noteId);
    } else {
      navigation.navigate('EditNote', { noteId });
    }
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.notesCount}>
          {selectedNotes.length > 0
            ? `${selectedNotes.length} note${selectedNotes.length > 1 ? 's' : ''} selected`
            : `${filteredNotes.length} note${filteredNotes.length !== 1 ? 's' : ''} found`}
        </Text>
        {filteredNotes.length === 0 ? (
          <Text style={styles.textAlert}>No notes found. Tap + icon to add notes</Text>
        ) : (
          filteredNotes.map((note) => (
            <TouchableOpacity
              key={note.id}
              onPress={() => handlePress(note.id)}
              onLongPress={() => handleLongPress(note.id)}
              style={[
                styles.noteTouchable,
                selectedNotes.includes(note.id) && styles.selectedNote
              ]}
            >
              <View style={styles.noteContainer}>
                <View style={styles.noteInfo}>
                  <Text style={styles.noteTime}>{note.time}</Text>
                </View>
                {renderLabels(note.labels)}
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.noteContent}>{note.content}</Text>
                {note.bookmarked && <Icon style={styles.bookmark} name={'bookmark'} size={20} />}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('NoteSelector', { folderId })}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginRight: 12,
  },
  scrollContainer: {
    paddingBottom: 70,
  },
  notesCount: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#74c1fa',
  },
  noteTouchable: {
    marginBottom: 10,
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
  selectedNote: {
    borderColor: '#cce5ff',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#74c1fa',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
  },
  labelsContainer: {
    flexDirection: 'row',
  },
  label: {
    marginBottom: 14,
    backgroundColor: '#A7E6FF',
    padding: 8,
    borderRadius: 2,
    marginRight: 8,
  },
  labelText: {
    fontSize: 13,
    color: '#333',
  },
  textAlert: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
});

export default ManageNoteFolder;
