import {
  Thumbnail,
  Container,
  Content,
  Form,
  Item,
  Picker,
  Label,
  Input,
  Button,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import HeaderTitle from '../../components/HeaderTitle';
import {COLOR} from '../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import DateInput from '../../components/DateInput';
import moment from 'moment';
import {useSelector} from 'react-redux';

const SettingQCKPScreen = ({theme, navigation, route}) => {
  const currentShop = useSelector(store => store.account.currentShop);

  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [openPickerStart, setOpenPickerStart] = useState(false);
  const [openPickerEnd, setOpenPickerEnd] = useState(false);
  const [basePrice, setBasePrice] = useState(0);
  const [quota, setQuota] = useState(0);
  const [optionQuota, setoptionQuota] = useState('unlimited');
  const [premiumRate2, setPremiumRate2] = useState(0);
  const [premiumRate5, setPremiumRate5] = useState(0);

  const {adsCheck, onMakeAdsTargeting} = route.params;

  const onMakeAds = () => {
    const ids = adsCheck.map(i => {
      return i.itemid;
    });

    const data = {
      id: currentShop?._id,
      itemid_list: ids,
      campaignType: 'targeting',
      ads_list: [
        {placement: 2, premium_rate: premiumRate2},
        {placement: 5, premium_rate: premiumRate5},
      ],
      base_price: basePrice,
      daily_quota: optionQuota === 'daily_quota' ? quota : null,
      total_quota: optionQuota === 'total_quota' ? quota : null,
    };
    onMakeAdsTargeting(data);
  };

  const renderItemLeft = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon size={16} color={COLOR.black} name="chevron-left" />
        <Text
          style={{fontSize: 16, fontWeight: 'bold', color: COLOR.black}}></Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <HeaderTitle
        renderItemLeft={renderItemLeft()}
        title="Thiết lập"
        navigation={navigation}
      />
      <Content>
        <View>
          <Form
            style={{
              marginBottom: 10,
              padding: 20,
            }}>
            <Text style={{color: COLOR.black, marginBottom: 5, marginTop: 20}}>
              Giá đấu thầu
            </Text>
            <Item
              style={{
                flex: 1,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: COLOR.greyLight,
                paddingHorizontal: 10,
              }}
              regular>
              <Input
                placeholder="Nhập giá đấu thầu"
                keyboardType="numeric"
                style={{fontSize: 13, height: 40, padding: 0}}
                value={basePrice}
                onChangeText={setBasePrice}
              />
            </Item>

            <Text style={{color: COLOR.black, marginBottom: 5, marginTop: 20}}>
              Ngân sách
            </Text>
            <Item
              style={{
                flex: 1,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: COLOR.greyLight,
                height: 40,
                marginBottom: 10,
              }}
              regular>
              <Picker
                style={{width: undefined}}
                placeholder="Select your SIM"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={optionQuota}
                onValueChange={value => {
                  setoptionQuota(value);
                }}>
                <Picker.Item label="Không giới hạn" value="unlimited" />
                <Picker.Item label="Ngân sách hàng ngày" value="daily_quota" />
                <Picker.Item label="Tổng ngân sách" value="total_quota" />
              </Picker>
            </Item>

            <Item
              style={{
                flex: 1,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: COLOR.greyLight,
                paddingHorizontal: 10,
                backgroundColor:
                  optionQuota === 'unlimited' ? COLOR.light : COLOR.white,
              }}
              regular>
              <Input
                disabled={optionQuota === 'unlimited'}
                placeholder="Nhập ngân sách"
                keyboardType="numeric"
                value={quota}
                onChangeText={setQuota}
                style={{
                  fontSize: 13,
                  height: 40,
                  padding: 0,
                }}
              />
            </Item>

            <Text style={{color: COLOR.black, marginBottom: 5, marginTop: 20}}>
              Trang chủ - Gợi ý hôm nay
            </Text>
            <Item
              style={{
                flex: 1,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: COLOR.greyLight,
                paddingHorizontal: 10,
              }}
              regular>
              <Input
                placeholder="Nhập mức premium"
                keyboardType="numeric"
                value={premiumRate2}
                onChangeText={setPremiumRate2}
                style={{
                  fontSize: 13,
                  height: 40,
                  padding: 0,
                }}
              />
            </Item>

            <Text style={{color: COLOR.black, marginBottom: 5, marginTop: 20}}>
              Trang chi tiết sản phẩm - Có thể bạn cũng thích
            </Text>
            <Item
              style={{
                flex: 1,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: COLOR.greyLight,
                paddingHorizontal: 10,
              }}
              regular>
              <Input
                placeholder="Nhập mức premium"
                keyboardType="numeric"
                value={premiumRate5}
                onChangeText={setPremiumRate5}
                style={{
                  fontSize: 13,
                  height: 40,
                  padding: 0,
                }}
              />
            </Item>

            {/* <Text style={{color: COLOR.black, marginBottom: 5, marginTop: 20}}>
              Thời gian áp dụng
            </Text>
            <Item
              style={{
                flex: 1,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: COLOR.greyLight,
                height: 40,
                marginBottom: 10,
              }}
              regular>
              <Picker
                style={{width: undefined}}
                placeholder="Select your SIM"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={optionQuota}
                onValueChange={value => {
                  setoptionQuota(value);
                  console.log(value);
                }}>
                <Picker.Item label="Không giới hạn" value="unlimited" />
                <Picker.Item label="Ngân sách hàng ngày" value="daily_quota" />
                <Picker.Item label="Tổng ngân sách" value="total_quota" />
              </Picker>
            </Item>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Button
                style={{
                  flex: 1,
                  borderRadius: 6,
                  backgroundColor: COLOR.white,
                  paddingHorizontal: 10,
                  marginRight: 10,
                }}
                onPress={() => setOpenPickerStart(true)}>
                <Text>{moment(dateStart).format('L ')}</Text>
                <Icon name={'calendar-o'} size={16} color={COLOR.primary} />
              </Button>

              <DatePicker
                modal
                open={openPickerStart}
                date={dateStart}
                onConfirm={date => {
                  setOpenPickerStart(false);
                  setDateStart(date);
                }}
                onCancel={() => {
                  setOpenPickerStart(false);
                }}
              />

              <Button
                style={{
                  flex: 1,
                  borderRadius: 6,
                  backgroundColor: COLOR.white,
                  paddingHorizontal: 10,
                }}
                onPress={() => setOpenPickerEnd(true)}>
                <Text>{moment(dateEnd).format('L')}</Text>
                <Icon name={'calendar-o'} size={16} color={COLOR.primary} />
              </Button>

              <DatePicker
                modal
                open={openPickerEnd}
                date={dateEnd}
                onConfirm={date => {
                  setOpenPickerEnd(false);
                  setDateEnd(date);
                }}
                onCancel={() => {
                  setOpenPickerEnd(false);
                }}
              />
            </View> */}
          </Form>
        </View>
      </Content>
      <View style={{padding: 10}}>
        <Button
          onPress={onMakeAds}
          style={{backgroundColor: COLOR.primary, borderRadius: 6}}
          block>
          <Text style={{color: COLOR.white}}>Tạo chiến dịch mới</Text>
        </Button>
      </View>
    </Container>
  );
};

export default SettingQCKPScreen;
