import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Button,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrders,
  clearErrors,
  setRefresh,
  setLoading,
} from '../store/actions/orderActions';
import OrderItem from '../components/UI/OrderItem';
import NoOrders from '../components/NoOrders';
import DropDownFilter from '../components/DropDownFilter';
import Colors from '../constants/Colors';
import ENV from '../env';

const url = ENV().url;
const Home = (props) => {
  const dispatch = useDispatch();

  //Erro Handler
  const error = useSelector((state) => state.order.error);
  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occured!', error, [
        { text: 'Okay', onPress: () => dispatch(clearErrors()) },
      ]);
    }
  }, [error]);

  //Fetch Data on Load and Refresh

  useEffect(() => {
    dispatch(setLoading());
    dispatch(getOrders());
  }, []);

  const onRefresh = useCallback(() => {
    dispatch(setRefresh());
    dispatch(getOrders());
  }, []);

  const refreshing = useSelector((state) => state.order.refreshing);
  const orders = useSelector((state) => state.order.orders);

  //Fileter State
  const [state, setState] = useState('pending');
  let filteredOrders;
  let orderLength;
  if (orders) {
    filteredOrders = orders.filter((order) => order.status === state);
    orderLength = filteredOrders.length;
  }
  const loading = useSelector((state) => state.order.loading);
  if (loading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <DropDownFilter setStatus={setState} />
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

export default Home;

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
