import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import Colors from '../constants/Colors';
import SearchDestingation from '../components/AddressPicker';
import { useSelector } from 'react-redux';

const MapScreen = (props) => {
  // React.useLayoutEffect(() => {
  //   // const saveFn = props.route.params.saveLocation();
  //   // const readonly = props.route.params.readonly;
  //   props.navigation.setOptions({
  //     headerRight: () => (
  //       <HeaderButtons HeaderButtonComponent={HeaderButton}>
  //         <Item
  //           title='save'
  //           iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
  //           onPress={() => props.route.params.saveLocation()}
  //         />
  //       </HeaderButtons>
  //     ),
  //   });
  // }, [props.navigation]);

  const initialLocation = props.route.params.initialLocation;

  const readonly = props.route.params.readonly;

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapRegion, setmapRegion] = useState({
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  // console.log('1-', selectedLocation);

  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    // console.log(selectedLocation);
    if (!selectedLocation) {
      // could show an alert!
      //console.log('hello');
      return;
    }
    props.navigation.navigate('Add Order', {
      pickedLocation: selectedLocation,
    });
  }, [selectedLocation]);

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

  let coordinates = useSelector((state) => state.order.coordinates);
  let markerCoordinates;
  if (coordinates) coordinates = coordinates.result.geometry.location;

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
      setSelectedLocation({
        lat: coordinates.lat,
        lng: coordinates.lng,
      });
    }
  }, [coordinates]);

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <View style={styles.container}>
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
    </View>
  );
};

// MapScreen.navigationOptions = (navData) => {
//   const saveFn = navData.navigation.getParam('saveLocation');
//   const readonly = navData.navigation.getParam('readonly');
//   if (readonly) {
//     return {};
//   }
//   return {
//     headerRight: (
//       <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
//         <Text style={styles.headerButtonText}>Save</Text>
//       </TouchableOpacity>
//     ),
//   };
// };

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

export default MapScreen;
