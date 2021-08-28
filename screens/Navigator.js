import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import Home from './Home'
import Dashboard from './Dashboard'
const Stack = createStackNavigator()

export default function Navigator() {

  return(
    <Stack.Navigator headerMode = 'screen'>
        <Stack.Screen name = "Home" component = {Home}/>
        <Stack.Screen name = "Dashboard" component = {Dashboard}/>
    </Stack.Navigator>
  )
}


const styles = StyleSheet.create({
  refreshIcon: {
    paddingRight:20
  }
});
