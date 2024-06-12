import React, { useState, useEffect, } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native';
import { useNotes } from '../context/context.jsx';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const { selectedColor } = route.params || {};
  const { notes } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);

  useEffect(() => {
    setFilteredNotes(notes.filter(note => !note.trash));
  }, [isFocused, notes]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = notes.filter(note => !note.trash && note.content.toLowerCase().includes(text.toLowerCase()));
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes.filter(note => !note.trash));
    }
  };

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredNotes(notes.filter(note => !note.trash));
  };

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


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        {isSearchVisible ? (
          <>
            <TouchableOpacity onPress={toggleSearch}>
              <Text><Icon name="arrow-back" size={24} /></Text>
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="Search notes"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <TouchableOpacity onPress={clearSearch}>
              <Text><Icon name="close" size={24} /></Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={toggleSearch}>
            <Text><Icon name="search" size={24} /></Text>
          </TouchableOpacity>
        )}
      </View>
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
              {selectedColor && (
              <View style={styles.colorCircle}>
                <View style={{ backgroundColor: selectedColor, width: 10, height: 10, borderRadius: 5 }} />
              </View>
              )}
                <Text style={styles.noteTime}>{note.time}</Text>
                </View>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text style={styles.noteContent}>{note.content}</Text>
                {note.bookmarked && <Icon style={styles.bookmark} name={'bookmark'} size={20} />}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('NewNote')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
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
  textAlert: {},
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
  noteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  colorCircle: {
    width: 15,
    height: 13.5,
    marginRight: 1,
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
});

export default HomeScreen;
