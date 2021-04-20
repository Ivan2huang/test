import { all, call, put, takeEvery } from 'redux-saga/effects';

import getClinics from './api';
import {
  FILTER_AND_SET_RESULTANT_CLINICS,
  FILTER_CLINICS,
  GET_CLINICS,
  HANDLE_SINGLE_CLINIC_SELECT,
  HANDLE_STACKED_CLINIC_SELECT,
  hideClinicDetail,
  RESET_MAP,
  SEARCH_CLINIC,
  setSelectedClinicFromSearchResultPanel,
  showClinicDetail,
  showToastMessage,
  TOGGLE_VIEW,
  unSetSelectedClinicFromSearchResultPanel,
  updateAppliedConsultationTypesFilter,
  updateClinics,
  updateFitMapToOriginalPosition,
  updateResultantClinics,
  updateSearchedClinics,
  updateSelectedClinic,
  updateSelectedStackedClinics,
  updateView,
} from './action';
import LOADER from '../../../constants/loader';
import { loader } from '../../loader';
import { CLINIC_LIST_VIEW_TYPE, FILTER_BY, VIEW } from './constants';
import { filterClinics, findClinics } from './helper';

export function* getClinicsSaga() {
  yield* loader(function*() {
    const response = yield call(getClinics);

    if (response) {
      yield put(updateClinics(response));
    }
  }, LOADER.page);
}

export function* handleSingleClinicSelectSaga(action) {
  const {
    clinic,
    selectedClinicFromSearchResultPanel,
    viewFor,
  } = action.payload;
  if (viewFor !== CLINIC_LIST_VIEW_TYPE.selectedStackedClinics) {
    yield put(updateSelectedStackedClinics([]));
  }
  if (selectedClinicFromSearchResultPanel) {
    yield put(setSelectedClinicFromSearchResultPanel());
  } else {
    yield put(unSetSelectedClinicFromSearchResultPanel());
  }
  yield put(updateSelectedClinic(clinic));
  yield put(showClinicDetail());
}

export function* hideClinicDetailsView() {
  yield put(updateSelectedClinic({}));
  yield put(hideClinicDetail());
}

export function* handleStackedClinicSelectSaga(action) {
  const { stackedClinics } = action.payload;
  yield put(updateSelectedStackedClinics(stackedClinics));
  yield* hideClinicDetailsView();
}

export function* filterAndSetResultantSaga(action) {
  const { clinicsList, filters } = action.payload;
  const results = filterClinics(
    clinicsList,
    filters,
    FILTER_BY.consultationType,
  );
  yield put(updateResultantClinics(results));
  if (results.length === 0) {
    yield put(showToastMessage());
  }
  yield* hideClinicDetailsView();
}

export function* filterClinicsSaga(action) {
  const { searchedClinics, filters } = action.payload;
  const newActionPayload = {
    payload: {
      clinicsList: searchedClinics,
      filters,
    },
  };
  yield put(updateSelectedStackedClinics([]));
  yield put(updateSelectedClinic({}));
  yield* filterAndSetResultantSaga(newActionPayload);
  yield put(updateAppliedConsultationTypesFilter(filters));
}

export function* resetMapSaga(action) {
  const { originalClinics } = action.payload;
  yield put(updateResultantClinics(originalClinics));
  yield put(updateAppliedConsultationTypesFilter({}));
  yield put(updateSearchedClinics(originalClinics));
  yield put(updateSelectedStackedClinics([]));
  yield* hideClinicDetailsView();
  yield put(updateFitMapToOriginalPosition(true));
}

export function* toggleViewSaga(action) {
  const { isShowClinicDetail, currentView } = action.payload;
  if (isShowClinicDetail) {
    yield put(hideClinicDetail());
  }
  const nextView = currentView === VIEW.list ? VIEW.map : VIEW.list;
  yield put(updateView(nextView));
}

export function* searchClinicSaga(action) {
  const { clinics, keyword, searchBy, appliedFilters } = action.payload;
  const results = findClinics(clinics, keyword, searchBy);
  if (results.length === 0 && keyword !== '') {
    yield put(showToastMessage());
  }
  yield put(updateSearchedClinics(results));
  const newActionPayload = {
    payload: {
      clinicsList: results,
      filters: appliedFilters,
    },
  };
  yield* filterAndSetResultantSaga(newActionPayload);
}

export default function* clinicSaga() {
  yield all([takeEvery(GET_CLINICS, getClinicsSaga)]);
  yield all([
    takeEvery(HANDLE_SINGLE_CLINIC_SELECT, handleSingleClinicSelectSaga),
  ]);
  yield all([
    takeEvery(HANDLE_STACKED_CLINIC_SELECT, handleStackedClinicSelectSaga),
  ]);
  yield all([
    takeEvery(FILTER_AND_SET_RESULTANT_CLINICS, filterAndSetResultantSaga),
  ]);
  yield all([takeEvery(FILTER_CLINICS, filterClinicsSaga)]);
  yield all([takeEvery(RESET_MAP, resetMapSaga)]);
  yield all([takeEvery(TOGGLE_VIEW, toggleViewSaga)]);
  yield all([takeEvery(SEARCH_CLINIC, searchClinicSaga)]);
}
