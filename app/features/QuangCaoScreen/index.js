import React, { Component } from 'react';
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
} from 'native-base';
import HeaderTab from '../../components/HeaderTab';
import QuangCaoKhamPhaScreen from '../QuangCaoKhamPhaScreen';
import QuangCaoTimKiemScreen from '../QuangCaoTimKiemScreen';
import { COLOR } from '../../theme';

const QuangCaoScreen = ({ theme, navigation }) => {
  const renderItemRight = () => {
    return <></>;
  };
  return (
    <Container>
      <HeaderTab title="Quảng cáo" renderItemRight={renderItemRight()} />
      <Tabs locked tabBarUnderlineStyle={{ backgroundColor: COLOR.primary }}>
        <Tab
          activeTextStyle={{ color: COLOR.primary, fontWeight: 'bold' }}
          textStyle={{ color: COLOR.grey }}
          tabStyle={{ backgroundColor: COLOR.light }}
          activeTabStyle={{ backgroundColor: COLOR.light }}
          heading="Quảng cáo Tìm kiếm">
          <QuangCaoTimKiemScreen navigation={navigation} />
        </Tab>
        <Tab
          activeTextStyle={{ color: COLOR.primary, fontWeight: 'bold' }}
          textStyle={{ color: COLOR.grey }}
          tabStyle={{ backgroundColor: COLOR.light }}
          activeTabStyle={{ backgroundColor: COLOR.light }}
          heading="Quảng cáo Khám phá">
          <QuangCaoKhamPhaScreen navigation={navigation} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default QuangCaoScreen;
