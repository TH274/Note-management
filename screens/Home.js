import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useNotes } from '../context/context';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { notes, updateNote } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(notes);

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

  const handleDelete = (noteId) => {
    updateNote({
      ...notes.find(note => note.id === noteId),
      trash: true,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Icon name="search" size={24} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.notesCount}>{filteredNotes.length} notes found</Text>
        {filteredNotes.length === 0 ? (
          <Text style={styles.textAlert}>No notes found</Text>
        ) : (
          filteredNotes.map((note) => (
            <TouchableOpacity
              key={note.id}
              onPress={() => navigation.navigate('EditNote', { noteId: note.id })}
              style={styles.noteTouchable}
            >
              <View style={styles.noteContainer}>
                <Text style={styles.noteTime}>{note.time}</Text>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text style={styles.noteContent}>{note.content}</Text>
                {note.bookmarked &&  <Icon style={styles.bookmark} name={'bookmark'}size={20}/>}
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
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginRight: 10,
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
