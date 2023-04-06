import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {profileData} from '../../common/ayncStorageGlobal';
import Button from './Button';

const UserProfile = ({setEditProfile}) => {
  const [user, setUser] = useState({});

  const getCredential = async () => {
    const data = await profileData();
    if (data) {
      setUser(JSON.parse(data));
    }
  };
  useEffect(() => {
    getCredential();
  }, []);
  return (
    <View
      style={{
        paddingVertical: 20,
        marginHorizontal: 20,
        backgroundColor: '#ffff',
        borderRadius: 20,
      }}>
      <View
        style={{
          borderWidth: 4,
          borderColor: '#0066A2',
          width: 125,
          height: 125,
          borderRadius: 100,
          alignSelf: 'center',
          overflow: 'hidden',
        }}>
        <Image
          source={{
            uri: user.data
              ? `${user.data.user.avatar}`
              : ' https://ui-avatars.com/api/?name=numan+aljilani&&color=fff&&background=0066a2&&rounded=true&&font-size=0.44',
          }}
          style={{
            flex: 1,
          }}
        />
      </View>
      <Text style={{fontWeight: 800, alignSelf: 'center', paddingTop: 20}}>
        {user.data &&
          user.data.user.firstName + ' ' + user.data &&
          user.data.user.lastName}
      </Text>
      <Text
        style={{
          fontWeight: 500,
          alignSelf: 'center',
          paddingVertical: 5,
          fontSize: 12,
          marginBottom: 25,
        }}>
        {user.data && user.data.user.email}
      </Text>
      <Button title="Edit profile" onPress={setEditProfile} />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
