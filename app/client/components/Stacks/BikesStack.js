import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BikesScreen from './../Screens/BikesScreen';
import ComponentTaskScreen from './../SubScreens/ComponentTaskScreen';
import AddTaskScreen from './../SubScreens/AddTaskScreen';
import ComponentsScreen from '../SubScreens/ComponentsScreen';
import AddComponentScreen from '../SubScreens/AddComponentScreen';

const Stack = createStackNavigator();

export default class BikesStack extends React.Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName="Bikes"
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: 'tomato'},
        }}>
        <Stack.Screen name="Bikes" component={BikesScreen} />
        <Stack.Screen name="Components" component={ComponentsScreen} />
        <Stack.Screen name="Add Component" component={AddComponentScreen} />
        <Stack.Screen
          name="Tasks"
          component={ComponentTaskScreen}
        />
        <Stack.Screen name="Add Task for Component" component={AddTaskScreen} />
      </Stack.Navigator>
    );
  }
}
