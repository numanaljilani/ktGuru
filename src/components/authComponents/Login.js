import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import styless from './commonStyle';
import Button from '../common/Button';
import GoogleButton from '../common/GoogleButton';
import navigationString from '../../constant/navigationString';
import ErrorMessage from '../common/ErrorMessage';
import {useLoginApiMutation, useMeMutation} from '../../redux/api/api';
import {getToken, storeToken, storeUser} from '../../common/ayncStorageGlobal';
import Indicator from '../common/Indicator';

const Login = ({onNext, navigation}) => {
  const [loding, setLoding] = useState(false);
  const [logindata] = useLoginApiMutation();
  const [me] = useMeMutation();

  const Ref = useRef({
    email: '',
    password: '',
  });
  const [errorBg, setErrorBg] = useState({error: false, message: ''});
  const [show, setShow] = useState(true);

  const handleOnChange = (name, text) => {
    Ref.current[name] = text.trim();
  };

  const handleLogIn = async data => {
    // console.log('inside handle logi n');
    let chk;
    setLoding(true);
    var response = await logindata(data);

    console.log(response.data.access_token);

    // console.log(response);
    if (response.data) {
      var token = response.data.access_token;
      chk = await storeToken(token);
      var user = await me(token);
      console.log(user, 'inside Login');
      await storeUser(user);
    }
    setLoding(false);
    if (chk) navigation.replace(navigationString.HOME);

    if (response.error) {
      setErrorBg({error: true, message: response.error.data.message});
    }
  };
  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginTop: 20,
      }}>
      <Text style={styless.heading}>Login</Text>
      <View style={[styles.IputStyle, errorBg.error && styless.errorStyle]}>
        <Image
          style={styles.ImgStyle}
          source={require('../../assets/email.png')}
        />
        <TextInput
          placeholder="Email"
          style={{flex: 1}}
          onChangeText={text => handleOnChange('email', text)}
          autoCapitalize="none"
        />
      </View>

      <View style={[styles.IputStyle, errorBg.error && styless.errorStyle]}>
        <Image
          source={require('../../assets/password.png')}
          style={styles.ImgStyle}
        />
        <TextInput
          placeholder="Password"
          style={{flex: 1}}
          onChangeText={text => handleOnChange('password', text)}
          secureTextEntry={show ? true : false}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setShow(!show)}>
          <Image
            source={
              show
                ? require('../../assets/showpassword.png')
                : require('../../assets/hidepassword.png')
            }
            style={styles.ImgStyle}
          />
        </TouchableOpacity>
      </View>
      <ErrorMessage title={errorBg.message} />

      <Text style={styless.textStyle} onPress={() => onNext('forgotPassword')}>
        Forgot password ?
      </Text>

      <Button title="Log in" onPress={() => handleLogIn(Ref.current)} />

      <Text style={styless.or}>Or</Text>

      <GoogleButton title="Login with Google" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 15,
        }}>
        <TouchableOpacity onPress={() => onNext('signUp')}>
          <Text>New to KtGuru? </Text>

          <Text style={{fontSize: 14, color: '#0153CC', alignSelf: 'center'}}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
      {loding && <Indicator />}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  IputStyle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginTop: 10,
    borderBottomColor: '#E8E7EA',
    marginBottom: 5,
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 4,
  },
  ImgStyle: {
    tintColor: '#AEAEAE',
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
});
