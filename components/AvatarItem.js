import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
const AvatarItem = (props) => {
  return (
    <Avatar.Icon
      size={64}
      icon={
        props.status === 'pending'
          ? 'account-clock-outline'
          : props.status === 'approved'
          ? 'check-decagram'
          : props.status === 'collected'
          ? 'bike-fast'
          : props.status === 'delivered'
          ? 'archive'
          : ''
      }
      color='white'
      //style={{ backgroundColor: 'red' }}
    />
  );
};

export default AvatarItem;

const styles = StyleSheet.create({});
