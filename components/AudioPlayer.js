import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function AudioPlayer(props) {
  const [sound, setSound] = React.useState();
  // console.log(props.uri);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({ uri: props.uri });
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
    console.log('Finished Playing');
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title='Play Sound' onPress={playSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
