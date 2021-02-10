import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Button } from 'react-native-paper';

import Colors from '../../constants/Colors';

const ImgPicker = (props) => {
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      //base64: true,
      quality: 0.5,
    });
    props.setFieldValue('imageUri', image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <Button
        color={Colors.primary}
        icon='camera'
        mode='contained'
        onPress={takeImageHandler}
        style={{
          width: 200,
          height: 40,
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        Take Image
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    //alignItems: 'center',
    //marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImgPicker;
