import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import LabelButton from '../components/LabelButton';
import LabelModal from '../components/LabelModal';

const LabelsScreen = () => {
  const [labels, setLabels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newLabelText, setNewLabelText] = useState('');

  const handleSearchChange = (text) => {
    setSearchTerm(text);
  };

  const handleCreateLabel = () => {
    if (newLabelText.trim()) {
      setLabels([...labels, { id: Date.now(), text: newLabelText.trim() }]);
      setNewLabelText('');
    }
  };

  const handleSelectLabel = (label) => {
    setSelectedLabel(label);
    setModalVisible(true);
  };

  const handleUpdateLabel = (text) => {
    const updatedLabels = labels.map((label) => (label.id === selectedLabel.id ? { ...label, text } : label));
    setLabels(updatedLabels);
    setSelectedLabel(null);
    setModalVisible(false);
  };

  const handleDeleteLabel = () => {
    const updatedLabels = labels.filter((label) => label.id !== selectedLabel.id);
    setLabels(updatedLabels);
    setSelectedLabel(null);
    setModalVisible(false);
  };

  const filteredLabels = labels.filter((label) => label.text.includes(searchTerm));

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search labels"
        value={searchTerm}
        onChangeText={handleSearchChange}
        style={styles.input}
      />
      <FlatList
        data={filteredLabels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <LabelButton label={item} onPress={() => handleSelectLabel(item)} />}
      />
      <TextInput
        placeholder="New Label Text"
        value={newLabelText}
        onChangeText={setNewLabelText}
        style={styles.input}
      />
      <Button title="Create New Label" onPress={handleCreateLabel} />
      <LabelModal
        visible={modalVisible}
        label={selectedLabel}
        onUpdate={handleUpdateLabel}
        onDelete={handleDeleteLabel}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LabelsScreen;
