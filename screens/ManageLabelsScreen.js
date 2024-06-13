import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useNotes, useLabels } from '../context/context';

const LabelButton = ({ label, onPress, selected }) => (
  <TouchableOpacity onPress={onPress} style={[styles.labelButton, selected && styles.selectedLabel]}>
    <Text style={[styles.labelText, selected && styles.selectedLabelText]}>{label.text}</Text>
  </TouchableOpacity>
);

const ManageLabelsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { noteId } = route.params;
  const { notes, updateNote } = useNotes();
  const { labels } = useLabels();

  const note = notes.find(note => note.id === noteId) || { labels: [] };
  const [selectedLabels, setSelectedLabels] = useState(note.labels || []);

  useEffect(() => {
    setSelectedLabels(note.labels || []);
  }, [note]);

  const toggleLabel = (labelId) => {
    const isSelected = selectedLabels.includes(labelId);
    const updatedLabels = isSelected
      ? selectedLabels.filter(id => id !== labelId)
      : [...selectedLabels, labelId];

    setSelectedLabels(updatedLabels);
  };

  const renderLabelItem = ({ item }) => (
    <LabelButton
      label={item}
      onPress={() => toggleLabel(item.id)}
      selected={selectedLabels.includes(item.id)}
    />
  );

  const handleDone = () => {
    note.labels = selectedLabels;
    updateNote({ ...note, labels: selectedLabels });
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={labels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLabelItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
      <Button title="Done" onPress={handleDone} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  labelButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    textAlign: 'center',
  },
  selectedLabel: {
    backgroundColor: '#74c1fa',
  },
  selectedLabelText: {
    color: 'white',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default ManageLabelsScreen;
