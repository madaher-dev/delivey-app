import Colors from '../constants/Colors';
import { Platform } from 'react-native';

export const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerTitleAlign: 'center',
};

export const drawerOption = {
  activeTintColor: Colors.primary,
  // itemStyle: { marginVertical: 30 },
};
