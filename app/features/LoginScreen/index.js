import {
  Button,
  CheckBox,
  Container,
  Content,
  Form,
  Input,
  Item,
  Thumbnail,
} from 'native-base';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { COLOR } from '../../theme/color';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import SocialFooter from '../../components/SocialFooter';
import { useDispatch } from 'react-redux';
import { login } from './actions';

import { LogBox } from 'react-native';
import { StackActions, NavigationActions } from '@react-navigation/native';
import { getItem } from '../../commons/AsyncStorageUtils';
import { hideLoadingGlobal, showLoadingGlobal } from '../globalFeatures/actions';
import Toast from 'react-native-toast-message';
import { getShopList } from '../MainScreen/actions';
import { Image } from 'react-native';

LogBox.ignoreLogs(['EventEmitter.removeListener']);

const LoginScreen = props => {
  const [showPassword, setShowPassword] = useState(true);
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  useEffect(async () => {
    const accountRemember = await getItem('accountRemember');
    if (accountRemember?.remember) {
      setValue('username', accountRemember.username);
      setValue('password', accountRemember.password);
      setRemember(accountRemember.remember);
    }
  }, []);

  const { navigation } = props;
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleRemember = () => {
    setRemember(!remember);
  };
  const handleError = (field, errors) => {
    return (
      <>
        {errors[field] && errors[field].type !== 'pattern' && (
          <Text
            style={{
              paddingHorizontal: 3,
              paddingVertical: 2,
              color: COLOR.danger,
            }}>
            {errors[field]?.message}
          </Text>
        )}
        {errors[field]?.type === 'pattern' && (
          <Text
            style={{
              paddingHorizontal: 3,
              paddingVertical: 2,
              color: COLOR.danger,
            }}>
            Không đúng định dạng
          </Text>
        )}
      </>
    );
  };
  const gotoRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  const onLogin = data => {
    Keyboard.dismiss();
    dispatch(showLoadingGlobal());
    const account = {
      username: data.username.toLowerCase(),
      password: data.password,
      remember: remember,
    };
    dispatch(
      login(account, {
        callbackSuccess: () => {
          // navigation.navigate('MainScreen');
          dispatch(getShopList());
          dispatch(hideLoadingGlobal());
          // Toast.show({
          //   type: 'success',
          //   text1: 'Đăng nhập thành công',
          //   text2: 'Chào mừng bạn đến với atosa',
          // });
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainScreen' }],
          });
        },
      }),
    );
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.primaryLight,
      }}>
      <View
        style={{
          flex: 1,
          width: '100%',
          maxHeight: '30%',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: 20,
            paddingBottom: 0,
            maxWidth: '50%',
          }}>
          <Thumbnail
            style={styles.logo}
            source={{
              uri: 'https://atosa.asia/wp-content/uploads/2022/05/Logo-Atosa-Shopee-02.png',
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLOR.white,
              textTransform: 'uppercase',
            }}>
            ATOSA Phần mềm quảng cáo Shopee Hiệu quả nhất
          </Text>
        </View>

        <Thumbnail
          style={styles.logo}
          source={require('../../assets/image/bg_tiktok_ads.png')}
        />
      </View>

      <View
        style={{
          width: '100%',
          padding: 30,
          backgroundColor: 'white',
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <Controller
          control={control}
          rules={{
            required: 'Không được để trống',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Item
              style={styles.itemInput}
              error={errors.username ? true : false}>
              {/* <Icon
                style={{
                  borderRightWidth: 1,
                  paddingRight: 10,
                  borderColor: '#F0F0F0',
                }}
                size={20}
                color={COLOR.primary}
                name={'user'}
              /> */}
              <View style={{ paddingRight: 10, marginRight: 10, borderRightWidth: 1, borderColor: COLOR.greyLight, }}>
                <Image style={{ width: 20, height: 20 }} source={require('../../assets/image/user.png')} />
              </View>
              <Input
                placeholder="Tài khoản"
                placeholderTextColor={COLOR.grey}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </Item>
          )}
          name="username"
        />
        {handleError('username', errors)}
        <Controller
          control={control}
          rules={{
            required: 'Không được để trống',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Item
              style={styles.itemInput}
              error={errors.password ? true : false}>
              <View style={{ paddingRight: 10, marginRight: 10, borderRightWidth: 1, borderColor: COLOR.greyLight, }}>
                <Image style={{ width: 20, height: 20 }} source={require('../../assets/image/lock.png')} />
              </View>
              {/* 
              <Icon
                style={{
                  borderRightWidth: 1,
                  paddingRight: 10,
                  borderColor: '#F0F0F0',
                }}
                size={20}
                color={COLOR.primary}
                name={'lock'}
              /> */}
              <Input
                placeholder="Mật khẩu"
                placeholderTextColor={COLOR.grey}
                secureTextEntry={showPassword}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <TouchableOpacity onPress={handleShowPassword}>
                <Icon
                  size={23}
                  color={COLOR.greyLight}
                  name={showPassword ? 'eye' : 'eye-slash'}
                />
              </TouchableOpacity>
            </Item>
          )}
          name="password"
        />
        {handleError('password', errors)}
        <View style={styles.boxRemember}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              style={styles.checkbox}
              checked={remember}
              color={COLOR.primary}
              onPress={handleRemember}
            />
            <Text style={styles.label}>
              <Text
                style={{ color: COLOR.grey, fontWeight: 'bold', fontSize: 15 }}>
                Nhớ mật khẩu?
              </Text>
            </Text>
          </View>
          <TouchableOpacity>
            {/* <Text style={{color: COLOR.grey, fontWeight: 'bold', fontSize: 15}}>
              Quên mật khẩu?
            </Text> */}
          </TouchableOpacity>
        </View>
        <Button
          onPress={handleSubmit(onLogin)}
          block
          style={[
            styles.button,
            { backgroundColor: COLOR.primary, marginTop: 10 },
          ]}>
          <Text style={[styles.textButton, { color: 'white' }]}>Đăng nhập</Text>
        </Button>

        {/* <View style={styles.textDes}>
          <Text style={{color: COLOR.grey, fontSize: 14}}>
            Bạn chưa có tài khoản ! Vui lòng{' '}
          </Text>
          <TouchableOpacity onPress={gotoRegister}>
            <Text
              style={{color: COLOR.primary, fontSize: 16, fontWeight: 'bold'}}>
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View> */}
        {/* <SocialFooter /> */}
      </View>
    </View>
  );
};

export default LoginScreen;
