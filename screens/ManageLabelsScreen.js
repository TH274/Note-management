import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LabelButton from '../components/LabelButton';
import { LABELS, NOTES } from '../data/dummy-data';

const ManageLabelsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { noteId } = route.params;
  const note = NOTES.find(note => note.id === noteId);

  const [selectedLabels, setSelectedLabels] = useState(note.labels || []);

  useEffect(() => {
    if (!note.labels) {
      note.labels = [];
    }
    setSelectedLabels(note.labels);
  }, [note]);

  const toggleLabel = (labelId) => {
    const isSelected = selectedLabels.includes(labelId);
    const updatedLabels = isSelected
      ? selectedLabels.filter(id => id !== labelId)
      : [...selectedLabels, labelId];

    setSelectedLabels(updatedLabels);
    note.labels = updatedLabels;
  };

  const renderLabelItem = ({ item }) => (
    <LabelButton
      label={item}
      onPress={() => toggleLabel(item.id)}
      selected={selectedLabels.includes(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={LABELS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLabelItem}
      />
      <Button title="Done" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ManageLabelsScreen;