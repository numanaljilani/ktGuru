import {StyleSheet, Modal, View, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import UserProfile from '../../../components/common/UserProfile';
import Button from '../../../components/common/Button';
import EditProfile from './EditProfile';

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  return (
    <View
      style={{height: '100%', paddingVertical: 20, backgroundColor: '#E5EFF5'}}>
      {editProfile ? (
        <EditProfile setEditProfile={setEditProfile} />
      ) : (
        <UserProfile setEditProfile={setEditProfile} />
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
