import React, { useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLoading,
  getAllOrders,
  clearErrors,
  setRefresh,
} from '../../store/actions/driverActions';
import AdminOrderItem from '../../components/UI/AdminOrderItem';
import Colors from '../../constants/Colors';

const Home = (props) => {
  const page = props.route.params.status;
  const dispatch = useDispatch();
  //Erro Handler
  const error = useSelector((state) => state.driver.error);
  const allOrders = useSelector((state) => state.driver.allOrders);

  const assignedOrders = allOrders.filter(
    (order) => order.status === 'pending'
  );

  const approvedOrders = allOrders.filter(
    (order) => order.status === 'approved'
  );

  const collectedOrders = allOrders.filter(
    (order) => order.status === 'collected'
  );

  const deliveredOrders = allOrders.filter(
    (order) => order.status === 'delivered'
  );
  let orders;
  if (page === 'pending') orders = assignedOrders;
  else if (page === 'delivered') orders = deliveredOrders;
  else if (page === 'approved') orders = approvedOrders;
  else if (page === 'collected') orders = collectedOrders;

  let orderLength;
  if (orders) orderLength = orders.length;
  const refreshing = useSelector((state) => state.driver.refreshing);
  const loading = useSelector((state) => state.driver.loading);

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
    dispatch(getAllOrders());
  }, []);
  const onRefresh = useCallback(() => {
    dispatch(setRefresh());
    dispatch(getAllOrders());
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
      {orderLength === 0 || !orderLength ? (
        <View style={styles.noOrder}>
          <Text>You are all set!</Text>
        </View>
      ) : null}

      <FlatList
        data={orders}
        keyExtractor={(item, index) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={(itemData) => (
          <AdminOrderItem
            title={itemData.item.title}
            driver={itemData.item.driver}
            destination={itemData.item.destinationLocation.address}
            location={itemData.item.startLocation.address}
            date={itemData.item.createdAt}
            status={itemData.item.status}
            onSelect={() => {
              props.navigation.navigate('Order Details', {
                title: itemData.item.user.name,
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
  noOrder: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
