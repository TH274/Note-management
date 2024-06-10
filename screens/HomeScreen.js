import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NOTES } from '../data/dummy-data';

const HomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(NOTES);

  useEffect(() => {
    setFilteredNotes(NOTES);
  }, [isFocused]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = NOTES.filter(note => note.content.toLowerCase().includes(text.toLowerCase()));
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(NOTES);
    }
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
      <ScrollView>
        {filteredNotes.length === 0 ? (
          <Text>{searchQuery ? 'Not found!' : 'Please add a new note'}</Text>
        ) : (
          filteredNotes.map(note => (
            <TouchableOpacity key={note.id} onPress={() => navigation.navigate('EditNote', { noteId: note.id })}>
              <View style={[styles.noteContainer, { backgroundColor: note.color }]}>
                <Text>{note.content}</Text>
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
  noteContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
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
