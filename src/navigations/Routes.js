import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home, SplashScreen, Auth} from '../screens';
import navigationString from '../constant/navigationString';
const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={navigationString.SPLASHSCREEN}>
        <Stack.Screen
          component={SplashScreen}
          name={navigationString.SPLASHSCREEN}
        />
        <Stack.Screen component={Auth} name={navigationString.AUTH} />
        <Stack.Screen component={Home} name={navigationString.HOME} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
