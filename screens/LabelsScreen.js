import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';

const LabelButton = ({ label, onPress }) => (
  <TouchableOpacity onPress={() => onPress(label)} style={styles.labelButton}>
    <Text style={styles.labelText}>{label.text}</Text>
  </TouchableOpacity>
);

const LabelModal = ({ visible, label, onUpdate, onDelete, onClose }) => {
  const [labelText, setLabelText] = useState(label ? label.text : '');

  const handleSave = () => {
    onUpdate(labelText);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            value={labelText}
            onChangeText={setLabelText}
            style={styles.input}
          />
          <Button title="Save" onPress={handleSave} />
          <Button title="Delete" onPress={onDelete} color="red" />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const LabelsScreen = () => {
  const [labels, setLabels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearchChange = (text) => {
    setSearchTerm(text);
  };

  const handleCreateLabel = (labelText) => {
    if (labelText.trim()) {
      setLabels([...labels, { id: Date.now(), text: labelText.trim() }]);
      setSearchTerm('');
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

  const filteredLabels = labels.filter((label) => label.text.toLowerCase().includes(searchTerm.toLowerCase()));
  const showCreateOption = searchTerm.trim() && !filteredLabels.some(label => label.text.toLowerCase() === searchTerm.toLowerCase());

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search or create label..."
        value={searchTerm}
        onChangeText={handleSearchChange}
        style={styles.input}
      />
      {showCreateOption && (
        <TouchableOpacity onPress={() => handleCreateLabel(searchTerm)}>
          <Text style={styles.createLabelText}>+ Create label '{searchTerm}'</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={filteredLabels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <LabelButton label={item} onPress={handleSelectLabel} />}
        numColumns={2} // Static number of columns
        columnWrapperStyle={styles.columnWrapper}
      />
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
    backgroundColor: '#f8f8f8',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  createLabelText: {
    color: 'blue',
    marginBottom: 12,
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
  columnWrapper: {
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
});

export default LabelsScreen;
