import {StyleSheet} from 'react-native';
import {COLOR} from './../../theme/color';

const styles = StyleSheet.create({
  boxSection: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLOR.white,
    shadowColor: COLOR.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
  },
});

export default styles;
