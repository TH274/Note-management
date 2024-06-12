import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import * as screens from "./screens";
import { NotesProvider } from "./context/context";
import React from "react";
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
const App = () => {
	return (
		<NotesProvider>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="HomeStack"
						component={HomeStack}
						options={{ headerShown: false }}
					/>
					<Stack.Screen name="NewNote" component={screens.NewNote} />
          <Stack.Screen name="ManageLabelsScreen" component={screens.ManageLabelsScreen} />
					<Stack.Screen name="EditNote" component={screens.EditNote} />
				</Stack.Navigator>
			</NavigationContainer>
		</NotesProvider>
	);
};
export default App;
