import {all} from 'redux-saga/effects';
import adsDetailSaga from './features/AdsDetailScreen/sagas';
import baoCaoSaga from './features/BaoCaoHieuQuaScreen/sagas';
import congCuTuKhoaSaga from './features/CongCuTuKhoaScreen/sagas';
import authSaga from './features/LoginScreen/sagas';
import accountSaga from './features/MainScreen/sagas';
import quangCaoKhamPhaSaga from './features/QuangCaoKhamPhaScreen/sagas';
import quangCaoTimKiemSaga from './features/QuangCaoTimKiemScreen/sagas';
import taoQuangCaoSaga from './features/TaoQuangCaoScreen/sagas';
import tongQuanSaga from './features/TongQuanScreen/sagas';

function* rootSaga() {
  yield all([
    authSaga(),
    accountSaga(),
    tongQuanSaga(),
    baoCaoSaga(),
    quangCaoTimKiemSaga(),
    quangCaoKhamPhaSaga(),
    adsDetailSaga(),
    taoQuangCaoSaga(),
    congCuTuKhoaSaga(),
  ]);
}

export default rootSaga;
