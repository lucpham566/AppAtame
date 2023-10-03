import {StyleSheet} from 'react-native';
import {COLOR} from './../../theme/color';

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  titleBox: {
    paddingVertical: 10,
  },
  boxOption: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLOR.white,
    shadowColor: COLOR.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
  },
  tabOptionItem: {
    paddingHorizontal: 4,
    width: '25%',
  },
  tabOptionItemActive: {
    borderColor: COLOR.secondary,
    borderWidth: 1,
  },
  boxStatistical: {
    // backgroundColor: COLOR.white,
    // shadowColor: COLOR.primary,
    // shadowOffset: {width: 0, height: 0},
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 10,
  },
  listStatistical: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  tabInfoItem: {
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 10,
    height: 70,
    width: '30%',
  },
  tabInfoItemActive: {
    borderColor: COLOR.secondary,
    borderWidth: 1,
    backgroundColor: COLOR.white,
  },
  chartContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLOR.white,
    shadowColor: COLOR.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
  },
  boxSection: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLOR.white,
    
    // shadowColor: COLOR.primary,
    // shadowOffset: {width: 0, height: 0},
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 10,
  },
});

export default styles;
