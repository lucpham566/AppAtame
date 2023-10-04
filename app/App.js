import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import Screens from './screens';
import { StatusBar } from 'react-native';
import { COLOR } from './theme';

import GlobalLoading from './components/GlobalLoading';
import { Provider } from 'react-redux';
import store from './store';

import 'moment/locale/vi';
import moment from 'moment';
import { setCustomText } from 'react-native-global-props';
import toastConfig from './components/BaseToast/config';
import { Text } from 'native-base';

moment.locale('vi');

const App = () => {
  setCustomText({
    style: {},
  });


  /*
    1. Create the config
  */
  const toastConfig = {

    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: COLOR.primary }}
        contentContainerStyle={{ paddingHorizontal: 15, borderWidth: 0 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
          color: COLOR.primary
        }}
      />
    ),

    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    ),
  };


  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor={COLOR.primary} />
        <Screens />
        <Toast ref={ref => Toast.setRef(ref)} />
        <GlobalLoading />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
