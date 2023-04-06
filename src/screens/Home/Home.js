import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from '../Home/Profile/profile';
import Projects from './Projects/Projects';
import navigationString from '../../constant/navigationString';
import CustomDrawer from '../../components/CustomDrawer';
import ScreenHeaderBtn from '../../components/common/ScreenHeaderBtn ';
import imagePath from '../../constant/imagePath';
import {curryGetDefaultMiddleware} from '@reduxjs/toolkit/dist/getDefaultMiddleware';
imagePath;

const Drawer = createDrawerNavigator();

const Home = ({navigation}) => {
  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        headerTintColor: '#0066A2',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'black',
        },
        headerStyle: {
          height: 70,
        },
      })}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name={navigationString.PROJECTS} component={Projects} />
      <Drawer.Screen name={navigationString.PROFILE} component={Profile} />
    </Drawer.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
