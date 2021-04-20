import { call, takeLatest, put, all } from 'redux-saga/effects';

import { GET_LIFESTYLE_TIPS, updateLifestyleTips } from './action';
import { loader } from '../../loader';
import getLifestyleTips, { getLifestyleTipFromCMS } from './api';
import LOADER from '../../../constants/loader';
import { updateError } from '../../error/action';
import ERROR from '../../../constants/error';
import CONFIG from '../../../constants/config';
import { LIFESTYLE_TIPS } from '../../../constants/types';
import { lowercaseObjectKeys } from '../../../helpers/helpers';

const GENERAL_TIPS_LIMIT = 4;

export function* getLifestyleTipsSaga() {
  yield* loader(function*() {
    yield put(updateError(ERROR.generalTips, false));
    let response = {};
    let isError = false;
    if (CONFIG.useLifeStyleTipFromCMS) {
      const [generalRes, lifeStyleRes] = yield all([
        call(getLifestyleTipFromCMS, LIFESTYLE_TIPS.GENERAL),
        call(getLifestyleTipFromCMS, LIFESTYLE_TIPS.LIFESTYLE),
      ]);

      if (generalRes.error || lifeStyleRes.error) {
        isError = true;
      } else {
        response = {
          general: (generalRes || []).slice(0, GENERAL_TIPS_LIMIT),
          ...lowercaseObjectKeys(lifeStyleRes),
        };
      }
    } else {
      response = yield call(getLifestyleTips);
      if (response.error) {
        isError = true;
      }
    }

    if (isError) {
      yield put(updateError(ERROR.generalTips, true));
      return;
    }

    yield put(updateLifestyleTips(response));
  }, LOADER.generalTips);
}

export default function* generalTipsSaga() {
  yield takeLatest(GET_LIFESTYLE_TIPS, getLifestyleTipsSaga);
}
