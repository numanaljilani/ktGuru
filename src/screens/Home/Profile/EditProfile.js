import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native-paper';
import imagePath from '../../../constant/imagePath';
import Button from '../../../components/common/Button';
import ImagePicker from 'react-native-image-crop-picker';
import {androidCameraPermission} from '../../../../androidCameraPermission';
import {useUpdateprofileMutation} from '../../../redux/api/api';
import {
  getToken,
  profileData,
  storeUser,
} from '../../../common/ayncStorageGlobal';
import Indicator from '../../../components/common/Indicator';

const EditProfile = ({setEditProfile}) => {
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [updateprofile] = useUpdateprofileMutation();

  const getCredential = async () => {
    const data = await profileData();
    setUser(JSON.parse(data));

    console.log(user.data.user, 'inside getCredentials');

    return user.data;
  };
  // console.log(user.data.user);
  useEffect(() => {
    var status = getCredential();
    if (!status) {
      getCredential();
    }
  }, []);

  const Ref = useRef({
    firstName: '',
    lastName: '',
    imagePath: '',
  });

  const onSelectImage = async () => {
    const permissionStatus = await androidCameraPermission();

    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('profile picture', 'chose an option', [
        {
          text: 'Camera',
          onPress: () => {
            ImagePicker.openCamera({
              width: 300,
              height: 400,
              cropping: true,
            }).then(image => {
              console.log(image);
            });
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true,
            }).then(image => {
              // console.log(image);
              Ref.current.imagePath = image.path;
              setImg(image.path);
            });
          },
        },
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };

  const uploadFormData = async () => {
    setLoading(true);
    const inputFormData = new FormData();

    inputFormData.append('avatar', {
      uri: Ref.current.imagePath,
      name: 'image.png',
      fileName: 'image',
      type: 'image/png',
    });
    inputFormData.append(
      'firstName',
      Ref.current.firstName && Ref.current.firstName,
    );
    inputFormData.append(
      'lastName',
      Ref.current.lastName && Ref.current.lastName,
    );

    const token = await getToken();
    if (token) {
      console.log('setting error initailly');
      const response = await updateprofile({inputFormData, token});
      await storeUser(response);
      const data = await profileData(user);
      setUser(JSON.parse(data));
    }
    setEditProfile(false);
    setLoading(false);
  };

  return (
    <View style={{paddingVertical: 20}}>
      <ScrollView>
        <TouchableOpacity onPress={onSelectImage}>
          <View style={styles.imgContainer}>
            <Image
              source={{
                uri: img
                  ? img
                  : 'https://ui-avatars.com/api/?name=numan+aljilani&&color=fff&&background=0066a2&&rounded=true&&font-size=0.44',
              }}
              style={styles.img}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.nameText}>
          {user.data &&
            user.data.user.firstName + ' ' + user.data &&
            user.data.user.lastName}
        </Text>
        <Text style={styles.emialText}>
          {' '}
          {user.data && user.data.user.email}{' '}
        </Text>

        <TextInput
          mode="outlined"
          label={user.data && user.data.user.firstName}
          placeholder="First name"
          outlineColor="#0066A2"
          activeOutlineColor="#0066A2"
          placeholderTextColor="#c7c7c7"
          left={<TextInput.Icon icon={imagePath.icProfile} />}
          style={styles.input}
          onChangeText={text => (Ref.current.firstName = text)}
        />
        <TextInput
          mode="outlined"
          label={user.data && user.data.user.lastName}
          placeholder="Last name"
          outlineColor="#0066A2"
          activeOutlineColor="#0066A2"
          placeholderTextColor="#c7c7c7"
          left={<TextInput.Icon icon={imagePath.icProfile} />}
          style={styles.input}
          onChangeText={text => (Ref.current.lastName = text)}
        />
        <TextInput
          mode="outlined"
          label={user.data && user.data.user.email}
          outlineColor="#0066A2"
          placeholderTextColor="#c7c7c7"
          placeholder="Email"
          activeOutlineColor="#0066A2"
          left={<TextInput.Icon icon={imagePath.icemail} />}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Password"
          outlineColor="#0066A2"
          activeOutlineColor="#0066A2"
          placeholderTextColor="#c7c7c7"
          left={<TextInput.Icon icon={imagePath.icPassword} />}
          style={styles.input}
        />

        <Button title="Save changes" onPress={uploadFormData} />
      </ScrollView>
      {loading && <Indicator />}
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 10,
    marginBottom: 15,
    borderRadius: 20,
    paddingHorizontal: 10,
    // backgroundColor: '#E5EFF5',
    borderColor: '#0066A2',
  },
  imgContainer: {
    borderWidth: 4,
    borderColor: '#0066A2',
    width: 125,
    height: 125,
    borderRadius: 100,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  emialText: {
    fontWeight: 500,
    alignSelf: 'center',
    paddingVertical: 5,
    fontSize: 12,
  },
  nameText: {fontWeight: 800, alignSelf: 'center', paddingTop: 20},
  img: {
    flex: 1,
  },
});
