import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import * as screens from './screens';
import { NotesProvider } from './context/context';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import NewNote from "./screens/NewNote";
import EditNote from "./screens/EditNote";
import LabelsScreen from "./screens/LabelsScreen";
import TrashScreen from "./screens/TrashScreen";
import ManageLabelsScreen from "./screens/ManageLabelsScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={screens.Home} />
      <Drawer.Screen name="Labels" component={screens.LabelsScreen} />
      <Drawer.Screen name="Folders" component={screens.Folders} />
      <Drawer.Screen name="Trash" component={screens.Trash} />
    </Drawer.Navigator>
  );
};
const HomeStack = () => (
	<Stack.Navigator>
		<Stack.Screen name="Home" component={HomeScreen} />
		<Stack.Screen name="NewNote" component={NewNote} />
		<Stack.Screen name="EditNote" component={EditNote} />
		<Stack.Screen name="ManageLabels" component={ManageLabelsScreen} />
		<Stack.Screen name="Trash" component={TrashScreen} />
	</Stack.Navigator>
);

const App = () => {
  return (
    <NotesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
          <Stack.Screen name="NewNote" component={screens.NewNote} />
          <Stack.Screen name="EditNote" component={screens.EditNote} />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );
	return (
		<NavigationContainer>
			<Drawer.Navigator>
				<Drawer.Screen name="Home" component={HomeStack} />
				<Drawer.Screen name="Labels" component={LabelsScreen} />
        {/* <Drawer.Screen name="Folders" component={FoldersScreen} /> */}
        <Drawer.Screen name="Trash" component={TrashScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

export default App;
