import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useFolders, useNotes } from '../context/context';
import Icon from 'react-native-vector-icons/Ionicons';

const Folders = ({ navigation }) => {
  const { folders, addFolder } = useFolders();
  const { notes } = useNotes();
  const [newFolderName, setNewFolderName] = useState('');

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      addFolder({ id: Date.now().toString(), name: newFolderName });
      setNewFolderName('');
    }
  };

  const getFolderDetails = (folderId) => {
    const folderNotes = notes.filter(note => note.folderId === folderId);
    const noteCount = folderNotes.length;
    const latestNote = folderNotes.sort((a, b) => new Date(b.time) - new Date(a.time))[0];
    const latestNoteTime = latestNote ? latestNote.time : 'No notes yet';
    return { noteCount, latestNoteTime };
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={folders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const { noteCount, latestNoteTime } = getFolderDetails(item.id);
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('ManageNoteFolder', { folderId: item.id })}
              style={styles.folderTouchable}
            >
              <View style={styles.folderContent}>
                <View>
                  <Text style={styles.folderName}>{item.name}</Text>
                  <Text style={styles.folderDetails}>{noteCount} note{noteCount !== 1 ? 's' : ''}</Text>
                  <Text style={styles.folderDetails}>Latest: {latestNoteTime}</Text>
                </View>
                <Icon name="chevron-forward-outline" size={24} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TextInput
        placeholder="New Folder Name"
        value={newFolderName}
        onChangeText={setNewFolderName}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleAddFolder} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Folder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  folderTouchable: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  folderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  folderName: {
    fontSize: 18,
    color: '#333',
  },
  folderDetails: {
    fontSize: 14,
    color: 'gray',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#74c1fa',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Folders;
