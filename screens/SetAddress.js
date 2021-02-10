import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import Colors from '../constants/Colors';
import SearchDestingation from '../components/AddressPicker';
import { useSelector, useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { setAddress } from '../store/actions/authActions';

const SetAddress = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [initialLocation, setInitialLocation] = useState(null);
  const [mapRegion, setmapRegion] = useState({
    latitude: initialLocation ? initialLocation.lat : 37.4217638,
    longitude: initialLocation ? initialLocation.lng : -122.0838878,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  let markerCoordinates;
  // const [selectedLocation, setSelectedLocation] = useState();
  useEffect(() => {
    getLocationHandler();
  }, []);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setInitialLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      setmapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };
  if (initialLocation) {
    markerCoordinates = {
      latitude: initialLocation.lat,
      longitude: initialLocation.lng,
    };
  }
  const selectLocationHandler = (event) => {
    setInitialLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const dispatch = useDispatch();
  let coordinates = useSelector((state) => state.order.coordinates);
  let address;
  useEffect(() => {
    if (coordinates) {
      markerCoordinates = {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      };
      setmapRegion({
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setInitialLocation({
        lat: coordinates.lat,
        lng: coordinates.lng,
      });
    }
  }, [coordinates]);

  if (coordinates) {
    address = coordinates.result.formatted_address;
    coordinates = coordinates.result.geometry.location;
  }
  const savePickedLocationHandler = useCallback(() => {
    if (!initialLocation) {
      return;
    }
    let fulladdress = {
      coordinates: { lat: initialLocation.lat, lng: initialLocation.lng },
      address,
    };
    dispatch(setAddress(fulladdress));
    // props.navigation.navigate('Home');
  }, [initialLocation]);
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='save'
            iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
            onPress={savePickedLocationHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [savePickedLocationHandler]);

  return (
    <View style={styles.container}>
      {isFetching ? (
        <ActivityIndicator size='large' color={Colors.primary} />
      ) : (
        <>
          <MapView
            style={styles.map}
            region={mapRegion}
            onPress={selectLocationHandler}
          >
            {markerCoordinates && (
              <Marker title='Picked Location' coordinate={markerCoordinates} />
            )}
          </MapView>
          <View style={styles.inputView}>
            <SearchDestingation />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },

  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary,
  },
  inputView: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
  },
});

export default SetAddress;
