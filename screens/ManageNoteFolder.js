import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNotes, useLabels } from '../context/context';
import { useNavigation } from '@react-navigation/native';

const ManageNoteFolder = ({ route }) => {
  const { folderId } = route.params;
  const { notes } = useNotes();
  const { labels } = useLabels();
  const navigation = useNavigation();

  const folderNotes = notes.filter(note => note.folderId === folderId);

  const renderLabels = (noteLabels) => {
    if (!noteLabels) return null;

    return (
      <View style={{ flexDirection: 'row' }}>
        {noteLabels.map((labelId) => {
          const label = labels.find(label => label.id === labelId);
          return (
            <View key={labelId} style={{ backgroundColor: '#A7E6FF', padding: 5, borderRadius: 2, marginRight: 5 }}>
              <Text>{label ? label.text : ''}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#ddd' }}
      onPress={() => navigation.navigate('EditNote', { noteId: item.id })}
    >
      <Text>{item.content}</Text>
      {renderLabels(item.labels)}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={folderNotes}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ManageNoteFolder;
