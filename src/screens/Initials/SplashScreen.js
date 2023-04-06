import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useMeMutation} from '../../redux/api/api';
import {getToken, storeUser} from '../../common/ayncStorageGlobal';
import navigationString from '../../constant/navigationString';
import imagePath from '../../constant/imagePath';

const SplashScreen = ({navigation}) => {
  const [me] = useMeMutation();
  const getCredential = async () => {
    const token = await getToken();

    if (token) {
      var user = await me(token);
      var store = await storeUser(user);
      if (store) {
        navigation.replace(navigationString.HOME);
      }
    } else {
      navigation.replace(navigationString.AUTH);
    }
  };
  useEffect(() => {
    getCredential();
  }, []);
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 20,
      }}>
      <Image
        source={imagePath.imgKt_Logo}
        style={{
          alignItems: 'center',
          height: '40%',
          width: '100%',
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
