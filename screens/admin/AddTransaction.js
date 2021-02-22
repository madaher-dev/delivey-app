import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Keyboard } from 'react-native';
import Colors from '../../constants/Colors';
import { TextInput } from 'react-native-paper';
import CustomButton from '../../components/UI/CustomButton';
import { useDispatch } from 'react-redux';
import { payTransaction } from '../../store/actions/adminActions';

const AddTransaction = (props) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const handlePay = () => {
    dispatch(payTransaction(amount, props.route.params.id, 'pay'));
    props.navigation.goBack();
  };
  const handleCollect = () => {
    dispatch(payTransaction(amount, props.route.params.id, 'collect'));
    props.navigation.goBack();
  };

  return (
    <Pressable
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text>Amount to Pay/Collect from</Text>
        <Text style={styles.name}>{props.route.params.name}</Text>
        <TextInput
          onChangeText={(text) => setAmount(text)}
          value={amount}
          defaultValue={amount}
          keyboardType='numeric'
          style={styles.amountInput}
        />
        <Text style={styles.name}>LBP</Text>
        <CustomButton
          onPress={handlePay}
          label='Pay'
          color={Colors.accent}
          style={styles.button}
        />
        <CustomButton
          onPress={handleCollect}
          label='Collect'
          color={Colors.primary}
          style={styles.button}
        />
      </View>
    </Pressable>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary,
    fontSize: 18,
  },
  amountInput: {
    marginTop: 20,
    paddingBottom: 0,
    height: 30,
    width: 250,
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    width: 250,
    marginTop: 10,
  },
});
