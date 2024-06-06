import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import dummy data for testing
import { NOTES } from '../data/dummy-data';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView>
        {NOTES.length === 0 ? (
          <Text>Please add a new note</Text>
        ) : (
          NOTES.map(note => (
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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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