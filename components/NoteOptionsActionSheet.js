import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

const NoteOptionsActionSheet = ({ handleChangeColor, handleDelete, handleManageLabels }) => {
  return (
    <View style={styles.container}>
      <View style={styles.colorOptions}>
        {['#FFFFFF', '#00E0E0', '#FF7070', '#FFD670', '#B6FFB6', '#A0E7FF', '#FFD6FF', '#C9FFD6'].map(color => (
          <TouchableOpacity key={color} style={[styles.colorCircle, { backgroundColor: color }]} onPress={() => handleChangeColor(color)} />
        ))}
        <TouchableOpacity style={styles.manageLabels} onPress={handleManageLabels}>
          <Text>+ Manage labels</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.actionItem}>
        <Icon name="copy-outline" size={20} />
        <Text style={styles.actionText}>Copy to Clipboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem}>
        <Icon name="share-outline" size={20} />
        <Text style={styles.actionText}>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem} onPress={handleDelete}>
        <Icon name="trash-outline" size={20} />
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem}>
        <Icon name="copy-outline" size={20} />
        <Text style={styles.actionText}>Make a copy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem}>
        <Icon name="pin-outline" size={20} />
        <Text style={styles.actionText}>Pin</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem}>
        <Icon name="alarm-outline" size={20} />
        <Text style={styles.actionText}>Add a reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  manageLabels: {
    width: '100%',
    padding: 10,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    marginTop: 10,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  actionText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default NoteOptionsActionSheet;
 
