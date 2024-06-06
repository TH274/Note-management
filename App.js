import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import NewNote from './screens/NewNote';
import EditNote from './screens/EditNote';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="NewNote" component={NewNote} />
    <Stack.Screen name="EditNote" component={EditNote} />
    {/* <Stack.Screen name="ManageLabels" component={ManageLabelsScreen} /> */}
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStack} />
        {/* <Drawer.Screen name="Labels" component={LabelsScreen} />
        <Drawer.Screen name="Folders" component={FoldersScreen} />
        <Drawer.Screen name="Trash" component={TrashScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
