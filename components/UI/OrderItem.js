import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { format, parseISO } from 'date-fns';
import AvatarItem from '../AvatarItem';

const OrderItem = (props) => {
  const status = props.status;

  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <View style={styles.infoContainerRow}>
        <View style={styles.avatar}>
          <AvatarItem status={status} />
          <Text
            style={
              status === 'pending' ? styles.avatarText : styles.avatarGreen
            }
          >
            {status === 'pending'
              ? 'pending'
              : status === 'approved'
              ? 'approved'
              : status === 'collected'
              ? 'collected'
              : status === 'delivered'
              ? 'delivered'
              : ''}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.date}>
            {format(parseISO(props.date), 'dd/MM/yyyy')}
          </Text>
          {props.long && (
            <Text style={{ ...styles.details, color: Colors.primary }}>
              Long Trip!
            </Text>
          )}
          {props.driver && (
            <Text style={{ ...styles.details, color: Colors.accent }}>
              {props.driver}
            </Text>
          )}
        </View>
      </View>
      <View>
        {!props.address ||
        props.address === 'undefined' ||
        props.address === 'null' ? null : (
          <Text style={styles.address}>{props.address}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  placeItem: {
    flex: 1,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    // flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    //backgroundColor: 'black',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  infoContainer: {
    //marginLeft: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainerRow: {
    //marginLeft: 25,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 24,
    marginBottom: 5,
  },
  details: {
    color: 'black',
    fontSize: 14,
    marginBottom: 5,
  },
  date: {
    color: 'black',
    fontSize: 14,
    marginBottom: 5,
  },
  address: {
    color: '#666',
    fontSize: 16,
    //width: '100%',
  },
  avatar: {
    //paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.primary,
  },
  avatarGreen: {
    color: 'green',
  },
});
