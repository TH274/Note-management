import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Modal, Button } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useNotes } from '../context/context.jsx';
import Icon from 'react-native-vector-icons/Ionicons';

const FoldersScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { folders, notes, addFolder } = useNotes();
  const [folderName, setFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setSelectedFolder(null);
    }
  }, [isFocused]);

  const handleAddFolder = () => {
    if (folderName.trim()) {
      addFolder(folderName.trim());
      setFolderName('');
      setModalVisible(false);
    }
  };

  const handleSelectFolder = (folderId) => {
    setSelectedFolder(folderId);
  };

  const handleNewNote = () => {
    navigation.navigate('NewNote', { folderId: selectedFolder });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {folders.map((folder) => (
          <TouchableOpacity
            key={folder.id}
            onPress={() => handleSelectFolder(folder.id)}
            style={[
              styles.folderTouchable,
              selectedFolder === folder.id && styles.selectedFolder
            ]}
          >
            <Text style={styles.folderName}>{folder.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addFolderButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addFolderButtonText}>Add Folder</Text>
        </TouchableOpacity>
      </ScrollView>
      {selectedFolder && (
        <View style={styles.notesContainer}>
          <Text style={styles.header}>Notes in {folders.find(f => f.id === selectedFolder).name}</Text>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {notes.filter(note => note.folderId === selectedFolder).map(note => (
              <TouchableOpacity
                key={note.id}
                onPress={() => navigation.navigate('EditNote', { noteId: note.id })}
                style={styles.noteTouchable}
              >
                <View style={styles.noteContainer}>
                  <Text style={styles.noteTime}>{note.time}</Text>
                  <Text style={styles.noteTitle}>{note.title}</Text>
                  <Text style={styles.noteContent}>{note.content}</Text>
                  {note.bookmarked && <Icon style={styles.bookmark} name={'bookmark'} size={20} />}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.addButton} onPress={handleNewNote}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalInput}
              placeholder="Folder name"
              value={folderName}
              onChangeText={setFolderName}
            />
            <Button title="Add Folder" onPress={handleAddFolder} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollContainer: {
    paddingBottom: 70,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  folderTouchable: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
  },
  selectedFolder: {
    backgroundColor: '#cce5ff',
  },
  folderName: {
    fontSize: 16,
  },
  addFolderButton: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#74c1fa',
    alignItems: 'center',
  },
  addFolderButtonText: {
    color: 'white',
    fontSize: 16,
  },
  notesContainer: {
    flex: 1,
    paddingTop: 20,
  },
  noteTouchable: {
    marginBottom: 10,
  },
  noteContainer: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default FoldersScreen;
