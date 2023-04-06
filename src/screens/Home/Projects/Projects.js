import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {Button, TextInput} from 'react-native-paper';
import imagePath from '../../../constant/imagePath';
import {showMessage, hideMessage} from 'react-native-flash-message';

const DATA = [
  {
    id: 'bd7bea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68ac605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f3da1-47-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b16c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-4f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3adbb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd9197f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7',
    title: 'Third Item',
  },
];
const Item = ({title}) => (
  <TouchableOpacity>
    <View
      style={{
        paddingVertical: 25,
        borderRadius: 10,
        paddingHorizontal: 10,
        margin: 5,
        backgroundColor: 'white',
      }}>
      <Text style={styles.title}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const Projects = () => {
  return (
    <View>
      <Button
        style={{backgroundColor: 'purple'}}
        onPress={() => {
          /* HERE IS WHERE WE'RE GOING TO SHOW OUR FIRST MESSAGE */
          showMessage({
            message: 'Simple message',
            type: 'danger',
            // position: 'bottom',
          });
        }}
        title="Request Details"
      />

      <TextInput
        placeholder="Search"
        mode="outlined"
        style={{marginVertical: 10, marginHorizontal: 20}}
        right={<TextInput.Icon icon={imagePath.icSearch} />}
      />
      <View
        style={{
          backgroundColor: '#E0DFE6',
          width: '100%',
        }}>
        <FlatList
          data={DATA}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
      </View>
      <FlashMessage position="top" />
    </View>
  );
};

export default Projects;
