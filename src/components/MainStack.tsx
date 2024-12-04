import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { HomeScreen } from '../screens/HomeScreen';
import { AddTaskScreen } from '../screens/AddTaskScreen';
import { TaskDetailsScreen } from '../screens/TaskDetailsScreen';

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#7c3aed',
                },
                headerTintColor: '#ffffff',
            }}
        >
            <StackNavigator.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Tasks' }}
            />
            <StackNavigator.Screen
                name="AddTask"
                component={AddTaskScreen}
                options={{ title: 'Add Task' }}
            />
            <StackNavigator.Screen
                name="TaskDetails"
                component={TaskDetailsScreen}
                options={{ title: 'Task Details' }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);