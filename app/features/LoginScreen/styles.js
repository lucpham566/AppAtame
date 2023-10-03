import {StyleSheet} from 'react-native';
import {COLOR} from './../../theme/color';

const styles = StyleSheet.create({
  logo: {
    marginBottom: 10,
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'white',
  },
  button: {
    color: 'white',
    borderRadius: 5,
    height: 48,
    padding: 16,
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  imageBackground: {
    display: 'flex',
    flexGrow: 1,
  },
  itemInput: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    height: 45,
    borderWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#DCDCDC',

    // shadowColor: COLOR.primary,
    // shadowOffset: {width: 0, height: 0},
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 30,
  },
  boxRemember: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    padding: 1,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    fontSize: 5,
  },
  label: {
    margin: 8,
    paddingLeft: 8,
  },
  textDes: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.greyLight,
    paddingBottom: 30,
  },
  // socialContainer: {
  //   marginTop: 20,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  //   borderTopWidth: 1,
  //   borderTopColor: COLOR.greyLight,
  //   paddingTop: 20,
  // },
  socialItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default styles;
