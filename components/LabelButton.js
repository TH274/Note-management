import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const LabelButton = ({ label, onPress, selected }) => {
  return (
    <TouchableOpacity style={[styles.button, selected && styles.selected]} onPress={onPress}>
      <Text style={styles.buttonText}>{label.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#d3d3d3',
  },
  buttonText: {
    fontSize: 16,
  },
});

export default LabelButton;
