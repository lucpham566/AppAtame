import {View, Text} from 'react-native';
import React from 'react';
import {RadioButton} from 'react-native-paper';

const DuyTriTuDongTab = () => {
  const [checked, setChecked] = React.useState('first');
  return (
    <View>
      <RadioButton
        value="first"
        status={checked === 'first' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('first')}
      />
      <RadioButton
        value="second"
        status={checked === 'second' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('second')}
      />
    </View>
  );
};

export default DuyTriTuDongTab;
