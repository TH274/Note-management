import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const LabelButton = ({ label, onPress }) => (
  <TouchableOpacity style={styles.labelButton} onPress={onPress}>
    <Text style={styles.labelButtonText}>{label.text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  labelButton: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
  },
  labelButtonText: {
    fontSize: 16,
  },
});

export default LabelButton;
