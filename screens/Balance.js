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
import Colors from '../constants/Colors';
import {
  setLoading,
  getMyTransactions,
  setRefresh,
} from '../store/actions/orderActions';
import TransactionItem from '../components/UI/TransactionItem';
import 'intl';
import 'intl/locale-data/jsonp/en';

if (Platform.OS === 'android') {
  // See https://github.com/expo/expo/issues/6536 for this issue.
  if (typeof Intl.__disableRegExpRestore === 'function') {
    Intl.__disableRegExpRestore();
  }
}
const Balance = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.order.error);
  const refreshing = useSelector((state) => state.order.refreshing);
  const loading = useSelector((state) => state.order.loading);
  const transactions = useSelector((state) => state.order.transactions);
  const balance = useSelector((state) => state.auth.user.balance);
  useEffect(() => {
    dispatch(setLoading());
    dispatch(getMyTransactions());
  }, []);
  const onRefresh = useCallback(() => {
    dispatch(setRefresh());
    dispatch(getMyTransactions());
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occured!', error, [
        { text: 'Okay', onPress: () => dispatch(clearErrors()) },
      ]);
    }
  }, [error]);
  if (loading) {
    return (
      <View style={styles.scrollView}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }
  let transactionsLength;
  if (transactions) transactionsLength = transactions.length;

  const formatNum = (value) =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'LBP',
      maximumSignificantDigits: 6,
    }).format(value);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={transactions}
          keyExtractor={(item, index) => item._id}
          ListEmptyComponent={<Text>You have no transactions!</Text>}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={(itemData) => (
            <TransactionItem
              amount={itemData.item.amount}
              order={itemData.item.order && itemData.item.order.title}
              driver={itemData.item.order && itemData.item.order.driver.name}
              user={itemData.item.order && itemData.item.order.user.name}
              date={itemData.item.createdAt}
              type={itemData.item.type}
              middle={itemData.item.ownerType}
            />
          )}
        />
      </View>
      <View style={styles.balance}>
        <Text style={styles.balanceText}>Balance: {formatNum(balance)}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Balance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    //backgroundColor: 'black',
    marginBottom: 50,
  },
  balance: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.accent,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary,
    fontSize: 18,
  },
});
