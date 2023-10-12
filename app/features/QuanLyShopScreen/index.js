import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import HeaderTitle from '../../components/HeaderTitle';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLOR} from '../../theme';
import {Container, Content} from 'native-base';
import styles from './styles';
import ProductList from './components/ProductList';
import {useSelector} from 'react-redux';

const QuanLyShopScreen = ({navigation}) => {
  const shopList = useSelector(store => store.account.shopList);
  const renderItemLeft = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon size={20} color={COLOR.black} name="chevron-left" />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: COLOR.black}}>
          {' '}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <HeaderTitle
        renderItemLeft={renderItemLeft()}
        title="Tài khoản Tiktok"
        navigation={navigation}
      />
      <View style={styles.boxSection}>
        <ProductList data={shopList} />
      </View>
    </Container>
  );
};

export default QuanLyShopScreen;
