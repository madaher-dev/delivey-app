import React, { useEffect, useCallback, useState } from 'react';
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
import Colors from '../../constants/Colors';
import {
  setLoading,
  getAllTransactions,
  setRefresh,
} from '../../store/actions/orderActions';
import { getAllUsers, setSelectedNav } from '../../store/actions/adminActions';
import TransactionItem from '../../components/UI/TransactionItem';
import { Picker } from '@react-native-picker/picker';
import 'intl';
import 'intl/locale-data/jsonp/en';

if (Platform.OS === 'android') {
  // See https://github.com/expo/expo/issues/6536 for this issue.
  if (typeof Intl.__disableRegExpRestore === 'function') {
    Intl.__disableRegExpRestore();
  }
}
const AdminBalance = (props) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.order.error);
  const refreshing = useSelector((state) => state.order.refreshing);
  const loading = useSelector((state) => state.order.loading);
  const transactions = useSelector((state) => state.order.transactions);
  const allUsers = useSelector((state) => state.admin.allUsers);
  const users = allUsers.filter((user) => user.role === 'user');
  const drivers = allUsers.filter((user) => user.role === 'driver');
  const [type, setType] = useState('all');
  const [selected, setSelected] = useState();
  const [pickerItems, setPickerItems] = useState(allUsers);

  let selectedTransactions;

  if (!selected) {
    selectedTransactions = transactions;
  } else {
    selectedTransactions = transactions.filter(
      (transaction) => transaction.user._id === selected._id
    );
  }

  useEffect(() => {
    if (type === 'users') setPickerItems(users);
    else if (type === 'drivers') setPickerItems(drivers);
    else setPickerItems(allUsers);
  }, [type, allUsers]);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      dispatch(setLoading());
      dispatch(getAllTransactions());
      dispatch(getAllUsers());
    });
  }, [props.navigation]);

  const onRefresh = useCallback(() => {
    dispatch(setRefresh());
    dispatch(getAllTransactions());
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

  const formatNum = (value) =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'LBP',
      maximumSignificantDigits: 6,
    }).format(value);
  // console.log(transactions);
  let balance = 0;

  selectedTransactions.forEach((item) => {
    balance += item.amount;
  });
  console.log(selected);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pickers}>
        <Picker
          selectedValue={type}
          style={{
            height: Platform.OS === 'ios' ? 80 : 44,
            width: '50%',
          }}
          itemStyle={{ height: 80 }}
          onValueChange={(itemValue, itemIndex) => setType(itemValue)}
          dropdownIconColor={Colors.primary}
          prompt='Select User Type'
        >
          <Picker.Item label='All' value='all' />
          <Picker.Item label='Users' value='users' />
          <Picker.Item label='Drivers' value='drivers' />
        </Picker>
        <Picker
          selectedValue={selected}
          style={{
            height: Platform.OS === 'ios' ? 80 : 44,
            width: '50%',
          }}
          itemStyle={{ height: 80 }}
          onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
          dropdownIconColor={Colors.primary}
          prompt='Select User'
        >
          <Picker.Item label={'All Users'} value={null} key={0} />
          {pickerItems.map((item, index) => {
            return (
              <Picker.Item label={item.name} value={item} key={item._id} />
            );
          })}
        </Picker>
      </View>
      <View style={styles.list}>
        <FlatList
          data={selectedTransactions}
          keyExtractor={(item, index) => item._id}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center' }}>
              User has no transactions!
            </Text>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={(itemData) => (
            <TransactionItem
              amount={itemData.item.amount}
              order={itemData.item.order && itemData.item.order.title}
              driver={itemData.item.order && itemData.item.order.driver.name}
              user={
                itemData.item.order
                  ? itemData.item.order.user.name
                  : itemData.item.user.name
              }
              date={itemData.item.createdAt}
              type={itemData.item.type}
              middle={itemData.item.ownerType}
            />
          )}
        />
      </View>
      <View style={styles.balance}>
        <Text style={styles.balanceText}>
          Balance: {formatNum(balance * -1)}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AdminBalance;

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
  pickers: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
