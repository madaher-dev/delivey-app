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
import {
  setStatus,
  getOrder,
  setLoading,
  rejectOrder,
} from '../../store/actions/orderActions';
import { addTransactions } from '../../store/actions/driverActions';
import CustomButton from '../../components/UI/CustomButton';
import AudioSlider from '../../components/AudioPlayer/AudioSlider';
import Colors from '../../constants/Colors';
import MapPreview from '../../components/UI/MapPreview';
import { createOpenLink } from 'react-native-open-maps';
import ImageViewer from 'react-native-image-zoom-viewer';
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

  const [driver, setDriver] = useState();
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

    dispatch(getOrder(orderId));
  }, []);

  const handleApprove = () => {
    dispatch(setLoading());
    dispatch(setStatus(orderId, 'approved'));
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Approved', params: { status: 'approved' } }],
    });
  };

  const handleCollect = () => {
    dispatch(setLoading());
    dispatch(setStatus(orderId, 'collected'));
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Collected', params: { status: 'collected' } }],
    });
  };
  const handleDeliver = () => {
    dispatch(setLoading());
    dispatch(setStatus(orderId, 'delivered'));
    dispatch(addTransactions(orderId));
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Delivered', params: { status: 'delivered' } }],
    });
  };
  const handleDecline = () => {
    dispatch(setLoading());
    dispatch(rejectOrder(orderId));
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Home', params: { status: 'pending' } }],
    });
  };
  let totalAmount = parseInt(amount, 10) + 5000;
  if (longTrip) totalAmount = parseInt(amount, 10) + 7500;
  const formatedTotalAmount = formatNum(totalAmount);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{order.title}</Text>
      </View>

      <View style={styles.buttonRow}>
        {order.status === 'pending' || order.status === 'approved' ? (
          <CustomButton
            onPress={handleDecline}
            label='Decline'
            color={Colors.accent}
            style={styles.button}
          />
        ) : null}

        {order.status === 'pending' ? (
          <CustomButton
            onPress={handleApprove}
            label='Approve'
            color={Colors.primary}
            style={styles.button}
          />
        ) : order.status === 'approved' ? (
          <CustomButton
            onPress={handleCollect}
            label='Collect'
            color={Colors.primary}
            style={styles.button}
          />
        ) : order.status === 'collected' ? (
          <CustomButton
            onPress={handleDeliver}
            label='Delivered'
            color={Colors.primary}
            style={styles.button}
          />
        ) : null}
      </View>
      <ScrollView style={{ width: '100%' }}>
        <View style={{ alignItems: 'center' }}>
          {address || location.lat ? (
            <>
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
                <View style={styles.text}>
                  <Text>Delivery Charge: </Text>
                  <Text>{!longTrip ? 'LBP5,000' : 'LBP7,500'}</Text>
                </View>
              </View>
              <View style={styles.text}>
                <Text>Total: </Text>
                <Text>{formatedTotalAmount}</Text>
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
    flex: 1,
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
  audio: {
    width: '60%',
  },
});
