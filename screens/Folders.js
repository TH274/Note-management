import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useFolders } from '../context/context';
import Icon from 'react-native-vector-icons/Ionicons';

const Folders = ({ navigation }) => {
  const { folders, addFolder } = useFolders();
  const [newFolderName, setNewFolderName] = useState('');

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      addFolder({ id: Date.now().toString(), name: newFolderName });
      setNewFolderName('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={folders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ManageNoteFolder', { folderId: item.id })}
            style={styles.folderTouchable}
          >
            <View style={styles.folderContent}>
              <Text style={styles.folderName}>{item.name}</Text>
              <Icon name="chevron-forward-outline" size={24} />
            </View>
          </TouchableOpacity>
        )}
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
