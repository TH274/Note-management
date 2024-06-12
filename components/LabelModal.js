import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

const LabelModal = ({ visible, label, onUpdate, onDelete, onClose }) => {
  const [newText, setNewText] = useState(label?.text || '');

  const handleUpdate = () => {
    onUpdate(newText);
    setNewText('');
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <View style={styles.modalContent}>
        <Text>Edit Label</Text>
        <TextInput
          placeholder="Label Text"
          value={newText}
          onChangeText={setNewText}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button title="Update" onPress={handleUpdate} />
          <Button title="Delete" color="red" onPress={onDelete} />
        </View>
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent:'space-around',
    marginTop: 10,
    marginBottom: 10
  },
});

export default LabelModal;
