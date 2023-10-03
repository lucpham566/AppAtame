import {
  Button,
  CheckBox,
  Container,
  Content,
  Form,
  Image,
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
import {COLOR} from '../../../theme/color';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';
import SocialFooter from '../../../components/SocialFooter';
import {useForm, Controller} from 'react-hook-form';

const LoginScreen = props => {
  const [showPassword, setShowPassword] = useState(true);
  const [remember, setRemember] = useState(true);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const {navigation} = props;
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleRemember = () => {
    setRemember(!remember);
  };

  const onSubmit = data => {
    Keyboard.dismiss();
    console.log(data);
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
  const gotoLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          paddingBottom: 0,
        }}>
        <Thumbnail
          style={styles.logo}
          square
          source={{
            uri: 'https://atosa.asia/wp-content/uploads/2022/05/Logo-Atosa-Shopee-02.png',
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: COLOR.primary,
          }}>
          ATOSA PHẦN MỀM QUẢNG CÁO SHOPEE NHIỀU NGƯỜI DÙNG NHẤT
        </Text>
      </View>
      <View style={{width: '100%', padding: 30}}>
        <Controller
          control={control}
          rules={{
            required: 'Không được để trống',
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Item style={styles.itemInput} error={errors.name ? true : false}>
              <Input
                placeholder="Họ và tên"
                placeholderTextColor={COLOR.greyLight}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </Item>
          )}
          name="name"
        />
        {handleError('name', errors)}
        <Controller
          control={control}
          rules={{
            required: 'Không được để trống',
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Item style={styles.itemInput} error={errors.email ? true : false}>
              <Input
                placeholder="Địa chỉ Email"
                placeholderTextColor={COLOR.greyLight}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </Item>
          )}
          name="email"
        />
        {handleError('email', errors)}
        <Controller
          control={control}
          rules={{
            required: 'Không được để trống',
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Item style={styles.itemInput} error={errors.phone ? true : false}>
              <Input
                placeholder="Số điện thoại"
                placeholderTextColor={COLOR.greyLight}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            </Item>
          )}
          name="phone"
        />
        {handleError('phone', errors)}
        
        <Button
          onPress={handleSubmit(onSubmit)}
          block
          style={[
            styles.button,
            {backgroundColor: COLOR.secondary, marginTop: 20},
          ]}>
          <Text style={[styles.textButton, {color: 'white'}]}>Đăng ký</Text>
        </Button>
        <View style={styles.textDes}>
          <Text style={{color: COLOR.grey, fontSize: 14}}>
            Bạn đã có tài khoản !{' '}
          </Text>
          <TouchableOpacity onPress={gotoLogin}>
            <Text
              style={{color: COLOR.primary, fontSize: 16, fontWeight: 'bold'}}>
              Đăng nhập ngay
            </Text>
          </TouchableOpacity>
        </View>
        <SocialFooter />
      </View>
    </View>
  );
};

export default LoginScreen;
