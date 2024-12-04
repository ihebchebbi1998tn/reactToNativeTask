import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import TaskDetailsScreen from './src/screens/TaskDetailsScreen';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

// Suppress specific warning
const originalConsoleError = console.error;
console.error = (...args) => {
  if (/Cannot read property 'dismiss' of undefined/.test(args[0])) {
    return; // Ignore this specific warning
  }
  originalConsoleError(...args); // Show other errors
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#7c3aed',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}  
        />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
