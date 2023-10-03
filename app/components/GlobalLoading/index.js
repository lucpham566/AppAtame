import {Spinner, Text} from 'native-base';
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {COLOR} from '../../theme';
import {useSelector} from 'react-redux';
var {width, height} = Dimensions.get('window');

const GlobalLoading = () => {
  const globalLoading = useSelector(state => state.global.globalLoading);
  if (globalLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.overlay}></View>
        <Spinner color={COLOR.primary} />
      </View>
    );
  }
  return <></>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: height,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.3,
    backgroundColor: 'black',
    width: width,
    height: height,
    justifyContent: 'center',
  },
});

export default GlobalLoading;
