import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import OrderItem from '../components/UI/OrderItem';
import NoOrders from '../components/NoOrders';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrders,
  clearErrors,
  setRefresh,
} from '../store/actions/orderActions';
import Colors from '../constants/Colors';

const UserHome = (props) => {
  const dispatch = useDispatch();

  const refreshing = useSelector((state) => state.order.refreshing);
  const orders = useSelector((state) => state.order.orders);
  //const index = useSelector((state) => state.order.tabIndex);
  const loading = useSelector((state) => state.order.loading);
  //Erro Handler
  const error = useSelector((state) => state.order.error);
  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occured!', error, [
        { text: 'Okay', onPress: () => dispatch(clearErrors()) },
      ]);
    }
  }, [error]);

  let state;
  if (props.index === 0) state = 'pending';
  else if (props.index === 1) state = 'active';
  else state = 'delivered';
  //Fileter State

  let filteredOrders;
  let orderLength;
  if (orders) {
    filteredOrders = orders.filter((order) =>
      props.index === 0
        ? order.status === 'pending'
        : props.index === 1
        ? order.status === 'approved' || order.status === 'collected'
        : order.status === 'delivered'
    );
    orderLength = filteredOrders.length;
  }

  const onRefresh = useCallback(() => {
    dispatch(setRefresh());
    dispatch(getOrders());
  }, []);

  if (loading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {orderLength === 0 && (
        <NoOrders navigation={props.navigation} status={state} />
      )}

      <FlatList
        data={filteredOrders}
        keyExtractor={(item, index) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={(itemData) => (
          <OrderItem
            title={itemData.item.title}
            // image={
            //   itemData.item.imageUri
            //     ? `${url}/static/images/orders/${itemData.item.imageUri}`
            //     : null
            // }
            //address={itemData.item.destinationLocation}
            address={itemData.item.destinationLocation.address}
            long={itemData.item.longTrip}
            driver={itemData.item.driver && itemData.item.driver.name}
            date={itemData.item.createdAt}
            status={itemData.item.status}
            onSelect={() => {
              props.navigation.navigate('Order Details', {
                title: itemData.item.title,
                orderId: itemData.item._id,
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default UserHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    //backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
