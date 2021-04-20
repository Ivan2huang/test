import { all, takeLatest, call, put } from 'redux-saga/effects';

import {
  GET_COMPANY_CONTACT_DETAILS_AND_FAQS,
  updateCompanyContactDetailsAndFAQs,
} from './action';
import getCompanyContactDetailsAndFAQs from './api';
import { loader } from '../../loader';
import LOADER from '../../../constants/loader';

export function* getCompanyContactDetailsAndFAQsSaga({ payload: { locale } }) {
  yield* loader(function*() {
    const { details, faqs } = yield call(
      getCompanyContactDetailsAndFAQs,
      locale,
    );
    yield put(updateCompanyContactDetailsAndFAQs(details, faqs));
  }, LOADER.page);
}

export default function* settingsSaga() {
  yield all([
    takeLatest(
      GET_COMPANY_CONTACT_DETAILS_AND_FAQS,
      getCompanyContactDetailsAndFAQsSaga,
    ),
  ]);
}
