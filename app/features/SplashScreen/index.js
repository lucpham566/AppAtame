import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Thumbnail} from 'native-base';
import {COLOR} from '../../theme';
import {useDispatch} from 'react-redux';
import {getUserInfo} from '../LoginScreen/actions';
import {fetchToken} from '../../helpers/auth';

const SplashScreen = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  useEffect(async () => {
    await fetchToken();
    dispatch(
      getUserInfo({
        callbackSuccess: () => {
          navigation.reset({
            index: 0,
            routes: [{name: 'MainScreen'}],
          });
        },
        callbackError: () => {
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          });
        },
      }),
    );
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Thumbnail
        style={styles.logo}
        square
        source={{
          uri: 'https://atosa.asia/wp-content/uploads/2022/05/Logo-Atosa-Shopee-02.png',
        }}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: COLOR.secondary,
          padding: 10,
          textAlign: 'center',
          marginTop: 10,
        }}>
        ATOSA ADS
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 70,
    height: 70,
  },
});

export default SplashScreen;
