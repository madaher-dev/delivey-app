import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function AudioRecorder(props) {
  const [recording, setRecording] = React.useState();
  const [available, setAvailable] = React.useState();

  async function startRecording() {
    try {
      //console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      //console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      // console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    //console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    const uri = recording.getURI();
    props.setFieldValue('audioUri', uri);
    setAvailable(true);
    //console.log('Recording stopped and stored at', uri);
  }
  async function deleteRecording() {
    setAvailable(false);
    props.setFieldValue('audioUri', '');

    //console.log('Recording deleted');
  }

  return (
    <View style={styles.container}>
      {available ? (
        <Button title='Delete Recording' onPress={deleteRecording} />
      ) : (
        <Button
          title={recording ? 'Stop Recording' : 'Start Recording'}
          onPress={recording ? stopRecording : startRecording}
        />
      )}
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
