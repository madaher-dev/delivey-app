import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import 'intl';
import { Platform, View, Text } from 'react-native';
import 'intl/locale-data/jsonp/en';

if (Platform.OS === 'android') {
  // See https://github.com/expo/expo/issues/6536 for this issue.
  if (typeof Intl.__disableRegExpRestore === 'function') {
    Intl.__disableRegExpRestore();
  }
}

const MyNumberFormat = (props) => {
  const [money, setMoney] = useState('');
  const [formated, setFormated] = useState('');
  const formatNum = (value) =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'LBP',
      maximumSignificantDigits: 3,
    }).format(value);

  const format = (amount) => {
    const value = formatNum(amount);
    setFormated(value);
    setMoney(amount);
    props.setFieldValue('amount', amount);
  };

  //console.log(format(money));
  return (
    <View>
      <Text>{formated}</Text>
      <TextInput
        value={money}
        onChangeText={(money) => format(money)}
        style={props.style}
        keyboardType='numeric'
        placeholder='Amount to be collected on destination'
      />
    </View>
  );
};

export default MyNumberFormat;
