import {Button} from 'native-base';
import React, {useState} from 'react';
import {Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {COLOR} from '../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const DateInput = props => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const {style} = props;
  return (
    <>
      <Button
        style={[
          {
            flex: 1,
            borderRadius: 6,
            backgroundColor: COLOR.white,
            paddingHorizontal: 10,
          },
          style,
        ]}
        onPress={() => setOpen(true)}>
        <Text>dfasf</Text>
        <Icon name={'calendar-o'} size={16} color={COLOR.primary} />
      </Button>
    </>
  );
};

export default DateInput;
