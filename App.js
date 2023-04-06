import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import Routes from './src/navigations/Routes';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <Provider store={store}>
      <View style={{height: '100%', backgroundColor: 'pink'}}>
        <Routes />
        {/* <FlashMessage position="top" /> */}
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
