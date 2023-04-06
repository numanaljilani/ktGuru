import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import imagePath from '../constant/imagePath';
import {profileData, storeToken, storeUser} from '../common/ayncStorageGlobal';
import UserProfile from './common/UserProfile';
import navigationString from '../constant/navigationString';

const CustomDrawer = props => {
  const handleLogOut = async () => {
    const user = await storeUser('');
    const token = await storeToken('');
    if (user && token) {
      props.navigation.replace(navigationString.AUTH);
    }
  };
  return (
    <DrawerContentScrollView {...props} style={{paddingVertical: 20}}>
      <TouchableOpacity
        style={styles.Touch}
        onPress={() => props.navigation.navigate(navigationString.PROJECTS)}>
        <Image source={imagePath.icProject} style={styles.img} />
        <Text style={styles.txt}>Project</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Touch}
        onPress={() => props.navigation.navigate(navigationString.PROFILE)}>
        <Image source={imagePath.icProfile} style={styles.img} />
        <Text style={styles.txt}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleLogOut()}
        style={[
          styles.Touch,
          {
            backgroundColor: '#0066A2',
            color: 'white',
            paddingVertical: 7,
            paddingHorizontal: 10,
            marginHorizontal: 10,
            borderRadius: 10,
          },
        ]}>
        <Image source={imagePath.icLogout} style={{tintColor: 'white'}} />
        <Text style={{color: 'white', fontSize: 15, fontWeight: 500}}>
          Logout
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  Touch: {flexDirection: 'row', alignItems: 'center', marginVertical: 10},
  img: {width: 40, height: 40, tintColor: '#0066A2', marginHorizontal: 15},
  txt: {color: '#0066A2', fontSize: 15, fontWeight: 500},
});
