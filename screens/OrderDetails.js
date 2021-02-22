import React, { useState, useEffect } from 'react';
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
  getOrder,
  setLoading,
  clearErrors,
} from '../store/actions/orderActions';
import Colors from '../constants/Colors';
import MapPreview from '../components/UI/MapPreview';
import { createOpenLink } from 'react-native-open-maps';
import ImageViewer from 'react-native-image-zoom-viewer';
import AudioSlider from '../components/AudioPlayer/AudioSlider';
import 'intl';
import 'intl/locale-data/jsonp/en';
import ENV from '../env';

// import('intl').then(() => import('intl/locale-data/jsonp/en'));
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
  const orderId = props.route.params ? props.route.params.orderId : null;
  const order = useSelector((state) => state.order.currentOrder);
  const error = useSelector((state) => state.admin.error);
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
  //const formatedAmount = amount;
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
  useEffect(() => {
    dispatch(setLoading());
    dispatch(getOrder(orderId));
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occured!', error, [
        { text: 'Okay', onPress: () => dispatch(clearErrors()) },
      ]);
    }
  }, [error]);
  let totalAmount = parseInt(amount, 10) + 5000;
  if (longTrip) totalAmount = parseInt(amount, 10) + 7500;
  const formatedTotalAmount = formatNum(totalAmount);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textBox}>
        <Text>Receiver Name: </Text>
        <Text>{receiver}</Text>
      </View>
      <View style={styles.textBox}>
        <Text>Receiver number: </Text>
        <Text>{receiverPhone}</Text>
      </View>

      <View style={styles.textBox}>
        <Text>Amount: </Text>
        <Text>{formatedAmount}</Text>
      </View>
      <View style={styles.textBox}>
        <Text>Delivery Charge: </Text>
        <Text>{!longTrip ? 'LBP5,000' : 'LBP7,500'}</Text>
      </View>
      <View style={styles.textBox}>
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
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
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
    //flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    marginVertical: 5,
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
    //flex: 1,
    width: '100%',
    flexDirection: 'row',
    textAlign: 'left',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  audio: {
    width: '60%',
  },
});
