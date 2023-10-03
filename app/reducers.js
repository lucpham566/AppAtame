import {combineReducers} from 'redux';
import modalPromptReducer from './components/Modal/ModalPrompt/reducers';
import adsDetailReducer from './features/AdsDetailScreen/reducers';
import baoCaoReducer from './features/BaoCaoHieuQuaScreen/reducers';
import congCuTuKhoaReducer from './features/CongCuTuKhoaScreen/reducers';
import globalReducer from './features/globalFeatures/reducers';
import loginReducer from './features/LoginScreen/reducers';
import accountReducer from './features/MainScreen/reducers';
import quangCaoKhamPhaReducer from './features/QuangCaoKhamPhaScreen/reducers';
import quangCaoTimKiemReducer from './features/QuangCaoTimKiemScreen/reducers';
import taoQuangCaoReducer from './features/TaoQuangCaoScreen/reducers';
import tongQuanReducer from './features/TongQuanScreen/reducers';

const rootReducer = combineReducers({
  global: globalReducer,
  login: loginReducer,
  account: accountReducer,
  tongQuan: tongQuanReducer,
  baoCao: baoCaoReducer,
  quangCaoTimKiem: quangCaoTimKiemReducer,
  quangCaoKhamPha: quangCaoKhamPhaReducer,
  adsDetail: adsDetailReducer,
  taoQuangCao: taoQuangCaoReducer,
  congCuTuKhoa: congCuTuKhoaReducer,
  modalPrompt: modalPromptReducer,
});

export default rootReducer;
