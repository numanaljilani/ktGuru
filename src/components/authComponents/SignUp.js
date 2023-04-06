import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import React, {useRef, useState} from 'react';
import Button from '../common/Button';
import GoogleButton from '../common/GoogleButton';
import styless from './commonStyle';
import ErrorMessage from '../common/ErrorMessage';
import Indicator from '../common/Indicator';
import {useSignUpApiMutation} from '../../redux/api/api';

const SignUp = ({onNext, navigation}) => {
  // console.log('component rerender');

  const [show, setShow] = useState(true);
  const [showconf, setShowConf] = useState(true);
  const [loading, setLoading] = useState(false);
  const [signUpApi] = useSignUpApiMutation();
  const [error, setError] = useState({
    message: '',
    status: '',
  });

  const [errorBg, setErrorBg] = useState({
    email: false,
    name: false,
    password: false,
  });

  const Ref = useRef({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const conformPass = useRef({conformPassword: ''});

  const handleOnChange = (name, text) => {
    Ref.current[name] = text.trim();
  };

  const handleSignUpPost = async data => {
    if (!data.firstName || !data.lastName) {
      // console.log('all fields are reuired');
      return;
    }
    if (Ref.current.password !== conformPass.current) {
      setErrorBg({...errorBg, password: true});
      // console.log('password does not matched');
      return;
    }
    let response;

    setLoading(true);
    response = await signUpApi(data);
    setLoading(false);
    onNext('login');
    if (response.error) {
      if (response.error.status == 409) {
        setError({
          message: response.error.data.message,
          status: response.error.status,
        });
        setLoading(false);
      }
      if (response.error.status == 422) {
        setError({
          message: response.error.data.message,
          status: response.error.status,
        });
        setLoading(false);
      }
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginTop: 20,
      }}>
      <Text style={styless.heading}>Sign up</Text>

      <View style={[styles.IputStyle]}>
        <Image
          style={styles.ImgStyle}
          source={require('../../assets/user.png')}
        />
        <TextInput
          placeholder="First name"
          style={{flex: 1}}
          autoCapitalize="none"
          onChangeText={text => handleOnChange('firstName', text)}
          selectTextOnFocus={true}
        />
        <TextInput
          placeholder="Last name"
          style={{flex: 1}}
          autoCapitalize="none"
          onChangeText={text => handleOnChange('lastName', text)}
        />
      </View>
      <View
        style={[styles.IputStyle, error.status === 409 && styless.errorStyle]}>
        <Image
          style={styles.ImgStyle}
          source={require('../../assets/email.png')}
        />
        <TextInput
          placeholder="Email"
          style={[{flex: 1}]}
          autoCapitalize="none"
          textContentType="emailAddress"
          onChangeText={text => handleOnChange('email', text)}
          keyboardType="email-address"
        />
      </View>
      {error.status === 409 && <ErrorMessage title={error.message} />}

      <View style={[styles.IputStyle, errorBg.password && styless.errorStyle]}>
        <Image
          source={require('../../assets/password.png')}
          style={styles.ImgStyle}
        />
        <TextInput
          placeholder="Password"
          style={{flex: 1}}
          textContentType={'password'}
          autoCapitalize="none"
          onChangeText={text => handleOnChange('password', text)}
          secureTextEntry={show ? true : false}
        />
        <TouchableOpacity onPress={() => setShow(!show)}>
          <Image
            source={
              show
                ? require('../../assets/showpassword.png')
                : require('../../assets/hidepassword.png')
            }
            style={[styles.ImgStyle]}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.IputStyle, errorBg.password && styless.errorStyle]}>
        <Image
          source={require('../../assets/password.png')}
          style={styles.ImgStyle}
        />
        <TextInput
          placeholder="Conform Password"
          style={{flex: 1}}
          autoCapitalize="none"
          textContentType="password"
          onChangeText={text => (conformPass.current = text.trim())}
          secureTextEntry={showconf ? true : false}
        />
        <TouchableOpacity onPress={() => setShowConf(!showconf)}>
          <Image
            source={
              showconf
                ? require('../../assets/showpassword.png')
                : require('../../assets/hidepassword.png')
            }
            style={styles.ImgStyle}
          />
        </TouchableOpacity>
      </View>
      {errorBg.password && <ErrorMessage title={'please confirm  password'} />}
      <View
        style={{
          margin: 15,
        }}>
        <Text style={{fontSize: 12, alignSelf: 'center'}}>
          By Signing up you are agree to our
        </Text>
        <Text
          style={{
            color: '#1F67D2',
            fontSize: 12,
            alignSelf: 'center',
          }}>
          Terms & Conditions and Privacy Policy
        </Text>
      </View>

      <Button title="Sign up" onPress={() => handleSignUpPost(Ref.current)} />

      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 16,
          marginVertical: 10,
        }}>
        Or
      </Text>

      <GoogleButton title="Sign up with Google" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 15,
        }}>
        <Text>If you already have an account, </Text>
        <TouchableOpacity
          onPress={() => {
            onNext('login');
          }}>
          <Text style={{fontSize: 14, color: '#0153CC'}}>login.</Text>
        </TouchableOpacity>
      </View>
      {loading && <Indicator />}
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  IputStyle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginTop: 10,
    borderBottomColor: '#E8E7EA',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  ImgStyle: {
    tintColor: '#AEAEAE',
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
});
