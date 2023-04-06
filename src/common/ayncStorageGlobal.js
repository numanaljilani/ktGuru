import AsyncStorage from '@react-native-async-storage/async-storage';
export const storeToken = async value => {
  try {
    await AsyncStorage.setItem('access_token', value);
    return true;
  } catch (e) {
    return false;
    // saving error
  }
};
export const storeUser = async value => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
    // saving error
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('access_token');

    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    return;
  }
};
export const profileData = async () => {
  try {
    const value = await AsyncStorage.getItem('user');

    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    return;
  }
};
