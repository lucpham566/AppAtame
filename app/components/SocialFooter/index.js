import {View, Text, TouchableOpacity, Linking, Alert} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLOR} from '../../theme';
import IconFeather from 'react-native-vector-icons/Feather';

const SocialFooter = () => {
  const [url, setUrl] = useState('');

  const gotoLink = url => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.socialContainer}>
      <TouchableOpacity
        style={styles.socialItem}
        onPress={() => {
          gotoLink('https://www.facebook.com/atosa.asia');
        }}>
        <Icon size={23} color={'#2d00cf'} name={'facebook-f'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.socialItem}
        onPress={() => {
          gotoLink('https://www.youtube.com/c/ATOSAMarketingAutomationShopee');
        }}>
        <Icon size={23} color={'#e31a0b'} name={'youtube-play'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.socialItem}
        onPress={() => {
          gotoLink('https://atosa.asia/');
        }}>
        <Icon size={23} color={'#c400c1'} name={'globe'} />
      </TouchableOpacity>
    </View>
  );
};

export default SocialFooter;
