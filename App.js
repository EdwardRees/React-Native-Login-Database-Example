// Import React to use throughout
import React from "react";

// Import NavigationContainer to use
import { NavigationContainer } from "@react-navigation/native";

// Import createStackNavigator to use a stack navigator
import { createStackNavigator } from "@react-navigation/stack";

// Import necessary views
import { Home, Login } from "./views";

// Stack navigator to use
const Stack = createStackNavigator();

/**
 * App component
 */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Authenticated" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
