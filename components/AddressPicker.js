import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, getCoordinates } from '../store/actions/orderActions';
import ENV from '../env';

const googleApiKey = ENV().googleApiKey;

const AddressPicker = (props) => {
  const dispatch = useDispatch();
  // console.log(props.route.params.initialLocation);
  // const lng = props.route.params.initialLocation.ln;
  // const lat = props.route.params.initialLocation.lat;

  const retCoordinates = (placeId) => {
    dispatch(getCoordinates(placeId));
  };
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = true) => {
        // 'details' is provided when fetchDetails = true
        retCoordinates(data.place_id);
      }}
      query={{
        key: googleApiKey,
        language: 'en',
      }}
      enablePoweredByContainer={false}
      //fetchDetails={true}
      // currentLocation={true}
      // currentLocationLabel='Current location'
    />
  );
};

export default AddressPicker;

const styles = StyleSheet.create({});
