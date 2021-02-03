import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../constants/Colors';
const DropDownFilter = (props) => {
  return (
    <View>
      <DropDownPicker
        items={[
          {
            label: 'Pending',
            value: 'pending',
            icon: () => <Icon name='flag' size={18} color={Colors.primary} />,
            // hidden: true,
          },
          {
            label: 'Approved',
            value: 'approved',
            icon: () => <Icon name='flag' size={18} color={Colors.primary} />,
          },
          {
            label: 'Collected',
            value: 'collected',
            icon: () => <Icon name='flag' size={18} color={Colors.primary} />,
          },
          {
            label: 'Delivered',
            value: 'delivered',
            icon: () => <Icon name='flag' size={18} color={Colors.primary} />,
          },
        ]}
        defaultValue={'pending'}
        containerStyle={{ height: 80 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{ justifyContent: 'flex-start' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => props.setStatus(item.value)}
      />
    </View>
  );
};

export default DropDownFilter;

const styles = StyleSheet.create({});
