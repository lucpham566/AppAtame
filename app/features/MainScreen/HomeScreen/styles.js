import {StyleSheet} from 'react-native';
import {COLOR} from '../../../theme/color';

const styles = StyleSheet.create({
  infoHead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,

    backgroundColor: 'transparent',
    shadowColor: COLOR.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
  },
  logo: {
    marginRight: 10,
    width: 48,
    height: 48,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  boxOption: {
    paddingHorizontal: 12,
    paddingTop: 25,
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
    borderColor: COLOR.primary,
    borderWidth: 1,
  },
  button: {
    color: 'white',
    borderRadius: 5,
    height: 40,
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  boxStatistical: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom:10,

    backgroundColor: COLOR.white,
    shadowColor: COLOR.grey,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
  },
  listStatistical: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tabInfoItem: {
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 10,
    height: 70,
    width: '32%',

    backgroundColor: COLOR.white,
    borderColor: COLOR.light,
    borderWidth: 1,
    // shadowColor: COLOR.primary,
    // shadowOffset: {width: 0, height: 0},
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 10,
  },
  tabInfoItemActive: {
    borderColor: COLOR.secondary,
    borderWidth: 1,
    backgroundColor: COLOR.white,
  },
  boxArticle: {
    padding: 10,

    backgroundColor: COLOR.white,
    shadowColor: COLOR.grey,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
  },
  listArticle: {},
  itemArticle: {
    marginTop: 5,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR.greyLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  menuTab: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
    marginVertical: 10,

    backgroundColor: COLOR.white,
    shadowColor: COLOR.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
  },
  tabItem: {
    width: '33%',
    backgroundColor: COLOR.white,
    padding: 5,
    marginBottom: 5,
  },
  menuItem: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerContainer: {
    borderTopWidth: 1,
    borderTopColor: COLOR.greyLight,
    margin: 30,
  },
  socialContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 20,
  },
  socialItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default styles;
