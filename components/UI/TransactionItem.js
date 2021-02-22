import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { format, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import 'intl';
import 'intl/locale-data/jsonp/en';

if (Platform.OS === 'android') {
  // See https://github.com/expo/expo/issues/6536 for this issue.
  if (typeof Intl.__disableRegExpRestore === 'function') {
    Intl.__disableRegExpRestore();
  }
}
const TransactionItem = (props) => {
  const { type, driver, amount, order, user, date, middle } = props;
  const formatNum = (value) =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'LBP',
      maximumSignificantDigits: 6,
    }).format(value);

  return (
    <TouchableOpacity onPress={() => {}} style={styles.transactionItem}>
      <View style={styles.firstCol}>
        <View>
          <Text style={styles.order}>{order}</Text>
        </View>
        <View>
          <Text style={styles.text}>
            {format(parseISO(date), 'dd/MM/yyyy')}
          </Text>
        </View>
        <View>
          <Text style={styles.text}>{type}</Text>
        </View>
      </View>

      <View style={styles.userRow}>
        {middle === 'driver' || type != 'order' ? (
          <Text style={styles.user}>{user}</Text>
        ) : middle === 'user' ? (
          <Text style={styles.user}>{driver}</Text>
        ) : (
          <>
            <Text style={styles.user}>{user}</Text>
            <Text style={styles.user}>{driver}</Text>
          </>
        )}
      </View>

      <View style={styles.amount}>
        <Text
          style={amount < 0 ? styles.amountTextRed : styles.amountTextGreen}
        >
          {formatNum(amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  transactionItem: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 30,
    // flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
    //backgroundColor: 'black',
  },
  order: {
    fontFamily: 'open-sans-bold',
    color: Colors.accent,
    fontSize: 16,
    marginBottom: 5,

    overflow: 'hidden',
  },
  text: {
    fontFamily: 'open-sans',
    color: Colors.accent,
    fontSize: 14,
    marginBottom: 5,

    overflow: 'hidden',
  },
  userRow: {
    flexGrow: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  user: {
    fontFamily: 'open-sans',
    color: Colors.accent,
    fontSize: 14,
    marginBottom: 5,

    overflow: 'hidden',
  },
  amount: {
    height: '100%',
    minWidth: 100,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  firstCol: {
    minWidth: 150,

    alignItems: 'flex-start',
  },
  amountTextRed: {
    fontFamily: 'open-sans-bold',
    color: 'red',
    fontSize: 14,
  },
  amountTextGreen: {
    fontFamily: 'open-sans-bold',
    color: 'green',
    fontSize: 14,
  },
});
