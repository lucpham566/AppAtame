import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import DrawerMenu from './../../components/DrawerMenu/index';
import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import ModalSelectShop from '../../components/Modal/ModalSelectShop';
import ModalPrompt from '../../components/Modal/ModalPrompt';
import TabScreen from './screen';
import {COLOR} from '../../theme';
import ModalScrollBottom from '../../components/Modal/ModalScrollBottom';

const Drawer = createDrawerNavigator();

export default function MainScreen() {
  return (
    <View style={{flex: 1}}>
      <ModalSelectShop />
      <ModalPrompt />
      {/* <ModalScrollBottom /> */}
      {/* <TabScreen /> */}
      <Drawer.Navigator drawerContent={props => <DrawerMenu {...props} />}>
        <Drawer.Screen name="MainTabScreen" component={TabScreen} />
      </Drawer.Navigator>
    </View>
  );
}
