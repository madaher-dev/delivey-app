import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, clearErrors } from '../../store/actions/adminActions';
import {
  assignDriver,
  getOrder,
  setLoading,
  declineOrder,
  setStatus,
} from '../../store/actions/orderActions';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../../components/UI/CustomButton';
import Colors from '../../constants/Colors';
import MapPreview from '../../components/UI/MapPreview';
import AudioSlider from '../../components/AudioPlayer/AudioSlider';
import { createOpenLink } from 'react-native-open-maps';
import ImageViewer from 'react-native-image-zoom-viewer';
import { TextInput, Checkbox } from 'react-native-paper';
import 'intl/locale-data/jsonp/en';
import ENV from '../../env';

const url = ENV().url;
if (Platform.OS === 'android') {
  // See https://github.com/expo/expo/issues/6536 for this issue.
  if (typeof Intl.__disableRegExpRestore === 'function') {
    Intl.__disableRegExpRestore();
  }
}

const OrderDetails = (props) => {
  const formatNum = (value) =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'LBP',
      maximumSignificantDigits: 6,
    }).format(value);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.admin.error);
  const allUsers = useSelector((state) => state.admin.allUsers);
  const drivers = allUsers.filter(
    (item) => item.role === 'driver' || item.role === 'admin'
  );
  const orderId = props.route.params ? props.route.params.orderId : null;
  const order = useSelector((state) => state.order.currentOrder);
  const {
    receiver,
    receiverPhone,
    imageUri,
    amount,
    destinationLocation,
    startLocation,
    description,
    longTrip,
    audioUri,
  } = order;
  const myId = useSelector((state) => state.auth.user._id);

  const [newAmount, setNewAmount] = useState('');
  const [newlongTrip, setLongTrip] = useState(false);
  useEffect(() => {
    let textAmount = '';
    if (amount) textAmount = amount.toString();
    setLongTrip(longTrip);
    setNewAmount(textAmount);
  }, [amount, longTrip]);

  const formatedAmount = formatNum(amount);
  let location = {},
    address,
    destination = {},
    destinationAddr;
  if (startLocation) {
    location = {
      lng: startLocation.coordinates[1],
      lat: startLocation.coordinates[0],
    };
    address = startLocation.address;
  }
  if (destinationLocation) {
    destination = {
      lng: destinationLocation.coordinates[1],
      lat: destinationLocation.coordinates[0],
    };
    destinationAddr = destinationLocation.address;
  }

  const images = [
    {
      // Simplest usage.
      url: imageUri ? `${url}/static/images/orders/${imageUri}` : null,

      width: '100%',
      //height: 200,
      // Optional, if you know the image size, you can set the optimization performance

      // You can pass props to <Image />.
      props: {
        // headers: ...
      },
    },
  ];
  const [modal, setmodal] = useState(false);
  const toggleModal = () => {
    if (!modal) setmodal(true);
    else setmodal(false);
  };
  //console.log(modal);
  const travelType = 'drive';

  const [driver, setDriver] = useState(myId);
  useEffect(() => {
    if (order.driver) setDriver(order.driver);
  }, [order.driver]);

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occured!', error, [
        { text: 'Okay', onPress: () => dispatch(clearErrors()) },
      ]);
    }
  }, [error]);

  //Fetch Drivers on Load

  useEffect(() => {
    dispatch(setLoading());
    dispatch(getAllUsers());
    dispatch(getOrder(orderId));
  }, []);

  const handleAssign = () => {
    if (driver === myId) {
      dispatch(setLoading());
      dispatch(assignDriver(driver, newAmount, newlongTrip, orderId));
      dispatch(setStatus(orderId, 'approved'));
    } else {
      dispatch(setLoading());
      dispatch(assignDriver(driver, newAmount, newlongTrip, orderId));
    }
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const handleDecline = () => {
    dispatch(setLoading());
    dispatch(declineOrder(orderId));
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{order.title}</Text>
      </View>
      {order.status === 'pending' ? (
        <>
          <View style={styles.label}>
            <Text>Assign Driver</Text>
          </View>

          <Picker
            selectedValue={driver}
            style={{
              height: Platform.OS === 'ios' ? 80 : 44,
              width: '100%',
            }}
            itemStyle={{ height: 80 }}
            onValueChange={(itemValue, itemIndex) => setDriver(itemValue)}
            dropdownIconColor={Colors.primary}
            prompt='Choose Driver'
          >
            {drivers.map((item, index) => {
              return (
                <Picker.Item
                  label={item.name}
                  value={item._id}
                  key={item._id}
                />
              );
            })}
          </Picker>
          <View style={styles.amountRow}>
            <Text>Amount</Text>
            <TextInput
              onChangeText={(text) => setNewAmount(text)}
              value={newAmount}
              defaultValue={newAmount}
              style={styles.amountInput}
            />
            <Text>Long Trip?</Text>
            <Checkbox
              status={newlongTrip ? 'checked' : 'unchecked'}
              onPress={() => {
                setLongTrip(!newlongTrip);
              }}
              color={Colors.primary}
            />
          </View>
          <View style={styles.buttonRow}>
            <CustomButton
              onPress={handleDecline}
              label='Decline'
              color={Colors.accent}
              style={styles.button}
            />
            <CustomButton
              onPress={handleAssign}
              label='Assign'
              color={Colors.primary}
              style={styles.button}
            />
          </View>
        </>
      ) : null}
      <ScrollView style={{ width: '100%' }}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.textBox}>
            <View style={styles.text}>
              <Text>Receiver Name: </Text>
              <Text>{receiver}</Text>
            </View>
            <View style={styles.text}>
              <Text>Receiver number: </Text>
              <Text>{receiverPhone}</Text>
            </View>
          </View>
          <View style={styles.textBox}>
            <View style={styles.text}>
              <Text>Amount: </Text>
              <Text>{formatedAmount}</Text>
            </View>
          </View>

          <View style={styles.note}>
            <Text style={{ textAlign: 'left' }}>{description}</Text>
          </View>
          {audioUri && (
            <View style={styles.audio}>
              <AudioSlider
                audio={`${url}/static/audio/orders/${audioUri}`}
                type='uri'
              />
            </View>
          )}
          {address || location.lat ? (
            <>
              <View style={styles.labelCenter}>
                <Text>Pickup Location</Text>
              </View>
              <MapPreview
                location={location}
                style={styles.mapPreview}
                onPress={createOpenLink({
                  //latitude: location.lat,
                  //longitude: location.lng,
                  query: `${location.lat},${location.lng}`,

                  zoom: 0,
                })}
                // onPress={createOpenLink({
                //   travelType,
                //   end: address,
                //   provider: 'google',
                // })}
              />
            </>
          ) : null}

          {destinationAddr || destination.lat ? (
            <>
              <View style={{ ...styles.labelCenter, marginTop: 20 }}>
                <Text>Destination</Text>
              </View>
              <MapPreview
                location={destination}
                style={styles.mapPreview}
                // onPress={createOpenLink({
                //   query: destinationAddr
                //     ? `${destinationAddr}`
                //     : `${destination.lat},${destination.lng}`,
                //   zoom: 0,
                // })}
                onPress={createOpenLink({
                  query: `${destination.lat},${destination.lng}`,

                  zoom: 0,
                })}
              />
            </>
          ) : null}
          {imageUri ? (
            <>
              <TouchableOpacity
                onPress={toggleModal}
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <Image
                  style={styles.image}
                  source={{
                    uri: `${url}/static/images/orders/${imageUri}`,
                  }}
                />
              </TouchableOpacity>
              <Modal visible={modal} transparent={true}>
                <ImageViewer
                  imageUrls={images}
                  onCancel={toggleModal}
                  enableSwipeDown
                />
              </Modal>
            </>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: '30%',
    height: 40,
  },
  buttonRow: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 30,
    width: '100%',
  },
  title: {
    fontSize: 18,
  },
  titleRow: {
    alignItems: 'center',
    fontSize: 18,
    height: 40,
    paddingVertical: 5,
  },
  label: {
    //padding: 10,
  },
  labelCenter: {
    alignItems: 'center',
  },
  mapPreview: {
    marginBottom: 10,
    width: '60%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  screen: {
    alignItems: 'center',
  },
  image: {
    width: '60%',
    height: 150,
    backgroundColor: 'black',
  },
  textBox: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  text: {
    flexDirection: 'row',
    //flex: 1,
    justifyContent: 'flex-start',
    textAlign: 'left',
    //width: '100%',
    //marginTop: 10,
    //paddingHorizontal: 10,
  },
  note: {
    flex: 1,
    width: '80%',
    flexDirection: 'row',
    textAlign: 'left',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  picker: {
    width: '100%',
    marginBottom: Platform.OS === 'ios' ? 100 : 0,
  },
  amountRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  amountInput: {
    flex: 1,
    paddingBottom: 0,
    height: 30,
  },
  audio: {
    width: '60%',
  },
});
