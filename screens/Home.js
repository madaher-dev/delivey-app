import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, setLoading } from '../store/actions/orderActions';
import UserHome from './UserHome';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const initialLayout = { width: Dimensions.get('window').width };

const Home = (props) => {
  const dispatch = useDispatch();

  //Fetch Data on Load and Refresh

  useEffect(() => {
    dispatch(setLoading());
    dispatch(getOrders());
  }, []);

  const [routes] = React.useState([
    { key: 'pending', title: 'Pending' },
    { key: 'active', title: 'Active' },
    { key: 'delivered', title: 'Delivered' },
  ]);
  // const renderScene = SceneMap({
  //   pending: FirstRoute,
  //   active: SecondRoute,
  //   delivered: ThirdRoute,
  // });
  const [index, setIndex] = React.useState(0);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'pending':
        return <UserHome navigation={props.navigation} index={index} />;
      case 'active':
        return <UserHome navigation={props.navigation} index={index} />;
      case 'delivered':
        return <UserHome navigation={props.navigation} index={index} />;
      default:
        return null;
    }
  };
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'tomato' }}
      style={{ backgroundColor: 'white' }}
      labelStyle={{ color: 'black' }}
    />
  );
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      //style={{ backgroundColor: 'pink' }}
    />
  );
};

export default Home;

const styles = StyleSheet.create({});
