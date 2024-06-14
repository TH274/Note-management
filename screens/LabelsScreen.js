import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import { useLabels } from '../context/context';

const LabelButton = ({ label, onPress }) => (
  <TouchableOpacity onPress={() => onPress(label)} style={styles.labelButton}>
    <Text style={styles.labelText}>{label.text}</Text>
  </TouchableOpacity>
);

const CustomButton = ({ title, onPress, color }) => (
  <TouchableOpacity onPress={onPress} style={[styles.customButton, { backgroundColor: color }]}>
    <Text style={styles.customButtonText}>{title}</Text>
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
          <View style={styles.buttonContainer}>
            <CustomButton title="Save" onPress={handleSave} color="#4CAF50" />
            <CustomButton title="Delete" onPress={onDelete} color="#F44336" />
            <CustomButton title="Close" onPress={onClose} color="#9E9E9E" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const LabelsScreen = () => {
  const { labels, addLabel, updateLabel, deleteLabel } = useLabels();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearchChange = (text) => {
    setSearchTerm(text);
  };

  const handleCreateLabel = (labelText) => {
    if (labelText.trim()) {
      addLabel({ id: Date.now(), text: labelText.trim() });
      setSearchTerm('');
    }
  };

  const handleSelectLabel = (label) => {
    setSelectedLabel(label);
    setModalVisible(true);
  };

  const handleUpdateLabel = (text) => {
    updateLabel({ ...selectedLabel, text });
    setSelectedLabel(null);
    setModalVisible(false);
  };

  const handleDeleteLabel = () => {
    deleteLabel(selectedLabel.id);
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
        numColumns={2}
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
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  createLabelText: {
    color: 'blue',
    paddingLeft: 12,
    marginBottom: 12,
  },
  labelButton: {
    backgroundColor: '#A7E6FF',
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
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  customButton: {
    flex: 1,
    margin: 5,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LabelsScreen;
