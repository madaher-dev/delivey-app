import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Colors from '../constants/Colors';
const NoOrders = (props) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Text style={{ textAlign: 'center' }}>
        You do not have any{' '}
        <Text
          style={{
            fontWeight: 'bold',
            textTransform: 'capitalize',
            color: Colors.primary,
          }}
        >
          {props.status}
        </Text>{' '}
        Orders! Click on the + icon in the Header to start a new Order or reset
        your filters to see other orders.
      </Text>
      <Button
        color={Colors.primary}
        icon='plus'
        mode='contained'
        onPress={() => props.navigation.navigate('Add Order')}
        style={{
          width: 200,
          height: 40,
          justifyContent: 'center',
          alignContent: 'center',
          marginVertical: 15,
        }}
      >
        Add Order
      </Button>
    </View>
  );
};

export default NoOrders;

const styles = StyleSheet.create({});
